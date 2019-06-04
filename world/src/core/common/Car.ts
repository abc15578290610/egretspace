module game {
	export class Car extends PBox{
		public constructor(option?) {
			super(option)
			this.skinName='carSkin';
		}
		protected init(){
			super.init();
			this.shape.collisionGroup=gameData.CAR;
			this.shape.collisionMask=gameData.GROUND;
		}
	}
}