module game {
	export class bjlchangeList extends eui.Component{
		public data:any[];
		private ludan:any[];
		private m_list:eui.List;
		public roomId:number =0;
		public constructor() {
			super();
			this.skinName = "bjlchangListsSkin";
			this.m_list.itemRenderer = bjlchangListItemView;
			this.touchChildren = false;
		}
		public setData(data:string){
			this.data = GameConfig.strJson(data,",");
			this.roomId = this.data[0];
			this.ludan = GameConfig.strJson(this.data[5],"^");
			if(this.ludan[0]=='')return;
			var bjlstr = ''
			for(let k=0;k<this.ludan.length;k++){
				bjlstr +=this.ludan[k].slice(0,1);
			}
			// console.log(bjlstr,"路图资源");
			// bjlstr = 'iiiaaaaeeeeeeeeeiiieeajjjaabbbeeeaaeaeaeeaeae'
			if(this.data[5]){
				var bjl = bjlLibTool.getInstance();
				bjl.initNode(25,0);
				bjl.init(bjlstr)
				let obj = {value:"",ping:null,index:null}
				let layout = bjl.getlayOut();
				let all = layout.filter((val,index)=>{
					if(val.length){
						for(let t=0;t<val.length;t++){
							if(!val[t]){
								val[t]=obj;
							}
						}
						return true;
					}
				})

				console.log(layout)
				console.log(all,"------")
				this.m_list.dataProvider = new eui.ArrayCollection(all)
				// for(let j=0;j<layout.length;j++){
				// 	layout[j]
				// }
			}
		}
	}
}