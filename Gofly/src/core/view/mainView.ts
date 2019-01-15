module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Label;//游戏开始
		private m_rule:eui.Label;//游戏规则
		private static _instance:MainView;
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
			
		}
		protected addEvent(){
			this.m_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			EventManager.dispatchEventWith(EventConfigData.SHOW_RULE,false,{dd:11});
		}
	}
}