declare function flv_pause();
module game {
	export class GameLayerManager extends eui.UILayer {

		// 场景层 如 战场、主城、副本战场之类的
		public sceneLayer: eui.UILayer = new eui.UILayer();
		// 主UI层 如 底部功能栏
		public mainLayer: eui.UILayer = new eui.UILayer();
		// 弹窗层 如 设置、背包、装备之类的
		public panelLayer: eui.UILayer = new eui.UILayer();
		// 特效层 如 闪烁、飘字之类的
		public effectLayer: eui.UILayer = new eui.UILayer();
		// 通讯遮罩层 和服务器通讯UI
		public maskLayer: eui.UILayer = new eui.UILayer();
		// 加载遮罩层 场景切换的时候加载资源UI
		public loadLayer: eui.UILayer = new eui.UILayer();

		private static _instance: GameLayerManager;

		//构造方法
		public constructor() {
			super();
		}

		//游戏容器管理器单例
		public static gameLayer(): GameLayerManager {
			if (!this._instance)
				this._instance = new GameLayerManager();
			return this._instance;
		}

		//初始化场景类
		public init(): void {
			this.registerEvent();
			this.touchThrough = true;
			this.sceneLayer.touchThrough = true;
			this.mainLayer.touchThrough = true;
			this.panelLayer.touchThrough = true;
			this.effectLayer.touchThrough = true;
			this.maskLayer.touchThrough = true;
			this.loadLayer.touchThrough = true;
			this.addChild(this.sceneLayer);
			this.addChild(this.mainLayer);
			this.addChild(this.panelLayer);
			this.addChild(this.effectLayer);
			this.addChild(this.maskLayer);
			this.addChild(this.loadLayer);
		}
		/**注册消息通知事件 */
		private registerEvent() {
			this.stage.addEventListener(EventNotify.SHOW_MAIN, this.mainSence, this);
			this.stage.addEventListener(EventNotify.GAME_RESULT, this.gameResult, this);
			this.stage.addEventListener(EventNotify.SHOW_LOGIN, this.handleEvent, this);
			this.stage.addEventListener(EventNotify.SHOW_RULE, this.handleEvent, this);
			this.stage.addEventListener(EventNotify.SHOW_GAME, this.showGame, this);
			this.stage.addEventListener(EventNotify.GAME_SWITCH_DESK, this.switchDesk, this);
			this.stage.addEventListener(EventNotify.CLOSE_GAME, this.quitGame, this);
			this.stage.addEventListener(EventNotify.SHOW_RANK, this.enterRank, this);
			this.stage.addEventListener(EventNotify.SHOW_BETRECORD, this.showBetRecord, this);
			this.stage.addEventListener(EventNotify.CLOSE_BETRECORD, this.closeBetRecord, this);
			this.stage.addEventListener(EventNotify.GAME_SHOW_SET, this.handleEvent, this);
			this.stage.addEventListener(EventNotify.GAME_SHOW_HELP, this.handleEvent, this);
		}
		private curpanel:eui.Component;
		private showBetRecord(){
			let panel = new betRecord();
			this.curpanel = panel;
			PopUpManager.addPopUp(panel, true, panel.width, panel.height, 1)
		}
		private closeBetRecord(){
			PopUpManager.removePopUp(this.curpanel);
		}
		private handleEvent(e: egret.Event) {
			if (e.type == EventNotify.SHOW_RULE) {
				let panel = new ruleView();
				PopUpManager.addPopUp(panel, true, panel.width, panel.height, 1)
			} else if (e.type == EventNotify.CLOSE_RULE) {

			}else if(e.type == EventNotify.SHOW_LOGIN){
				let panel = new login();
				PopUpManager.addPopUp(panel, true, panel.width, panel.height, 1)
			}else if(e.type == EventNotify.GAME_SHOW_SET){
				let panel = new settingView();
				PopUpManager.addPopUp(panel, true, panel.width, panel.height, 1)
			}else if(e.type == EventNotify.GAME_SHOW_HELP){
				let panel = new helpView();
				PopUpManager.addPopUp(panel, true, panel.width, panel.height, 1)
			}
		}
		private mainSence(){
			if (!this.mainLayer.contains(MainView.getInstance())) {
				this.mainLayer.addChild(MainView.getInstance());
				MainView.getInstance().initUI();
			} else {
				MainView.getInstance().initUI();
			}
		}
		private backHall(res){
				if(res.data){
					game.gameData.userInfo.rType = res.data.rType;
					game.gameData.userInfo.roomId = res.data.roomId;
					game.gameData.userInfo.ye = res.data.ye;
				}
				MainView.getInstance().initUI();
		}
		private showGame(e:egret.Event) {
			var m_game = gameData.gameFactory(e.data.type);
			if (!this.mainLayer.contains(m_game)) {
				MainView.getInstance().visible = false;
				this.mainLayer.addChild(m_game);
				m_game.initGame();
			} else {
				m_game.initGame();
			}
		}
		private switchDesk(e:egret.Event) {
			var m_game = gameData.gameFactory(e.data.type);
			setTimeout(()=>{
				netTool.send(false);
			},2000)
			if (!this.mainLayer.contains(m_game)) {
				MainView.getInstance().visible = false;
				this.mainLayer.addChild(m_game);
				m_game.initGame();
			} else {
				m_game.initGame();
			}
		}
		private quitGame(e:egret.Event) {
			flv_pause();
			var m_game = gameData.gameFactory(e.data.type);
			this.panelLayer.removeChildren();
			if (this.mainLayer.contains(m_game)) {
				this.mainLayer.removeChild(m_game);
				game.gameData.userInfo.rType='';
				game.gameData.userInfo.roomId='';
				console.log("返回大厅")
				rPomelo.request(gameData.routes.returnHall,"",this.backHall,this);
				MainView.getInstance().visible = true;
			}
		}
		private enterRank() {
			let panel = new RankView();
			PopUpManager.addPopUp(panel, true, panel.width, panel.height, 1)
		}
		private gameResult(e: egret.Event) {
			console.log("结算",e.data)
			let panel = gameData.ResultFactory(e.data.rType);
			if(e.data.code=="05"){//开牌
				panel.initData();
				panel.setdata(e.data.data);
				PopUpManager.addPopUp(panel,false,GameConfig.curWidth(),GameConfig.curHeight(),0, true, false,this.mainLayer)
			}else if(e.data.code=="08"){//发牌
				if(!this.panelLayer.contains(panel)){
					panel.initData();
					PopUpManager.addPopUp(panel,false,GameConfig.curWidth(),GameConfig.curHeight(), 1, true, false)
				}
				panel.doSendCard(e.data.data.pk)
			}
		}
	}
}