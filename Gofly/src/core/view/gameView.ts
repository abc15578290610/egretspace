module game {
	export class gameView extends ElementUI{
		private m_back:eui.Label;//返回
		private m_resume:eui.Label;//继续
		private static _instance:gameView;
		public static getInstance():gameView  
		{  
			if(!this._instance)  
				this._instance = new gameView();  
			return this._instance;  
		}  
		public constructor() {
			super();
			this.skinName = "gameViewSkin";
		}
		protected init(){
			setTimeout(function(){
				EventManager.dispatchEventWith(EventNotify.GAME_RESULT,false,{dd:11});
			},1000)
		}
		protected addEvent(){
			this.m_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			EventManager.dispatchEventWith(EventNotify.CLOSE_GAME,false,{dd:11});
		}
	}
}