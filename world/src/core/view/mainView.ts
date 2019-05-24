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
			//egret.Profiler.getInstance().run();
			var factor: number = 50;

			//创建world
			var world: p2.World = new p2.World();
			world.sleepMode = p2.World.ISLAND_SLEEPING;

			//创建plane
			var planeShape: p2.Plane = new p2.Plane();
			var planeBody: p2.Body = new p2.Body();
			// planeBody.position[1]=0.4;//设置y
			console.log(planeBody.position)
			planeBody.angle=0.4;//0.4*50=20度
			planeBody.addShape(planeShape);
			planeBody.displays = [];
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
						if (boxBody.sleepState == p2.Body.SLEEPING) {
							box.alpha = 0.5;
						}
						else {
							box.alpha = 1;
						}
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
				if (Math.random() > 0.5) {
					//添加方形刚体
					//var boxShape: p2.Shape = new p2.Rectangle(2, 1);
					var boxShape: p2.Shape = new p2.Box({width: 2, height: 1});
					var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
					boxBody.addShape(boxShape);
					world.addBody(boxBody);
					display = self.createBox((<p2.Box>boxShape).width * factor,(<p2.Box>boxShape).height * factor);

					// display.width = (<p2.Box>boxShape).width * factor;
					// display.height = (<p2.Box>boxShape).height * factor;
				}
				else {
					//添加圆形刚体
					//var boxShape: p2.Shape = new p2.Circle(1);
					var boxShape: p2.Shape = new p2.Circle({ radius: 1 });
					var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
					boxBody.addShape(boxShape);
					world.addBody(boxBody);
					display = self.createBall((<p2.Circle>boxShape).radius*factor);

					// display.width = (<p2.Circle>boxShape).radius * 2 * factor;
					// display.height = (<p2.Circle>boxShape).radius * 2 * factor;
				}

				display.anchorOffsetX = display.width / 2;
				display.anchorOffsetY = display.height / 2;

				boxBody.displays = [display];
				self.addChild(display);
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
		/**
     * 创建一个圆形
     */
    private createBall(r: number): egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.endFill();
        return shape;
    }
    /**
     * 创建一个方形
     */
    private createBox(width:number,height:number): egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawRect(0,0,width,height);
        shape.graphics.endFill();
        return shape;
    }
	}
}