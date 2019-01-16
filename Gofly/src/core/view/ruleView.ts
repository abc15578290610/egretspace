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
		}
		protected init(){
			super.init();
		}
	}
}