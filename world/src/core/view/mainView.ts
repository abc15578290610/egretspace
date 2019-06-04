module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Button;//开始挑战
		private m_rule:eui.Button;//游戏规则
		private m_rank:eui.Button;//排行榜
		private static _instance:MainView;
		/**前轮 */
		private beforewheel:p2.Body= null;

		/**后轮 */
		private backwheel:p2.Body= null;
		private _car:p2.Body=null;
		private _revoluteBack:p2.PrismaticConstraint;
		private _wheel:backwheels
		public static getInstance():MainView  
		{  
			if(!this._instance)  
				this._instance = new MainView();  
			return this._instance;  
		}  
		public constructor() {
			super();
			this.skinName = "mainViewSkin";
		}
		protected init(){
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
						// if (boxBody.sleepState == p2.Body.SLEEPING) {
						// 	box.alpha = 0.5;
						// }
						// else {
						// 	box.alpha = 1;
						// }
					}
				}
			}, this);
			var self = this;

			var button = new Mbutton()
			button.x = 550;
			button.y = 720-(button.height/2);
			var car = P2lib.gameWorld().createBoxBody(button,self,{ mass:1})
			car.shapes[0].collisionGroup=gameData.CAR;
			world.addBody(car)
			this._car = car;

			var beforewheel = new wheel({mass:1})
			beforewheel.x = 600;
			beforewheel.y = 720;
			this.addChild(beforewheel);
			this.beforewheel = beforewheel.body;

			var backwheel = new backwheels({mass:1})
			backwheel.x = 500;
			backwheel.y = 720;
			this.addChild(backwheel);
			this.backwheel = backwheel.body;

			car.shapes[0].collisionMask=gameData.GROUND
			var revoluteBack = new p2.PrismaticConstraint(car, this.backwheel, {
                localAnchorA: [-1, -0.5],//设置相对于A锚点
                localAnchorB: [0, 0],//设置相对于B锚点
                disableRotationalLock:true
            });
            var revoluteFront = new p2.PrismaticConstraint(car, this.beforewheel, {
                localAnchorA: [1.5,-0.5], // Where to hinge second wheel on the chassis
                localAnchorB: [0, 0],      // Where the hinge is in the wheel (center)
                disableRotationalLock:true
            });
			var wheelConstraint = new p2.DistanceConstraint(this.beforewheel,this.backwheel)
			revoluteBack.setLimits(0,0.5);//设置bodyB可以位移的最大值
            revoluteFront.setLimits(0,0.5);
			this._revoluteBack = revoluteBack;
            world.addConstraint(revoluteFront);
			world.addConstraint(revoluteBack);
			world.addConstraint(wheelConstraint);
			revoluteBack.setStiffness(90)
			revoluteFront.setStiffness(70)
		}
		private speed=50
		protected addEvent(){
			var _this1 = this;
			document.onkeydown=function(event){
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if(e && e.keyCode==37){ // 按 left 
					_this1.backwheel.damping=0.1
					_this1.backwheel.angularForce+=_this1.speed;
				}
				if(e && e.keyCode==38){ //按up
					//要做的事情
				}            
				if(e && e.keyCode==39){ // right
					_this1.backwheel.damping=0.1
					_this1.backwheel.angularForce-=_this1.speed;
				}
				if(e && e.keyCode==40){ // down
					_this1.backwheel.damping=0.999999
					_this1.backwheel.angularForce=0;
					_this1.backwheel.angularVelocity=0;
				}
			}; 
			EventManager.addTouchScaleListener(this.m_start,this,this.handleEvent)
			this.m_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_rule.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			let target = e.currentTarget;
			if(target == this.m_rule){
				EventManager.dispatchEventWith(EventNotify.SHOW_RULE,false,{dd:11});
			}else if(target == this.m_start){
				// EventManager.dispatchEventWith(EventNotify.SHOW_GAME,false,{dd:11});
			}else if(target == this.m_rank){
				EventManager.dispatchEventWith(EventNotify.SHOW_RANK,false,{dd:11});
			}
		}
	}
}