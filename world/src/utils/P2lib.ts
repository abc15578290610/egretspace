module game {
	export class P2lib {
		public static factor = 50;
		public static defourWorld = null;
		public constructor() {
			
		}
		public static initWorld():p2.World{
			P2lib.defourWorld = new p2.World();
			return P2lib.defourWorld
		}
		/**
		 * 创建方形刚体
		 * @param display 绑定显示对象
		 * @param parent 父容器
		 * @param Option { mass: 1, position: [positionX, positionY], angularVelocity: 1 }
		 */
		public static createBoxBody(display:egret.DisplayObject,parent:egret.DisplayObjectContainer,Option=null):p2.Body{
			var factor = P2lib.factor;
			display.anchorOffsetX = display.width / 2;
			display.anchorOffsetY = display.height / 2;
			var positionX: number = display.x / factor;
			var positionY: number = (egret.MainContext.instance.stage.stageHeight - display.y) / factor;
			var boxShape: p2.Shape = new p2.Box({width:display.width/factor, height:display.height/factor});
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
		 * 创建圆形刚体
		 * @param display 绑定显示对象
		 * @param parent 父容器
		 * @param Option { mass: 1, position: [positionX, positionY], angularVelocity: 1 }
		 */
		public static createCircleBody(display:egret.DisplayObject,parent:egret.DisplayObjectContainer,Option=null):p2.Body{
			var factor = P2lib.factor;
			display.anchorOffsetX = display.width / 2;
			display.anchorOffsetY = display.height / 2;
			var positionX: number = display.x / factor;
			var positionY: number = (egret.MainContext.instance.stage.stageHeight - display.y) / factor;
			var boxShape: p2.Circle = new p2.Circle({radius:display.width/factor/2});
			if(Option){
				Option.position=[positionX, positionY]
			}
			console.log(positionX, positionY)
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
			var factor = P2lib.factor;
			var planeShape: p2.Plane = new p2.Plane();
			var planeBody: p2.Body = new p2.Body();
			planeBody.addShape(planeShape);
			planeBody.displays = [];
			return planeBody
		}
		/**
		 * 白鹭x坐标转换为p2物理引擎x坐标
		 */
		public static Xfix(x:number){
			return Math.floor(x / P2lib.factor)
		}
		/**
		 * 白鹭y坐标转换为p2物理引擎y坐标
		 */
		public static Yfix(y:number){
			return Math.floor((egret.MainContext.instance.stage.stageHeight - y) / P2lib.factor);
		}
		/**在指定坐标创建一个刚体*/
		public static addOneBox(x:number,y:number,parent:egret.DisplayObjectContainer): void {
				var positionX: number = x/P2lib.factor;
				var positionY: number = (egret.MainContext.instance.stage.stageHeight - y) / P2lib.factor;
				// if (Math.random() > 0.8) {
				// 	var button = new Mbutton()
				// 	button.x = e.stageX;
				// 	button.y = e.stageY;
				// 	world.addBody(P2lib.createBoxBody(button,self,{ mass: 1,angularVelocity: 1}))
				// }else{
					var Ball = GameLib.createBall(50)
					Ball.x = x;
					Ball.y = y;
					P2lib.defourWorld.addBody(P2lib.createCircleBody(Ball,parent,{ mass: 1,angularVelocity: 1}))
				// }
		}
	}
}