module game {
	export class betList extends eui.Component implements eui.UIComponent{
		private m_list:eui.Group;
		public static selectNum:number=0;
		public constructor() {
			super();
			this.skinName="betListSkin";
		}
		protected createChildren(){
			super.createChildren()
			this.init()
			this.addEvent();
		}
		private init(){
			var data = [1,2,3,4,5]
			for(let i=0;i<data.length;i++){
				let item = new betNum();
				this.m_list.addChild(item);
				item.setType(data[i]);
			}
		}
		private addEvent(){
			this.m_list.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		public removeAllbet(){
			
		}
		public play(x,y){
			var num = betList.selectNum;
			console.log(num)
			var obj = new betNum();
			obj.setType(num)
			var itme = (this.m_list.getChildAt(num-1) as betNum).localToGlobal();
			obj.x = itme.x;
			obj.y = itme.y;
			obj.anchorOffsetX = obj.width/2
			obj.anchorOffsetY = obj.height/2
			obj.scaleX = obj.scaleY = 0.5; 
			this.parent['m_bets'].addChild(obj);
			var tw = egret.Tween.get(obj).to({x:x,y:y},300).wait(500).call(()=>{
				// this.parent['m_bets'].removeChild(obj)
			})
		}
		private handleEvent(e:egret.TouchEvent){
			let item = e.target as betNum;
			for(let i=0;i<=this.m_list.numChildren-1;i++){
				let _obj =(this.m_list.getChildAt(i) as betNum);
				if(item.type==_obj.type){
					(this.m_list.getChildAt(i) as betNum).select(true);
					betList.selectNum = item.type;
				}else{
					(this.m_list.getChildAt(i) as betNum).select(false);
				}
			}
		}
	}
}