declare function flv_start();
module game {
	/**主界面（开始界面）*/
	export class MainView extends ViewElementUI{
		private m_user:userView;
		private m_gameList:eui.Group;
		private static _instance:MainView;
		private m_left:eui.Group;
		public m_msg:msgCell;
		private m_right:eui.Group;
		private m_tab:eui.TabBar;

		private m_record:eui.Image;
		private m_help:eui.Image;
		private m_set:eui.Image;

		public static getInstance():MainView  
		{  
			if(!this._instance)  
				this._instance = new MainView();
			return this._instance;  
		}  
		public constructor() {
			super();
			this.skinName = "mainViewSkin";
		}
		protected init(){
			super.init();
			
			if(gameData.userInfo.roomId&&gameData.userInfo.rType){
				this.visible=false;
			}else{
				this.visible=true;
			}
			this.initGameList();
		}
		public initUI(){
			this.m_right.x = GameConfig.curWidth()-this.m_right.width;
			EffectUtils.fadeIntEffect(this.m_right,4);
			EffectUtils.fadeIntEffect(this.m_left,2);
			EffectUtils.fadeIntEffect(this.m_gameList.parent,5);
			let loginData = game.gameData.login.data;
			if(loginData){
				let arr = [];
				arr.push(loginData.msg);
				this.m_msg.setData(arr)
			}
			this.m_msg.play();
			console.log(gameData.userInfo)
			this.m_user.setData(gameData.userInfo.name,gameData.userInfo.userId,'')
			this.m_user.setGold(gameData.userInfo.ye);
			netTool.send(false);
			MainView.getInstance().visible = true;

			this.m_tab.selectedIndex=2;//默认百家乐
			rPomelo.request(gameData.bjlroutes.doSelectGame,"",this.gameListData,this)//初始化游戏列表
		}
		private initGameList(){
			this.m_gameList.scrollV=0;
			var gamelist = gameData.nn_rooms;
			console.log("房间列表",gamelist)
			var rtype = game.gameData.userInfo.rType;
			this.m_gameList.removeChildren();
			for(let i=0;i<gamelist.length;i++){
				let _room = gameData.itemfactory(rtype);
				_room.initData(gamelist[i]);
				_room.y = Math.floor(i/2)*(_room.height*_room.scaleX+20);
				if(i%2<=0){
					_room.x=10;
				}else{
					_room.x = _room.width*_room.scaleX+50;
				}
				if(i<3){
					_room.alpha=0;
					setTimeout(()=>{
						EffectUtils.fadeIntEffect(_room,5);
					},i*500+300)
				}
				this.m_gameList.addChild(_room);
			}
			EventCenter.getInstance().registEvent(EventNotify.SOCKET_INFO,this.onMsg,this)
			this.visible=true;
		}
		private reflashInfo(e:egret.Event){
			this.m_user.setGold(gameData.userInfo.ye);
		}
		private selectTabItem(e:egret.TouchEvent){
			console.log(this.m_tab.selectedItem)
			if(this.m_tab.selectedItem.name=="百家乐"){
				rPomelo.request(gameData.bjlroutes.doSelectGame,"",this.gameListData,this)
			}else if(this.m_tab.selectedItem.name=="龙虎"){
				rPomelo.request(gameData.lhroutes.doSelectGame,"",this.gameListData,this)
			}
		}
		private gameListData(e){
			console.log(e.data)
			if(!e.data||e.data.length<=0){game.TipsBase.getInstance().setContent("房间暂未开放",1);return}
			gameData.nn_rooms = GameConfig.strJson(e.data,"#");
			if(gameData.nn_rooms.length>0&&gameData.nn_rooms){
				game.gameData.userInfo.rType=e.rType;
				this.initGameList();
			}else{
				game.TipsBase.getInstance().setContent("房间暂未开放",1)
			}
		}
		private onMsg(ev:egret.Event){
			var data = ev.data;
			console.log("选桌广播info",data)
			let target = this.m_gameList.getChildByName(data.roomId);
			if(!target||!data)return;
			if(data.rType!=game.gameData.userInfo.rType)return;
			if(data.code=="03"&&data.data){//开始下注
				(target as gameItem).updateItem(parseInt(data.data.betTime),parseInt(data.data.state))
			}else if(data.code=="04"&&data.data){//结束下注
				(target as gameItem).setState(parseInt(data.data.state))
			}else if(data.code=="05"&&data.data){//开牌
				(target as gameItem).setState(parseInt(data.data.state))
			}else if(data.code=="06"&&data.data){//结算
				(target as gameItem).setState(parseInt(data.data.state))
			};
		}
		protected addEvent(){
			EventCenter.getInstance().registEvent(EventNotify.COIN_INFO,this.reflashInfo,this);
			this.m_tab.addEventListener(egret.TouchEvent.CHANGE,this.selectTabItem,this);
			this.m_gameList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
			this.m_set.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectHandle,this);
			this.m_record.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectHandle,this);
			this.m_help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectHandle, this);
		}
		private selectHandle(e:egret.TouchEvent){
			var target = e.currentTarget;
			if(target==this.m_help){
				EffectUtils.playEffect(target,1);
				this.stage.dispatchEventWith(EventNotify.GAME_SHOW_HELP);
			}else if(target==this.m_set){
				EffectUtils.playEffect(target,1);
				this.stage.dispatchEventWith(EventNotify.GAME_SHOW_SET);
			}else if(target==this.m_record){
				this.stage.dispatchEventWith(EventNotify.SHOW_BETRECORD);
			}
		}
		private handleEvent(e: egret.TouchEvent) {
			if(e.currentTarget==this.m_gameList){
				console.log(e.target);
				if(e.target instanceof gameItem){
					let item = e.target as gameItem;
					if(item.roomId){
						let rdata = {roomId:0};
						rdata.roomId = item.roomId;
						gameData.userInfo.roomId = rdata.roomId+"";
						console.log("选择房间",rdata.roomId)
						var rtype = game.gameData.userInfo.rType;
						if(rtype=='nn'){
							rPomelo.request(gameData.routes.doSelectDesk,rdata,this.enter,this)
						}else if(rtype=='bjl'){
							rPomelo.request(gameData.bjlroutes.doSelectDesk,rdata,this.enter,this)
						}else if(rtype=='lh'){
							rPomelo.request(gameData.lhroutes.doSelectDesk,rdata,this.enter,this)
						}
					}else{
						game.TipsBase.getInstance().setContent("此桌号暂未开放",1)
					}
				}
			}
		}
		private enter(resp:any){
			if(!resp.data){game.TipsBase.getInstance().setContent("此桌号暂未开放",1);return;}
			gameData.userInfo.rType =resp.rType;
			gameData.userInfo.roomId = resp.roomId;
			gameData.roomData = GameConfig.strJson(resp.data,',');
			flv_start()
			EventCenter.getInstance().removeRegistEvent(EventNotify.SOCKET_INFO,this.onMsg,this)
			this.m_msg.stop();
			EventManager.dispatchEventWith(EventNotify.SHOW_GAME,false,{type:resp.rType});//进入游戏房间
		}
		protected onResize(){
			super.onResize();
		}
	}
}