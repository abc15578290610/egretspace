module game {
	export class lhludanCell extends eui.Component{
		private m_num:eui.Label;
		private m_type:eui.Image;
		private m_xdui:eui.Image;
		private m_zdui:eui.Image;
		public constructor(type) {
			super();
			this.skinName='bjlludanCellSkin';
		}
		public setType(type){
			if(type=='a'){
				this.m_type.source='lh_a_png';
			}
			if(type=='b'){
				this.m_type.source='lh_b_png';
			}
			if(type=='c'){
				this.m_type.source='lh_c_png';
			}
		}
	}
}