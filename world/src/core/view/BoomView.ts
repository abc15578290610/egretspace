module game {
	export class BoomView extends ElementUI{
		private m_pao:eui.Group;
		private m_wheel:eui.Rect;
		public m_start:eui.Rect;
		public constructor() {
			super();
			this.skinName = "boomSkin"
		}
		protected init(){
			super.init();
		}
		public play(angle:number){
			this.m_pao.rotation=angle;
			var tw = egret.Tween.get(this.m_pao)
			var _x = this.m_pao.x;
			var _y = this.m_pao.y;
			var _x1 = this.m_wheel.x;
			tw.to({x:_x-5,y:_y+3},200).to({x:_x,y:_y},100)
			egret.Tween.get(this.m_wheel).to({x:_x1-5},200).to({x:_x1})
		}
		set angle(angle){
			this.m_pao.rotation=angle;
		}
	}
}