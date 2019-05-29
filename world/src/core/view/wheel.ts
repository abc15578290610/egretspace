module game {
	/**宽40，高40 */
	export class wheel extends eui.Component{
		public constructor() {
			super()
			this.skinName='wheelSkin';
			this.anchorOffsetX = this.width/2;
			this.anchorOffsetY = this.height/2
		}
	}
}