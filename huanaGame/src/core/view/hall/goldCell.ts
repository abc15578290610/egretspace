module game {
	export class goldCell extends eui.Component{
		private m_num:eui.BitmapLabel;
		public constructor() {
			super();
			this.skinName="goldSkin";
		}
		public setText(num:number){
			this.m_num.text = num+"";
		}
	}
}