module game {
	export class PBox extends PbaseUI{
		public constructor(bodyOption?) {
			super(bodyOption);
		}
		protected initshape(){
			var factor = P2lib.factor;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
			var boxShape: p2.Shape = new p2.Box({width:this.width/factor, height:this.height/factor});
			this._shape = boxShape;
		}
	}
}