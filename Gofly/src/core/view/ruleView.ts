module game {
	export class ruleView extends ElementUI{
		private m_rule:eui.Label;
		private m_close:eui.Label;
		public constructor() {
			super();
			this.skinName="ruleViewSkin";
			this.touchEnabled = false;
		}
		protected addEvent(){
			this.stage.addEventListener("show_rule",this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			console.log("规则事件",e.data);
		}
	}
}