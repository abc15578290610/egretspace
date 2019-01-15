module game {
	/**游戏结束界面 */
	export class resultView extends PanelUI{
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
	}
}