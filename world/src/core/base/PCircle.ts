module game {
	export class PCircle extends PbaseUI{
		public constructor(bodyOption?) {
			super(bodyOption);
		}
		//重写形状用于碰撞检测
		protected initshape(){
			var factor = P2lib.factor;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
			var boxShape:p2.Circle = new p2.Circle({radius:this.width/factor/2});
			this._shape = boxShape;
		}
	}
}