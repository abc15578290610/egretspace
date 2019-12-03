module game {
	export class smallCell extends eui.Component{
		private m_num:eui.Label;
		private m_type:eui.Image;
		public constructor() {
			super();
			this.skinName='smallCellSkin';
		}
		public setNum(num){
			if(num){
				this.m_num.text = num;
			}
		}
		public setType(type){
			this.m_type.source=type;
		}
	}
}