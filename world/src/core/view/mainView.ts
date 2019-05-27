module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Button;//开始挑战
		private m_rule:eui.Button;//游戏规则
		private m_rank:eui.Button;//排行榜
		private m_song:eui.Label;//诗词
		private static _instance:MainView;
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

			//鼠标点击添加刚体
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, addOneBox, this);
			var self = this;
			function addOneBox(e: egret.TouchEvent): void {
				var positionX: number = Math.floor(e.stageX / factor);
				var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);
				var display: egret.DisplayObject;
				if (Math.random() > 0.8) {
					var button = new Mbutton()
					button.x = e.stageX;
					button.y = e.stageY;
					world.addBody(P2lib.createBoxBody(button,self,{ mass: 1,angularVelocity: 1}))
				}else{
					var Ball = GameLib.createBall(50)
					Ball.x = e.stageX;
					Ball.y = e.stageY;
					world.addBody(P2lib.createCircleBody(Ball,self,{ mass: 1,angularVelocity: 1}))
				}
			}
		}
		protected addEvent(){
			EventManager.addTouchScaleListener(this.m_start,this,this.handleEvent)
			// this.m_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_rule.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			let target = e.currentTarget;
			if(target == this.m_rule){
				EventManager.dispatchEventWith(EventNotify.SHOW_RULE,false,{dd:11});
			}else if(target == this.m_start){
				EventManager.dispatchEventWith(EventNotify.SHOW_GAME,false,{dd:11});
			}else if(target == this.m_rank){
				EventManager.dispatchEventWith(EventNotify.SHOW_RANK,false,{dd:11});
			}
		}
	}
}