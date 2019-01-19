module game {
	/**
	* 规则界面
	* by zhongqing
	* (c) copyright 2018 - 2019
	* All Rights Reserved.
	*/
	export class ruleView extends PanelUI{
		private m_rule:eui.Label;
		private m_close:eui.Label;
		private m_content:eui.Label;
		private _text:string = " 抢椅子游戏人数:每组各派2名选手,共6人。  规则:  将5把椅子背对背围成一个圈,人也围着椅子站一个";
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
			EffectUtils.typerEffect(this.m_content,this._text,300);
		}
		protected close(){
			super.close()
			PopUpManager.removePopUp(this)
		}
	}
}