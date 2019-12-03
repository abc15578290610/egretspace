declare function playWithUrl(src:string,src1:string)
module game {
	export class bjlgameView extends ViewElementUI {
		private m_resultCell:resultCell;//倒计时
		private m_back: eui.Image;//返回
		private m_bg: eui.Image;//背景
		private m_step:string;//游戏步骤
		private m_bettype:bjlbetType;
		private m_ludan:bjlludan;
		private btn_group:eui.Group;

		private state:number = 0 ;//游戏状态 0:无 1:开始下注 2:结束下注 3:结算
		private m_switch:eui.Image;//切换房间

		private m_record:eui.Image;
		private m_help:eui.Image;
		private m_set:eui.Image;
		private m_sence:eui.Image;

		private m_bets:eui.Group;

		private m_sure:eui.Image;//确定下注
		private m_cancel:eui.Image;//取消下注
		private m_cf:eui.Image;
		private m_user:userView;

		private static _instance: bjlgameView;
		public static getInstance(): bjlgameView {
			if (!this._instance)
				this._instance = new bjlgameView();
			return this._instance;
		}
		public constructor() {
			super();
			this.skinName = "bjlgameViewSkin";
		}
		protected init() {
			super.init();
			this.m_sure.visible=false;
			this.m_cancel.visible=false;
		}
		private time_num = 0;
		public initGame() {
			console.log("初始化")
			EventCenter.getInstance().registEvent(EventNotify.SOCKET_INFO,this.onMsg,this)
			this.m_sure.visible=false;
			this.m_cancel.visible=false;
			this.m_cf.visible=false;
			this.m_resultCell.visible = false;
			this.m_user.setData(gameData.userInfo.name,gameData.userInfo.userId,'')
			this.m_user.setGold(gameData.userInfo.ye);
			this.state = parseInt(gameData.roomData[3]);
			this.cleanGame();
			bjlbetType.onLine_score = [0,0,0,0,0];
			this.m_ludan = new bjlludan();
			this.m_ludan.scaleX = this.m_ludan.scaleY = 1.2;
			this.m_ludan.x = (this.width-(this.m_ludan.width*this.m_ludan.scaleX))/2;
			this.m_bettype.y = this.height-this.m_bettype.height-335;
			this.btn_group.y = this.height-305;
			this.m_ludan.bottom=0;
			this.addChild(this.m_ludan);
			this.m_ludan.initData(gameData.roomData[5]);
			this.switchSence()
		}
		private userInfo(e:egret.Event){

		}
		protected addEvent() {
			// EventCenter.getInstance().registEvent(EventNotify.COIN_INFO,this.userInfo,this)
			this.m_sure.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_cf.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
			this.m_set.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_record.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
			this.m_bettype.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBetHandle, this);
			this.m_sence.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchSence, this);
		}
		private curVideo=0
		private switchSence(){
			console.log(gameData.roomData)
			// playWithUrl()
			netTool.send(true);
			var vedioUrl = GameConfig.strJson(gameData.videoData,'*');
			if(this.curVideo==2){
				playWithUrl(vedioUrl[this.curVideo],vedioUrl[0]);
				this.curVideo=0;
			}else{
				playWithUrl(vedioUrl[this.curVideo],vedioUrl[this.curVideo+1])
				this.curVideo++;
			}
			setTimeout(()=>{
				netTool.send(false);
			},1500)
			console.log(vedioUrl)
		}
		private switchRoom(){
			EventCenter.getInstance().dispatchEventData(new egret.Event(EventNotify.SWITCH_ROOM))
		}
		private handleEvent(e: egret.TouchEvent) {
			var target = e.currentTarget;
			if(target==this.m_back){
				EventCenter.getInstance().removeRegistEvent(EventNotify.SOCKET_INFO,this.onMsg,this)
				EventManager.dispatchEventWith(EventNotify.CLOSE_GAME, false,{type:'bjl'});
			}else if(target==this.m_sure||target==this.m_cf){//确定下注
				EffectUtils.playEffect(target,4);
				let arr = bjlbetType.score;
				let data = {"roomId":0,"bet":''};
				if(gameData.userInfo.roomId.length<=0){
					console.warn("注意房间id不能为空串!!!!!!")
					return;
				}
				data.roomId=parseInt(gameData.userInfo.roomId);
				data.bet=this.filterArr(arr);
				if(data.bet.length>0){
					console.log(data,"请求下注")
					rPomelo.request(gameData.bjlroutes.doBet,data,this.doBetSuccess,this)
				}else{
					game.TipsBase.getInstance().setContent("请下注",1)
				}
			}else if(target==this.m_cancel){//取消下注
				EffectUtils.playEffect(target,4);
				this.cleanGame()
			}else if(target==this.m_help){
				EffectUtils.playEffect(target,1);
				this.stage.dispatchEventWith(EventNotify.GAME_SHOW_HELP);
			}else if(target==this.m_set){
				EffectUtils.playEffect(target,1);
				this.stage.dispatchEventWith(EventNotify.GAME_SHOW_SET);
			}else if(target==this.m_record){
				this.stage.dispatchEventWith(EventNotify.SHOW_BETRECORD);
			}
		}
		private filterArr(arr:any[]){
			var str = '';
			arr.filter((val,index)=>{
				if(val>0){
					let num = index+1;
					if(str.length>0){
						str = str+'$'+num+"^"+val
					}else{
						str = num+"^"+val
					}
				}
			});
			return str;
		}
		//桌面分数和历史分数总和
		private setTotalScore(newArr:number[],oldArr:number[]){
			var _arr =[];
			for(let i=0;i<newArr.length;i++){
				_arr[i]=newArr[i]+oldArr[i];
			}
			return _arr;
		}
		private m_betlist:betList;
		private selectBetHandle(e: egret.TouchEvent){
			if(this.state!=1){
				game.TipsBase.getInstance().setContent("非下注时间，请稍等",1)
				return;
			}
			if(!betList.selectNum){
				game.TipsBase.getInstance().setContent("请选择筹码",1)
				return;
			}
			let item = (((e.target as eui.Image).parent) as bjlbetType);
			if(e.target.name){
				console.log(bjlbetType.score)
				item.addScore(e.target.name,gameData.betList["cm"+betList.selectNum]);
				this.updataBetScore()
				let _target = e.target as eui.Image;
				let _x = _target.localToGlobal().x+(Math.random()*60)+60
				let _y = e.target.localToGlobal().y+(Math.random()*30)+40
				this.m_betlist.play(_x,_y)//放置一个筹码对象到桌面
			}
		}
		public updataBetScore(bool=true){
			var option = { time: 1500,initNum:1,num: 0, regulator: 50 }
			var allscore = this.setTotalScore(bjlbetType.score,bjlbetType.onLine_score);
			allscore.map((val,index)=>{
					let old_val = parseInt(this.m_bettype["all_"+index].text);
					option.initNum = old_val;
					option.num=val;
					if(bool){
						this.m_bettype.playEffect(this.m_bettype["all_"+index],option)
					}else{
						this.m_bettype["all_"+index].text = val;
					}
			})
		}
		private doBetSuccess(res){
			if(res.code=='401'){
				gameData.userInfo.ye = res.data.ye;
				this.m_user.setGold(gameData.userInfo.ye);
				bjlbetType.onLine_score = this.setTotalScore(bjlbetType.score,bjlbetType.onLine_score);
				bjlbetType.reSetScore();
			}else{
				this.cleanGame();
			}
			console.log("下注回调",res)
			game.TipsBase.getInstance().setContent(res.msg,1)
		}
		//开始下注
		private startBet(res){
			console.log("开始下注",res)
			this.m_sure.visible=true;
			this.m_cancel.visible=true;
			this.m_cf.visible=true;
			gameData.userInfo.ye = res.ye;
			this.state = res.state
			this.m_resultCell.play(res.betTime,res.state);
			this.m_ludan.initData(res.road);
			this.m_bettype.setBase(res.bl)
			this.m_user.setGold(gameData.userInfo.ye);
		}
		//结束下注
		private endBet(res){
			this.m_sure.visible=false;
			this.m_cancel.visible=false;
			this.m_cf.visible=false;
			console.log("结束下注",res)
			this.m_resultCell.stop();
			this.state = res.state;
		}
		/**
		 * state:3             //状态:开奖(或结算)
         * result:abcd         //a 牛1,b 牛2,c 牛3,d 牛4...,i 牛9,j 牛牛,k 炸弹, l 无牛
		 * win:100             //闲1闲2闲3输赢 1赢0输    （增加功能）
		 * pk:a1,a2,c3,d6,d3$a3,b2,d9,a6,a8$a2,a3,a4,d3,b11$b2,b4,b7,b8,d12                               //牌
		 */
		private openCard(data){
			let res = data.data;
			console.log("开牌",res)
			this.state = res.state
			if(!res.result)return;
			setTimeout(()=>{
				//重置下一局
				bjlbetType.onLine_score = [0,0,0,0,0];
				this.cleanGame();
			},300)
			EventManager.dispatchEventWith(EventNotify.GAME_RESULT,false,data);
		}
		/**
		 * state:3            //状态:开奖(或结算)
           xz:10              //下注
           fh:0               //返还
           yl:-10                                 //盈利
           road:"abcd-110^abce-101",              //路单 
		 */
		private result(res){
			console.log("结算",res)
			this.state = res.state
		}
		/**state:3            //状态:开奖(或结算)
           pk:1^2^a3          //1是位置(1-庄 2-闲1 3-闲2  4-闲3)  2是牌序号(1-5)  a3:开什么牌
		 */
		private showCard(data){
			let res = data.data;
			console.log("发牌",res)
			this.state = res.state
			if(!res.pk)return;
			EventManager.dispatchEventWith(EventNotify.GAME_RESULT,false,data);
		}
		private onMsg(ev:egret.Event){
			var data = ev.data;
			if(data.rType!='bjl')return;
			// if(data)
			if(data.code=="03"&&data.data){//开始下注
				this.startBet(data.data);
			}else if(data.code=="04"&&data.data){//结束下注
				this.endBet(data.data);
			}else if(data.code=="05"&&data.data){//开牌
				this.openCard(data);
			}else if(data.code=="06"&&data.data){//结算
				this.result(data.data);
			}else if(data.code=="08"&&data.data){
				this.showCard(data);
			};
		}
		/**重置牌桌*/
		public cleanGame(){
			this.m_user.setGold(gameData.userInfo.ye);
			bjlbetType.reSetScore();
			this.updataBetScore(false)
			this.m_bets.removeChildren();
		}
	}
}