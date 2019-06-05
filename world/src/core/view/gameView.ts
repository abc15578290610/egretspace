module game {
	export class gameView extends ElementUI{
		private static _instance: gameView;
		public static getInstance(): gameView {
			if (!this._instance)
				this._instance = new gameView();
			return this._instance;
		}
		public constructor() {
			super();
			this.skinName="gameSkin"
		}
		public initGame() {
			var world = P2lib.gameWorld().initWorld();
			console.log("初始化")
						//创建plane平面
			var planeBody =  P2lib.gameWorld().createPlaneBody()
			planeBody.shapes[0].collisionGroup=gameData.GROUND;
			planeBody.shapes[0].collisionMask=gameData.CAR|gameData.WHEEL
			world.addBody(planeBody);
		}
	}
}