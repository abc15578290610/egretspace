module game {
	export class bjlchangListItemView extends eui.ItemRenderer{
		public flag=true;
		private m_g:eui.Group;
		public constructor() {
			super();
			this.skinName = "bjlchangListItem"
		}
		public dataChanged(){
			// if(this.flag){
				this.m_g.removeChildren();
				console.log(this.data,"输出")
				let data:any[]=this.data;
				for(let i=0;i<data.length;i++){
					let item = this.getCell(i,data[i].value,data[i].ping);
					if(item){
						this.m_g.addChild(item);
					}
				}
				this.flag=false;
			// }
		}
		private getCell(top,val='',num):egret.DisplayObject{
			if(!val)return null;
			var ele = new roadbaseCell(val);
			ele.scaleX=ele.scaleY=0.72;
			ele.setType(val);
			ele.setNum(num);
			ele.y=top*18.5;
			return ele;
		}
	}
}