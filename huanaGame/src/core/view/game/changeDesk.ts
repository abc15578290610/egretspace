module game {
	export class changeDesk extends PanelUI{
		private state = false;
		private m_change:eui.Image;
		private m_tab:eui.Group;
		private m_list:eui.Group;
		private m_arrow:eui.Image;
		public constructor() {
			super();
			this.skinName="changeGame";
		}
		/**所有子组件初始化完成 */
		protected init(){
			super.init();
			this.x=GameConfig.curWidth()-60;
			this.m_change.addEventListener(egret.TouchEvent.TOUCH_TAP,this.switch,this);
			this.m_list.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_tab.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tabSelect,this);
		}
		private tabSelect(e:egret.TouchEvent){
			let target = e.target;
			if(target instanceof eui.Image&&e.target!=this.m_arrow){
				this.invalidateProperties();
				this.m_arrow.y = target.y
				this.m_arrow.x = target.x-15;
			}
		}
		private updataList(){
			// let item = new bjlchangeList();
			// item.setData([])
		}
		public initData(){
			rPomelo.request(gameData.bjlroutes.doSelectGame,"",this.gameListData,this)//初始化游戏列表
		}
		private initGameList(){
			this.m_list.scrollV=0;
			var gamelist = gameData.nn_rooms;
			console.log("房间列表",gamelist)
			var rtype = game.gameData.userInfo.rType;
			this.m_list.removeChildren();
			for(let i=0;i<gamelist.length;i++){
				let _room = new bjlchangeList();
				_room.setData(gamelist[i]);
				if(i<3){
					_room.alpha=0;
					setTimeout(()=>{
						EffectUtils.fadeIntEffect(_room,5);
					},i*500+300)
				}
				this.m_list.addChild(_room);
			}
			this.visible=true;
		}
		private gameListData(e){
			if(e.data.length<=0){game.TipsBase.getInstance().setContent("房间暂未开放",1);return}
			gameData.nn_rooms = GameConfig.strJson(e.data,"#");
			if(gameData.nn_rooms.length>0&&gameData.nn_rooms){
				game.gameData.userInfo.rType=e.rType;
				this.initGameList();
			}else{
				game.TipsBase.getInstance().setContent("房间暂未开放",1)
			}
		}
		private cleanBox(){

		}
		/**
		 * switch
		 */
		public switch() {
			if(!this.state){
				this.cleanBox()
				this.initData();
				this.effect();
				this.state=true;
			}else{
				this.effect()
				this.state=false;
			}
		}
		private effect(){
			if(!this.state){
				this.x=GameConfig.curWidth()-60
				egret.Tween.get(this).to({x:GameConfig.curWidth()-388},600,egret.Ease.cubicIn); 
			}else{
				this.x=GameConfig.curWidth()-388
				egret.Tween.get(this).to({x:GameConfig.curWidth()-60},600,egret.Ease.cubicIn);
			}
		}
		private handleEvent(e: egret.TouchEvent) {
			if(e.currentTarget==this.m_list){
				console.log("点击",e.target);
				if(e.target instanceof bjlchangeList){
					let item = e.target as bjlchangeList;
					console.log("选择",item)
					if(item.roomId){
						netTool.send(true);
						let rdata = {roomId:0};
						rdata.roomId = item.roomId;
						gameData.userInfo.roomId = rdata.roomId+"";
						console.log("选择房间",rdata.roomId)
						var rtype = game.gameData.userInfo.rType;
						if(rtype=='nn'){
							rPomelo.request(gameData.routes.doSelectDesk,rdata,this.enter,this)
						}else if(rtype=='bjl'){
							rPomelo.request(gameData.bjlroutes.doSelectDesk,rdata,this.enter,this)
						}
					}else{
						game.TipsBase.getInstance().setContent("此桌号暂未开放",1)
					}
				}
			}
		}
		private enter(resp:any){
			console.log("进入",resp)
			if(!resp.data){game.TipsBase.getInstance().setContent("此桌号暂未开放",1);return;}
			gameData.userInfo.rType =resp.rType;
			gameData.userInfo.roomId = resp.roomId;
			gameData.roomData = GameConfig.strJson(resp.data,',');
			EventManager.dispatchEventWith(EventNotify.GAME_SWITCH_DESK,false,{type:resp.rType});//进入游戏房间
		}
	}
}