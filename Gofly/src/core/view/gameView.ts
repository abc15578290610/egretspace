module game {
	export class gameView extends ElementUI{
		private m_back:eui.Label;//返回
		private m_resume:eui.Label;//继续
		private m_bg:eui.Image;//背景
		private m_group:eui.Group;
		private currArry:any[]=[];
		private RamdonArry:any[]=[];
		private m_roll:egret.tween.TweenGroup;
		private m_mask:eui.Rect;
		private m_rollBg:eui.Group;
		private static _instance:gameView;
		public static getInstance():gameView  
		{  
			if(!this._instance)  
				this._instance = new gameView();  
			return this._instance;  
		}  
		public constructor() {
			super();
			this.skinName = "gameViewSkin";
		}
		protected init(){
			this.m_rollBg.mask = this.m_mask;
		}
		public initGame(){
			this.m_roll.play(1);
			this.currArry=[];
			this.RamdonArry=[];
			this._target1=null;
			this._target2=null;
			for(var i=0;i<=8;i++){
				let img = (this["m_"+i] as eui.Image);
				let targetXY = {x:0,y:0}
				targetXY.x = img.x;
				targetXY.y = img.y;
				this.currArry.push(targetXY);
				this.drawImage(this.m_bg,img);
			}
			this.RamdonArry = this.currArry.concat();
			this.RamdonArry = this.shuffle(this.RamdonArry);

			for(var j=0;j<=8;j++){
				let img = (this["m_"+j] as eui.Image);
				img.x = this.RamdonArry[j].x
				img.y = this.RamdonArry[j].y
			}
			this.m_bg.visible = false;
			this.m_group.scaleX = this.m_group.scaleY=0.6;
		}
		
		private shuffle(arr) {
			var length = arr.length,
				randomIndex,
				temp;
			while (length) {
				randomIndex = Math.floor(Math.random() * (length--));
				temp = arr[randomIndex];
				arr[randomIndex] = arr[length];
				arr[length] = temp
			}
			return arr;
		}

		/**交换位置*/
		private async switchPos(a:egret.DisplayObject,b:egret.DisplayObject){
			let x1,y1,x2,y2=0;
			x1=a.x;y1=a.y;
			x2=b.x;y2=b.y;
			a.alpha=b.alpha=1;
			return new Promise((resolve, reject) => {
				egret.Tween.get(a).to({x:x2,y:y2},200).call(()=>{
				});
				egret.Tween.get(b).to({x:x1,y:y1},200).call(()=>{
					resolve()
				});
			})
		}
		/**截的是原始图，不经过拉伸
		 * @param target 目标图
		 * @param selectRect 选取复制区域
		 */
		private drawImage(target: egret.DisplayObject,selectRect:egret.Bitmap){
			var rect = new egret.Rectangle(selectRect.x,selectRect.y,selectRect.width,selectRect.height)
			var rt:egret.RenderTexture = new egret.RenderTexture();
            rt.drawToTexture(target,rect,target.scaleX);
			rt.toDataURL("image / png",rect);
			selectRect.texture = rt;
		}
		protected addEvent(){
			this.m_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_group.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectCell,this);
		}
		private _target1:eui.Image;
		private _target2:eui.Image;
		private async selectCell(e:egret.TouchEvent){
			let target:eui.Image = e.target
			if(target){
				if(this._target1){
					if(!this.checkMove(this._target1,target))return;
					this._target2 = target;
					this._target2.alpha=0.5;
				}else{
					this._target1 = target;
					this._target1.alpha=0.5;
				}
				if(this._target1&&this._target2){await this.switchPos(this._target1,this._target2);this._target1=null;this._target2=null;this.checkResult()};
			}
		}
		private checkResult(){
			this.RamdonArry=[];
			for(var i=0;i<=8;i++){
				let img = (this["m_"+i] as eui.Image);
				let targetXY = {x:0,y:0}
				targetXY.x = img.x;
				targetXY.y = img.y;
				this.RamdonArry.push(targetXY);
			}
			for(let j=0;j<=8;j++){
				let value1 = this.RamdonArry[j];
				let value2 = this.currArry[j];
				if(value1.x!=value2.x||value1.y!=value2.y){
					return false;
				}
			}
			EventManager.dispatchEventWith(EventNotify.GAME_RESULT,false,{dd:11});
		}
		private handleEvent(e:egret.TouchEvent){
			EventManager.dispatchEventWith(EventNotify.CLOSE_GAME,false,{dd:11});
		}
		/**检测是否可以移动 */
		private checkMove(obj1:egret.DisplayObject,obj2:egret.DisplayObject){
			if(Math.abs(obj2.x-obj1.x)>=400){//禁止水平方向跨格移动
				return false;
			}
			if(Math.abs(obj2.y-obj1.y)>=400){//禁止竖直方向跨格移动
				return false;
			}
			if((obj2.x!=obj1.x)&&(obj2.y!=obj1.y))return false;//禁止对角移动
			return true;
		}
	}
}