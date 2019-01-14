module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Label;
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
			this.addChild(new ruleView())
		}
		protected addEvent(){
			this.m_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			console.log("点击事件");
			EventManager.dispatchEventWith("show_rule",false,{dd:11});
		}
	}
}