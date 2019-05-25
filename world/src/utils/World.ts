module game {
	export class World {
		public static factor = 50;
		public static defourWorld = null;
		public constructor() {
			
		}
		public static initWorld():p2.World{
			World.defourWorld = new p2.World();
			return World.defourWorld
		}
		/**
		 * 创建方形刚体
		 * @param display 绑定显示对象
		 * @param parent 父容器
		 * @param Option { mass: 1, position: [positionX, positionY], angularVelocity: 1 }
		 */
		public static createBoxBody(display:egret.DisplayObject,parent:egret.DisplayObjectContainer,Option=null):p2.Body{
			var factor = World.factor;
			display.anchorOffsetX = display.width / 2;
			display.anchorOffsetY = display.height / 2;
			var positionX: number = Math.floor(display.x / factor);
			var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - display.y) / factor);
			var boxShape: p2.Shape = new p2.Box({width:Math.floor(display.width/factor), height: Math.floor(display.height/factor)});
			if(Option){
				Option.position=[positionX, positionY]
			}
			var boxBody: p2.Body = new p2.Body(Option);
			boxBody.addShape(boxShape);
			boxBody.displays = [display];
			parent.addChild(display);
			return boxBody
		}

		/**
		 * 创建平面刚体
		 * @param display 绑定显示对象
		 * @param parent 父容器
		 * @param Option { mass: 1, position: [positionX, positionY], angularVelocity: 1 }
		 */
		public static createPlaneBody(Option=null):p2.Body{
			var factor = World.factor;
			var planeShape: p2.Plane = new p2.Plane();
			var planeBody: p2.Body = new p2.Body();
			planeBody.addShape(planeShape);
			planeBody.displays = [];
			return planeBody
		}
	}
}