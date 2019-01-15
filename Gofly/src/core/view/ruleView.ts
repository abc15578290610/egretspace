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
			console.log(this.width,"----",this.height)
		}
		private handleEvent(e:egret.TouchEvent){
			console.log("规则事件",e.data);
		}
	}
}