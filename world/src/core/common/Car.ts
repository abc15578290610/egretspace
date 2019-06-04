module game {
	export class Car extends PBox{
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