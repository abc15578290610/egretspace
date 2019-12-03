module game {
	export class betNum extends eui.Component{
		private m_cm:eui.Image;
		private m_select:eui.Image;
		public type:number;
		public constructor() {
			super();
			this.skinName="betNumSkin";
			this.touchChildren=false;
		}
		/**
		 * setType
		 */
		public setType(_type:number=0) {
			this.type = _type;
			this.m_cm.source=RES.getRes("cm"+_type+"_png");
		}
		public select(bool){
			this.m_select.visible=bool;
		}
	}
}