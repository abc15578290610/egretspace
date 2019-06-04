module game {
	/**宽40，高40 */
	export class wheel extends PCircle{
		public constructor(option?) {
			super(option)
			this.skinName='wheelSkin';
		}
		protected init(){
			super.init();
			this.shape.collisionGroup=gameData.WHEEL;
			this.shape.collisionMask=gameData.GROUND
		}
	}
}
module game {
	/**宽40，高40 */
	export class backwheels extends PCircle{
		public constructor(option?) {
			super(option)
			this.skinName='backWheel';
		}
		protected init(){
			super.init();
			this.shape.collisionGroup=gameData.WHEEL;
			this.shape.collisionMask=gameData.GROUND|gameData.WHEEL
		}
	}
}