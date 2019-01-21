module game {
	export class gameView extends ElementUI{
		private m_back:eui.Label;//返回
		private m_resume:eui.Label;//继续
		private m_bg:eui.Image;//背景
		private m_1:eui.Image;
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
			// setTimeout(function(){
			// 	EventManager.dispatchEventWith(EventNotify.GAME_RESULT,false,{dd:11});
			// },1000)
			// this.m_bg
			var img = this.drawImage(this.m_bg,this.m_1.x,this.m_1.y,this.m_1.width,this.m_1.height);
		}
		/**截的是原始图，不经过缩放 */
		private drawImage(target: egret.DisplayObject,x?: number, y?: number, width?: number, height?: number){
			var rect = new egret.Rectangle(x,y,width,height)
			var rt:egret.RenderTexture = new egret.RenderTexture();
            rt.drawToTexture(target,rect,target.scaleX);
			rt.toDataURL("image / png",rect);
			this.m_1.texture = rt;
		}
		protected addEvent(){
			this.m_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			EventManager.dispatchEventWith(EventNotify.CLOSE_GAME,false,{dd:11});
		}
	}
}