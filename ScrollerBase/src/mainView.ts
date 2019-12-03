module game {
	export class mainView extends eui.Component{
		private m_list:eui.List;
		private m_bg:eui.Image;
		public constructor() {
			super();
			this.skinName = "mainViewSkin";
			this.m_list.itemRenderer=ItemCell;
			let data = []
			for(let i=0;i<=30;i++){
				let obj={name:'11111'}
				data.push(obj);
			}
			
			console.log(this.m_list.contentWidth,"-----------",this.m_list.measuredWidth,"--------",this.m_list.width)
			this.m_list.dataProvider=new eui.ArrayCollection(data);
			// (this.m_list.parent as eui.Group).validateNow();
			// this.validateSize();
			this.m_list.validateSize()
			this.m_bg.width = this.m_list.width;
			console.log(this.m_list.contentWidth,"-----------",this.m_list.measuredWidth,"--------",this.m_list.width)
			setTimeout(()=>{
				console.log(this.m_list.contentWidth,"-----------",this.m_list.measuredWidth,"--------",this.m_list.width)
				if(this.m_list.contentWidth>=469){
						this.m_bg.width = this.m_list.contentWidth;
				}else{
					this.m_bg.width = 469;
				}
			},200)
		}
	}
}