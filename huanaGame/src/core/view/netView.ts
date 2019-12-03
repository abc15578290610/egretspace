module game {
	export class netView extends ViewElementUI{
		private m_net:eui.Image;
		private static _instance: netView;
		public static getInstance(): netView {
			if (!this._instance)
				this._instance = new netView();
			return this._instance;
		}
		public constructor() {
			super();
			this.skinName="netSkin";
			this.visible=false;
		}
		protected init(){
			super.init();
			EventCenter.getInstance().registEvent(EventNotify.NET_LOAD,this.play,this)
		}
		public play(e:egret.Event){
			if(e.data){
				this.visible=true;
				EffectUtils.rotationEffect(this.m_net)
			}else{
				this.visible=false;
				EffectUtils.removeRotationEffect(this.m_net);
				egret.Tween.removeTweens(this.m_net);
				timerTool.m_timer=0;
				timerTool.timer.stop();
			}
		}
		public stop(){
			this.visible=false;
			egret.Tween.removeTweens(this.m_net);
		}
	}
	export class netTool{
		public static send(bool:boolean=true){
			let info=new egret.Event(EventNotify.NET_LOAD);
			info.data=bool;
			EventCenter.getInstance().dispatchEventData(info);
		}
	}
}