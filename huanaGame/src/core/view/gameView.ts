module game {
	export class gameView extends ViewElementUI {
		private m_resultCell:resultCell;
		private m_back: eui.Image;//返回
		private m_bg: eui.Image;//背景
		private m_step:string;//游戏步骤
		private m_bet1:betType1;
		private m_bet2:betType2;
		private m_bet3:betType3;
		private m_ludan:ludan;
		private m_ye:eui.BitmapLabel;
		private m_roomId:eui.Label;
		private m_xh:eui.Label;
		private state:number = 0 ;//游戏状态 0:无 1:开始下注 2:结束下注 3:结算
		private m_switch:eui.Image;//切换房间
		private m_help:eui.Image;
		private m_set:eui.Image;

		private m_bets:eui.Group;

		private m_sure:eui.Image;//确定下注
		private m_cancel:eui.Image;//取消下注

		public m_msg:msgCell;
		private static _instance: gameView;
		public static getInstance(): gameView {
			if (!this._instance)
				this._instance = new gameView();
			return this._instance;
		}
		public constructor() {
			super();
			this.skinName = "gameViewSkin";
		}
		protected init() {
			super.init();
			this.m_sure.visible=false;
			this.m_cancel.visible=false;
			this.m_msg.setData(["全新网游的新模式",'多变的玩法配以先进技术支持',"亲爱的玩家:服务器将于X月X日停机维护"])
			this.m_msg.play();
		}
		private time_num = 0;
		public initGame() {
			EventCenter.getInstance().registEvent(EventNotify.SOCKET_INFO,this.onMsg,this)
			this.m_sure.visible=false;
			this.m_cancel.visible=false;
			this.m_resultCell.visible = false;
			this.m_roomId.text = "局号:"+gameData.roomData[0];
			this.m_xh.text = "限红:"+gameData.roomData[1];
			this.state = parseInt(gameData.roomData[3]);
			this.cleanGame();
			betType.onLine_score = [0,0,0,0,0,0,0,0,0,0,0,0];
		}
		private userInfo(e:egret.Event){

		}
		protected addEvent() {
			// EventCenter.getInstance().registEvent(EventNotify.COIN_INFO,this.userInfo,this)
			this.m_sure.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
			this.m_set.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
			this.m_bet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBetHandle, this);
			this.m_bet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBetHandle, this);
			this.m_bet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBetHandle, this);
			this.m_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBetHandle, this);
		}
		private switchRoom(){
			EventCenter.getInstance().dispatchEventData(new egret.Event(EventNotify.SWITCH_ROOM))
		}
		private handleEvent(e: egret.TouchEvent) {
			var target = e.currentTarget;
			if(target==this.m_back){
				EventCenter.getInstance().removeRegistEvent(EventNotify.SOCKET_INFO,this.onMsg,this)
				EventManager.dispatchEventWith(EventNotify.CLOSE_GAME, false,{type:'nn'});
			}else if(target==this.m_sure){//确定下注
				EffectUtils.playEffect(target,4);
				let arr = betType.score;
				let data = {"roomId":0,"bet":''};
				if(gameData.userInfo.roomId.length<=0){
					console.warn("注意房间id不能为空串!!!!!!")
					return;
				}
				data.roomId=parseInt(gameData.userInfo.roomId);
				data.bet=this.filterArr(arr);
				if(data.bet.length>0){
					console.log(data,"请求下注")
					rPomelo.request(gameData.routes.doBet,data,this.doBetSuccess,this)
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
		private setTotalScore(newArr:number[],oldArr:number[]){
			var _arr =[];
			for(let i=0;i<newArr.length-1;i++){
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
			let item = (((e.target as eui.Image).parent) as betType);
			if(e.target.name){
				console.log(betType.score)
				item.addScore(e.target.name,gameData.betList["cm"+betList.selectNum]);
				this.updataBetScore()
				let _target = e.target as eui.Image;
				let _x = _target.localToGlobal().x+(Math.random()*60)+20
				let _y = e.target.localToGlobal().y+(Math.random()*30)+20
				this.m_betlist.play(_x,_y)
			}
		}
		public updataBetScore(bool=true){
			var option = { time: 1500,initNum:1,num: 0, regulator: 50 }
			var allscore = this.setTotalScore(betType.score,betType.onLine_score);
			allscore.map((val,index)=>{
				if(index<=3){
					let old_val = parseInt(this.m_bet1["all_"+index].text);
					option.initNum = old_val;
					option.num=val;
					if(bool){
						this.m_bet1.playEffect(this.m_bet1["all_"+index],option)
					}else{
						this.m_bet1["all_"+index].text = val;
					}
				}else if(index>3&&index<=7){
					let _n = index-4;
					let old_val = parseInt(this.m_bet2["all_"+_n].text);
					option.initNum = old_val;
					option.num=val;
					if(bool){
						this.m_bet2.playEffect(this.m_bet2["all_"+_n],option)
					}else{
						this.m_bet2["all_"+_n].text = val;
					}
				}else if(index>7&&index<=11){
					let _k = index-8;
					let old_val = parseInt(this.m_bet3["all_"+_k].text);
					option.initNum = old_val;
					option.num=val;
					if(bool){
						this.m_bet3.playEffect(this.m_bet3["all_"+_k],option)
					}else{
						this.m_bet3["all_"+_k].text = val;
					}
				}
			})
		}
		private doBetSuccess(res){
			if(res.code=='401'){
				gameData.userInfo.ye = res.data.ye;
				this.m_ye.text = gameData.userInfo.ye+"";
				betType.onLine_score = this.setTotalScore(betType.score,betType.onLine_score);
				betType.reSetScore();
			}else{
				this.cleanGame();
			}
			console.log("下注回调",res)
			game.TipsBase.getInstance().setContent(res.msg,1)
		}
		public getRecordBet(){
			console.log(gameData.userInfo.rType,"房间类型")
			let data = {rType:"nn",date:1}//date:1/2/3
			rPomelo.request(gameData.routes.getRecord,data,this.doRecordBetSuccess,this)
		}
		private doRecordBetSuccess(res){
			console.log("下注记录回调",res)
		}
		//开始下注
		private startBet(res){
			console.log("开始下注",res)
			this.m_sure.visible=true;
			this.m_cancel.visible=true;
			gameData.userInfo.ye = res.ye;
			this.state = res.state
			this.m_resultCell.play(res.betTime,res.state);
			this.m_bet1.setBase(res.bl)
			this.m_bet2.setBase(res.bl)
			this.m_bet3.setBase(res.bl)
			this.m_ye.text = gameData.userInfo.ye+"";
		}
		//结束下注
		private endBet(res){
			this.m_sure.visible=false;
			this.m_cancel.visible=false;
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
				betType.onLine_score = [0,0,0,0,0,0,0,0,0,0,0,0];
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
			if(data.rType!='nn')return;
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
			this.m_ye.text = gameData.userInfo.ye+"";
			betType.reSetScore();
			this.updataBetScore(false)
			this.m_bets.removeChildren();
		}
	}
}