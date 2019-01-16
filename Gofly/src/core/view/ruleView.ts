module game {
	export class ruleView extends PanelUI{
		private m_rule:eui.Label;
		private m_close:eui.Label;
		public constructor() {
			super();
			this.skinName="ruleViewSkin";
			this.touchEnabled = false;
		}
		protected addEvent(){
			this.m_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this)
		}
		protected init(){
			super.init();
		}
		protected close(){
			super.close()
			PopUpManager.removePopUp(this)
		}
	}
}