module game {
	export class CarView extends ElementUI{
		public constructor() {
			super();
		}
		protected init(){
			super.init();
			//创建world
			var world: p2.World = P2lib.gameWorld().initWorld();
			world.sleepMode = p2.World.ISLAND_SLEEPING;
			world.defaultContactMaterial.friction = 100;
			//创建plane平面
			var planeBody =  P2lib.gameWorld().createPlaneBody()
			planeBody.shapes[0].collisionGroup=gameData.GROUND;
			planeBody.shapes[0].collisionMask=gameData.CAR|gameData.WHEEL
			world.addBody(planeBody);

			egret.Ticker.getInstance().register(function(dt) {
				if (dt < 10||dt > 1000) {
					return;
				}
				world.step(dt / 1000);
				var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
				var l = world.bodies.length;
				for (var i: number = 0; i < l; i++) {
					var boxBody: p2.Body = world.bodies[i];
					var box: egret.DisplayObject = boxBody.displays[0];
					if (box) {
						box.x = boxBody.position[0] * P2lib.factor;
						box.y = stageHeight - boxBody.position[1] * P2lib.factor;
						box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
					}
				}
			}, this);
			var self = this;

			var car = new Car({mass:1})
			car.x = 550;
			car.y = 720-(car.height/2);
			this.addChild(car)

			var beforewheel = new wheel({mass:1})
			beforewheel.x = 600;
			beforewheel.y = 720;
			this.addChild(beforewheel);

			var backwheel = new backwheels({mass:1})
			backwheel.x = 500;
			backwheel.y = 720;
			this.addChild(backwheel);

			var revoluteBack = new p2.PrismaticConstraint(car.body, backwheel.body, {
                localAnchorA: [-1, -0.5],//设置相对于A锚点
                localAnchorB: [0, 0],//设置相对于B锚点
                disableRotationalLock:true
            });
            var revoluteFront = new p2.PrismaticConstraint(car.body, beforewheel.body, {
                localAnchorA: [1.5,-0.5], // Where to hinge second wheel on the chassis
                localAnchorB: [0, 0],     // Where the hinge is in the wheel (center)
                disableRotationalLock:true
            });
			var wheelConstraint = new p2.DistanceConstraint(beforewheel.body,backwheel.body)
			revoluteBack.setLimits(0,0.5);//设置bodyB可以位移的最大值
            revoluteFront.setLimits(0,0.5);
            world.addConstraint(revoluteFront);
			world.addConstraint(revoluteBack);
			world.addConstraint(wheelConstraint);
			revoluteBack.setStiffness(90)
			revoluteFront.setStiffness(70)

			var speed=50;
			document.onkeydown=function(event){
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if(e && e.keyCode==37){ // 按 left 
					backwheel.body.damping=0.1
					backwheel.body.angularForce+=speed;
				}
				if(e && e.keyCode==38){ //按up
					//要做的事情
				}            
				if(e && e.keyCode==39){ // right
					backwheel.body.damping=0.1
					backwheel.body.angularForce-=speed;
				}
				if(e && e.keyCode==40){ // down
					backwheel.body.damping=0.999999
					backwheel.body.angularForce=0;
					backwheel.body.angularVelocity=0;
				}
			};
		}
	}
}