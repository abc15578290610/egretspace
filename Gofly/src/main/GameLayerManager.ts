module game {
	export class GameLayerManager extends eui.UILayer{

		// 场景层 如 战场、主城、副本战场之类的
		public sceneLayer:eui.UILayer = new eui.UILayer();
		// 主UI层 如 底部功能栏
		public mainLayer:eui.UILayer = new eui.UILayer();
		// 弹窗层 如 设置、背包、装备之类的
		public panelLayer:eui.UILayer = new eui.UILayer();
		// 特效层 如 闪烁、飘字之类的
		public effectLayer:eui.UILayer = new eui.UILayer();   
		// 通讯遮罩层 和服务器通讯UI
		public maskLayer:eui.UILayer = new eui.UILayer();
		// 加载遮罩层 场景切换的时候加载资源UI
		public loadLayer:eui.UILayer = new eui.UILayer();

		private static _instance:GameLayerManager; 

		//构造方法
		public constructor(){
			super();
		}

		//游戏容器管理器单例
		public static gameLayer():GameLayerManager  
		{  
			if(!this._instance)  
				this._instance = new GameLayerManager();  
			return this._instance;  
		}  

		//初始化场景类
		public init():void {
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
		private registerEvent(){
			this.stage.addEventListener(EventNotify.SHOW_RULE,this.handleEvent,this);
			this.stage.addEventListener(EventNotify.SHOW_GAME,this.enterGame,this);
			this.stage.addEventListener(EventNotify.CLOSE_GAME,this.quitGame,this);
			this.stage.addEventListener(EventNotify.SHOW_RANK,this.enterRank,this);
			this.stage.addEventListener(EventNotify.GAME_RESULT,this.gameResult,this);
		}
		private handleEvent(e:egret.Event){
			if(e.type==EventNotify.SHOW_RULE){
				let panel = new ruleView();
				PopUpManager.addPopUp(panel,true,panel.width,panel.height,1)
			}else if(e.type==EventNotify.CLOSE_RULE){
				
			}
		}
		private enterGame(){
			if(!this.mainLayer.contains(gameView.getInstance())){
				MainView.getInstance().visible = false;
				this.mainLayer.addChild(gameView.getInstance());
				gameView.getInstance().initGame();
			}else{
				gameView.getInstance().initGame();
			}
		}
		private quitGame(){
			if(this.mainLayer.contains(gameView.getInstance())){
				this.mainLayer.removeChild(gameView.getInstance());
				MainView.getInstance().visible = true;
			}
		}
		private enterRank(){
			let panel = new RankView();
			PopUpManager.addPopUp(panel,true,panel.width,panel.height,1)
		}
		private gameResult(){
			let panel = new resultView();
			PopUpManager.addPopUp(panel,true,panel.width,panel.height,1)
		}
	}
}