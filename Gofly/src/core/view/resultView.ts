module game {
	/**
	* 结算界面
	* by zhongqing
	* (c) copyright 2018 - 2019
	* All Rights Reserved.
	* todo
	*/
	export class resultView extends PanelUI{
		public constructor() {
			super();
			this.skinName="resultViewSkin";
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