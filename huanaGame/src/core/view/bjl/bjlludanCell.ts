module game {
	export class bjlludanCell extends eui.Component{
		private m_num:eui.Label;
		private m_type:eui.Image;
		private m_xdui:eui.Image;
		private m_zdui:eui.Image;
		public constructor(type) {
			super();
			this.skinName='bjlludanCellSkin';
			if(type=='b'||type=='d'||type=='f'||type=='h'){
				this.m_xdui.visible=true;
			}
			if(type=='c'||type=='d'||type=='g'||type=='h'){
				this.m_zdui.visible=true;
			}
		}
		public setType(type){
			if(type=='a'||type=='b'||type=='c'||type=='d'){
				this.m_type.source='ludan_z_png';
			}
			if(type=='e'||type=='f'||type=='g'||type=='h'){
				this.m_type.source='ludan_x_png';
			}
			if(type=='i'||type=='j'||type=='k'||type=='l'){
				this.m_type.source='ludan_h_png';
			}
		}
	}
}