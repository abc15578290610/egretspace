module game {
	export class shapeView extends PBox{
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
	export class brickView extends PBox{
		public constructor(option?) {
			super(option)
			this.skinName='brickSkin';
		}
		protected init(){
			super.init();
			this.shape.collisionGroup=gameData.BRICK;
			this.shape.collisionMask=gameData.GROUND|gameData.BRICK
		}
	}
}