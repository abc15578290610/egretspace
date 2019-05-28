module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Button;//开始挑战
		private m_rule:eui.Button;//游戏规则
		private m_rank:eui.Button;//排行榜
		private m_song:eui.Label;//诗词
		private static _instance:MainView;
		private _ball1= null;
		private _ball2= null;
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
			var factor: number = 50;

			//创建world
			var world: p2.World = P2lib.initWorld();
			world.sleepMode = p2.World.ISLAND_SLEEPING;

			//创建plane
			var planeBody =  P2lib.createPlaneBody()
			// planeBody.angle=0.2
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
						box.x = boxBody.position[0] * factor;
						box.y = stageHeight - boxBody.position[1] * factor;
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

			//鼠标点击添加刚体
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, addOneBox, this);
			// function addOneBox(e: egret.TouchEvent): void {
			// 	var positionX: number = Math.floor(e.stageX / factor);
			// 	var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);
			// 	if (Math.random() > 0.8) {
			// 		var button = new Mbutton()
			// 		button.x = e.stageX;
			// 		button.y = e.stageY;
			// 		world.addBody(P2lib.createBoxBody(button,self,{ mass: 1,angularVelocity: 1}))
			// 	}else{
			// 		var Ball = GameLib.createBall(50)
			// 		Ball.x = e.stageX;
			// 		Ball.y = e.stageY;
			// 		world.addBody(P2lib.createCircleBody(Ball,self,{ mass: 1,angularVelocity: 1}))
			// 	}
			// }


			var button = new Mbutton()
			button.x = 550;
			button.y = 720-(button.height/2);
			var car = P2lib.createBoxBody(button,self,{ mass: 1,angularVelocity: 1})
			world.addBody(car)

			var Ball1 = new wheel()
			Ball1.x = 600;
			Ball1.y = 720;
			this._ball1 = P2lib.createCircleBody(Ball1,self,{mass: 1})
			world.addBody(this._ball1)

			var Ball = new wheel()
			Ball.x = 500;
			Ball.y = 720;

			this._ball2 = P2lib.createCircleBody(Ball,self,{mass: 1})
			world.addBody(this._ball2)

			// var spring1 = new p2.DistanceConstraint(car,this._ball1,{
			// 	distance:1.5,
			// 	maxForce:200
			// })
			// var spring2 = new p2.DistanceConstraint(car,this._ball2,{
			// 	distance:1.5,
			// 	maxForce:200
			// })
			// world.addConstraint(spring1);
            // world.addConstraint(spring2);
			var revoluteBack = new p2.RevoluteConstraint(car, this._ball1, {
                localPivotA: [1.5, -0.9],//设置相对于A锚点
                localPivotB: [0, 0],//设置相对于B锚点
                collideConnected: true
            });
            var revoluteFront = new p2.RevoluteConstraint(car, this._ball2, {
                localPivotA: [-0.5, -0.9], // Where to hinge second wheel on the chassis
                localPivotB: [0, 0],      // Where the hinge is in the wheel (center)
                collideConnected: true
            });
			revoluteFront.enableMotor();//开启马达
			revoluteFront.setMotorSpeed( 5);//设置马达转速为5
			world.addConstraint(revoluteBack);
            world.addConstraint(revoluteFront);

		}
		protected addEvent(){
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
				// this._ball1.applyForce([30,0],[0,0])
				this._ball2.applyForce([30,0],[0,0])
				// obj.getBodyByID(99).applyForce([1,0],[0,0])
				// var spring = new p2.DistanceConstraint()
				// var spring = new p2.Spring()
				// EventManager.dispatchEventWith(EventNotify.SHOW_GAME,false,{dd:11});
			}else if(target == this.m_rank){
				EventManager.dispatchEventWith(EventNotify.SHOW_RANK,false,{dd:11});
			}
		}
	}
}