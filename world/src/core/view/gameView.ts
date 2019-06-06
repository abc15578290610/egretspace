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
			//创建plane平面
			var planeBody =  P2lib.gameWorld().createPlaneBody()
			planeBody.shapes[0].collisionGroup=gameData.GROUND;
			planeBody.shapes[0].collisionMask=gameData.CAR|gameData.WHEEL|gameData.BRICK
			world.addBody(planeBody);
		}
		/**
		 * super.addEvent()
		 */
		private beginPos=[0,0]
		private endPos=[0,0]
		public addEvent() {
			console.log("添加事件")
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandle,this)
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.touchHandle,this)
		}
		private wheelA:stone
		private touchHandle(e:egret.TouchEvent){
			console.log(e.stageY)
			console.log(e.type)
			if(e.type==egret.TouchEvent.TOUCH_BEGIN){
				this.wheelA = new stone();
				this.wheelA.x=e.stageX
				this.wheelA.y=e.stageY
				this.beginPos[0]=e.stageX;
				this.beginPos[1]=egret.MainContext.instance.stage.stageHeight-e.stageY;
			}else if(e.type==egret.TouchEvent.TOUCH_END){
				this.endPos[0]=e.stageX;
				this.endPos[1]=egret.MainContext.instance.stage.stageHeight-e.stageY;
				var pos = P2lib.gameWorld().Point(this.beginPos,this.endPos)
				this.addChild(this.wheelA);
				this.wheelA.body.applyForce(pos,[0,0])
				console.log(pos)
			}
		}
	}
}