module game {
	export class gameItem extends eui.Component{
		public roomId:number =0;
		public constructor() {
			super();
			console.log(GameConfig.curWidth(),"----------",document.body.clientWidth)
			// this.scaleX = this.scaleY = (GameConfig.curWidth()-400)/document.body.clientWidth;
			this.scaleX = this.scaleY = 700/650;
		}
		public initData(data:any){

		}
		public setState(num){

		}
		public updateItem(time:number,state:number){

		}
		public stop(){
			
		}
	}
}