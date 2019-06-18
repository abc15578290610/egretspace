module game {
	export class gameView extends ElementUI {
		private m_back: eui.Label;//返回
		private m_bg: eui.Image;//背景
		private static _instance: gameView;
		public static getInstance(): gameView {
			if (!this._instance)
				this._instance = new gameView();
			return this._instance;
		}
		public constructor() {
			super();
			this.skinName = "gameViewSkin";
		}
		protected init() {
		}
		private time_num = 0;
		public initGame() {

		}
		protected addEvent() {
			this.m_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
		}
		private handleEvent(e: egret.TouchEvent) {
			EventManager.dispatchEventWith(EventNotify.CLOSE_GAME, false, { dd: 11 });
		}
	}
}