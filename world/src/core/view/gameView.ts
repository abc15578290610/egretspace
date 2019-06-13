module game {
	export class gameView extends ElementUI{
		private static _instance: gameView;
		public static getInstance(): gameView {
			if (!this._instance)
				this._instance = new gameView();
			return this._instance;
		}
		private m_boom:BoomView
		public constructor() {
			super();
			this.skinName="gameSkin"
		}
		public initGame() {
			this.m_boom = new BoomView();
			this.m_boom.x=100;
			this.m_boom.y=egret.MainContext.instance.stage.stageHeight-this.m_boom.height;
			this.addChild(this.m_boom);
			this.setChildIndex(this.m_boom,0)
			this.beginPos[0]=this.m_boom.m_start.localToGlobal().x;
			this.beginPos[1]=egret.MainContext.instance.stage.stageHeight-this.m_boom.m_start.localToGlobal().y;

			var world = P2lib.gameWorld().initWorld();
			//创建plane平面
			var planeBody = P2lib.gameWorld().createPlaneBody()
			planeBody.shapes[0].collisionGroup=gameData.GROUND;
			planeBody.shapes[0].collisionMask=gameData.CAR|gameData.WHEEL|gameData.BRICK
			world.addBody(planeBody);
		}
		private beginPos=[0,0]
		private endPos=[0,0]

		public addEvent() {
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandle,this)
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.touchHandle,this)
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandle,this)
		}
		private moveSence(bool=true){
			if(bool){
				egret.Tween.get(this).to({x:-1334},5000)
			}else{
				egret.Tween.get(this).to({x:0},5000)
			}
		}
		private m_stone:stone;
		private _shape:egret.Shape;
		private touchHandle(e:egret.TouchEvent){
			if(e.type==egret.TouchEvent.TOUCH_BEGIN){
				this._shape = new egret.Shape();
				if(!this.contains(this._shape))this.addChild(this._shape);
				this._shape.graphics.beginFill(0xfffff);
				this._shape.graphics.moveTo(this.beginPos[0],egret.MainContext.instance.stage.stageHeight-this.beginPos[1]);
				this.m_stone = new stone();
			}else if(e.type==egret.TouchEvent.TOUCH_END){
				
				this.m_stone.x=this.m_boom.m_start.localToGlobal().x;
				this.m_stone.y=this.m_boom.m_start.localToGlobal().y+20;
				this.endPos[0]=e.stageX;
				this.endPos[1]=egret.MainContext.instance.stage.stageHeight-e.stageY;
				var pos = P2lib.gameWorld().Point(this.endPos,this.beginPos)
				this.m_boom.play(-GameLib.angle(pos[0],pos[1]))
				this.addChild(this.m_stone);
				var k = GameLib.distance(this.beginPos[0],this.beginPos[1],this.endPos[0],this.endPos[1])/300
				if(k<1.8)k=1.8;
				pos[0]=pos[0]*k;
				pos[1]=pos[1]*k;
				this.m_stone.body.applyForce(pos,[0,0])
				this._shape.graphics.lineStyle(2,0xfffff,1);
				this._shape.graphics.lineTo(e.stageX,e.stageY);
				this._shape.graphics.endFill();
				this.moveSence();
				setTimeout(()=>{
					this.moveSence(false)
				},10000)
				var tw = egret.Tween.get(this._shape);
				tw.to({alpha:0},1000).call(()=>{
					this._shape.graphics.clear();
				})
			}else if(e.type==egret.TouchEvent.TOUCH_MOVE){
				var endPos=[];
				endPos[0]=e.stageX;
				endPos[1]=egret.MainContext.instance.stage.stageHeight-e.stageY;
				var pos = P2lib.gameWorld().Point(endPos,[0,0]);
				this.m_boom.angle = -GameLib.angle(pos[0],pos[1])
			}
		}
	}
}