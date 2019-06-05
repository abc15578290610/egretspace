module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Button;//开始挑战
		private m_rule:eui.Button;//游戏规则
		private m_rank:eui.Button;//排行榜
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
			//创建world
			var world: p2.World = P2lib.gameWorld().initWorld();
			world.sleepMode = p2.World.ISLAND_SLEEPING;
			world.defaultContactMaterial.friction = 100;


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
		}
		protected addEvent(){
			var _this1 = this;
			document.onkeydown=function(event){
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if(e && e.keyCode==37){ // 按 left 

				}
				if(e && e.keyCode==38){ //按up
					//要做的事情
				}            
				if(e && e.keyCode==39){ // right

				}
				if(e && e.keyCode==40){ // down

				}
			}; 
			this.m_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
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