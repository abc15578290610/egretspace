module game {
	/**
	 * 路单基本单元
	 * s1:闲赢
	 * s2:庄赢
	 * s3:
	 * s4:
	 * s5:
	 * s6:
	 */
	export class roadCell extends eui.Component{
		private m_num:eui.Label;
		private m_type:eui.Image;
		private m_xdui:eui.Image;
		private m_zdui:eui.Image;
		public constructor(type) {
			super();
			this.skinName='roadCellSkin';
			// this.cacheAsBitmap = true;
			if(type=='b'||type=='d'||type=='f'||type=='h'){
				this.m_xdui.visible=true;
			}
			if(type=='c'||type=='d'||type=='g'||type=='h'){
				this.m_zdui.visible=true;
			}
		}
		public setNum(num){
			if(num){
				this.m_num.text = num;
			}
		}
		public setType(type){
			this.m_type.source=type;
		}
		public setDui(bool:boolean){
			if(bool){
				this.m_xdui.visible=true;
			}else{
				this.m_zdui.visible=true;
			}
		}
	}

	export class roadbaseCell extends eui.Component{
		private m_num:eui.Label;
		private m_type:eui.Image;
		private m_xdui:eui.Image;
		private m_zdui:eui.Image;
		public constructor(type) {
			super();
			this.skinName='roadCellSkin';
			// this.cacheAsBitmap = true;
			if(type=='b'||type=='d'||type=='f'||type=='h'){
				this.m_xdui.visible=true;
			}
			if(type=='c'||type=='d'||type=='g'||type=='h'){
				this.m_zdui.visible=true;
			}
		}
		public setNum(num){
			if(num){
				this.m_num.text = num;
			}
		}
		public setType(type){
			if(type=='a'||type=='b'||type=='c'||type=='d'){
				this.m_type.source = "r_b2_png"
			}
			if(type=='e'||type=='f'||type=='g'||type=='h'){
				this.m_type.source="r_b1_png";
			}
		}
		public setDui(bool:boolean){
			if(bool){
				this.m_xdui.visible=true;
			}else{
				this.m_zdui.visible=true;
			}
		}
	}
}