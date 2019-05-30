module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Button;//开始挑战
		private m_rule:eui.Button;//游戏规则
		private m_rank:eui.Button;//排行榜
		private static _instance:MainView;
		/**前轮 */
		private _ball1:p2.Body= null;

		/**后轮 */
		private _ball2:p2.Body= null;
		private _car:p2.Body=null;
		private _revoluteBack:p2.RevoluteConstraint;
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
			console.log("初始化")

			//创建world
			var world: p2.World = P2lib.initWorld();
			world.sleepMode = p2.World.ISLAND_SLEEPING;

			//创建plane平面
			var planeBody =  P2lib.createPlaneBody()
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
			var car = P2lib.createBoxBody(button,self,{ mass: 0.1,angularVelocity: 1})
			world.addBody(car)
			this._car = car;

			var Ball1 = new wheel()
			Ball1.x = 600;
			Ball1.y = 720;
			this._ball1 = P2lib.createCircleBody(Ball1,self,{mass: 0.1})
			world.addBody(this._ball1)

			var Ball = new backwheels()
			Ball.x = 500;
			Ball.y = 720;

			this._ball2 = P2lib.createCircleBody(Ball,self,{mass: 0.1})
			this._ball2.damping=0.5
			world.addBody(this._ball2)

			var revoluteBack = new p2.RevoluteConstraint(car, this._ball2, {
                localPivotA: [-0.5, -0.5],//设置相对于A锚点
                localPivotB: [0, 0],//设置相对于B锚点
                collideConnected: false
            });
            var revoluteFront = new p2.RevoluteConstraint(car, this._ball1, {
                localPivotA: [1.5, -0.5], // Where to hinge second wheel on the chassis
                localPivotB: [0, 0],      // Where the hinge is in the wheel (center)
                collideConnected: false
            });
			var revolutewell = new p2.DistanceConstraint(this._ball1, this._ball2);
			revoluteBack.enableMotor();//开启马达
			this._revoluteBack = revoluteBack;
            world.addConstraint(revoluteFront);
			world.addConstraint(revoluteBack);
			world.addConstraint(revolutewell);
			revoluteBack.setStiffness(90)
			revoluteFront.setStiffness(70)
		}
		private speed=50
		protected addEvent(){
			var _this1 = this;
			document.onkeydown=function(event){
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if(e && e.keyCode==37){ // 按 left 
					_this1._revoluteBack.setMotorSpeed(-10);
					_this1._ball2.damping=0.1
					_this1._ball2.applyForce([-10,0],[0,0])
				}
				if(e && e.keyCode==38){ //按up
					//要做的事情
				}            
				if(e && e.keyCode==39){ // right
					_this1._ball2.damping=0.1
					_this1._ball2.applyForce([10,0],[0,0])
					_this1._revoluteBack.setMotorSpeed(10);
				}
				if(e && e.keyCode==40){ // down
					_this1._revoluteBack.setMotorSpeed(0);
					_this1._ball2.damping=0.999999
					// _this1.revoluteFront.setMotorSpeed(0)
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