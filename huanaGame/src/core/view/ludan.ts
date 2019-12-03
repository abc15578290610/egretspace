module game {
	export class ludan extends PanelUI{
		public state:boolean = false;
		private m_cells:eui.Group;
		private data=[];
		public constructor() {
			super();
			this.skinName="ludanSkin";
		}
		/**所有子组件初始化完成 */
		protected init(){
			console.log("初始化")
			super.init();
			this.x=-651;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.switch,this);
		}
		public initData(){
			this.data = GameConfig.strJson(gameData.roomData[5],"^");
			if(this.data[0]=='')return;
			if(this.data.length>=10){this.data = this.data.slice(0,10);}
			for(let k=0;k<this.data.length;k++){
				let item = new gameItemCell();
				item.initData(this.data[k])
				this.m_cells.addChild(item);
			}
		}
		/**
		 * switch
		 */
		public switch() {
			if(!this.state){
				this.m_cells.removeChildren();
				this.initData();
				this.effect();
				this.state=true;
			}else{
				this.effect()
				this.state=false;
			}
		}
		private effect(){
			if(!this.state){
				this.x=-651
				egret.Tween.get(this).to({x:0},600,egret.Ease.cubicIn); 
			}else{
				this.x=0
				egret.Tween.get(this).to({x:-651},600,egret.Ease.cubicIn);
			}
		}
	}
}