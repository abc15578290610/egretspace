module game {
	export class nnCell extends eui.Component{
		private m_text:eui.Label;
		private m_bg:eui.Image;
		private m_win:eui.Image;
		public constructor() {
			super();
			this.skinName="nnCellSkin";
		}
		public setdata(txt:string,bool){
			var num = gameData.ludan[txt];

			this.m_win.visible=bool?true:false;
			if(num>0&&num<=9){
				this.m_bg.source = RES.getRes("n_png");
				this.m_text.text = num+"";
			}else{
				this.m_bg.source = RES.getRes("nn_"+num+"_png");
				this.m_text.text = "";
			}
		}
	}
}