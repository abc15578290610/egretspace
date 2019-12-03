module game {
	export class betType extends eui.Component{
		/**当前桌面分数*/
		public static score:number[]=[0,0,0,0,0,0,0,0,0,0,0,0];
		/**已提交分数 */
		public static onLine_score:number[]=[0,0,0,0,0,0,0,0,0,0,0,0];
		protected m_1:eui.Image;
		protected m_2:eui.Image;
		protected m_3:eui.Image;
		protected m_4:eui.Image;
		private b_0:eui.Label;
		private b_1:eui.Label;
		private b_2:eui.Label;
		private b_3:eui.Label;
		public all_0:eui.Label;
		public all_1:eui.Label;
		public all_2:eui.Label;
		public all_3:eui.Label;
		public constructor() {
			super();
			this.skinName="betTypeSkin"
		}
		public addScore(key:string,num:number){
			if(typeof(num)==='number'){
				betType.score[parseInt(key)-1] += num;
			}
		}

		public cancelScore(key:string,num:number){
			if(typeof(num)==='number'&&num<betType.score[parseInt(key)-1]){
				betType.score[parseInt(key)-1] -= num;
			};
		}
		public setBase(num){
			this.b_0.text = "1:"+num+"";
			this.b_1.text = "1:"+num+""
			this.b_2.text = "1:"+num+""
			this.b_3.text = "1:"+num+""
		}
		/**{ time: 1500,initNum:100,num: 88888, regulator: 50 } */
		public playEffect(obj:eui.Label,option){
			LabelEffect.instance.playEffect(obj,option)
		}
		public static reSetScore(){
			betType.score=[0,0,0,0,0,0,0,0,0,0,0,0]
		}
		public static reSetAllScore(){
			betType.score=[0,0,0,0,0,0,0,0,0,0,0,0];
			betType.onLine_score=[0,0,0,0,0,0,0,0,0,0,0,0];
		}
	}
	export class betType1 extends betType{
		public constructor() {
			super();
			this.m_1.name = 1+"";
			this.m_2.name = 2+"";
			this.m_3.name = 3+"";
			this.m_4.name = 4+"";
			this.m_2.source=RES.getRes("f_x1_png");
			this.m_4.source=RES.getRes("p_x1_png")
		}
	}
	export class betType2 extends betType{
		public constructor() {
			super();
			this.m_1.name = 5+"";
			this.m_2.name = 6+"";
			this.m_3.name = 7+"";
			this.m_4.name = 8+"";
			this.m_2.source=RES.getRes("f_x2_png");
			this.m_4.source=RES.getRes("p_x2_png")
		}
	}
	export class betType3 extends betType{
		public constructor() {
			super();
			this.m_1.name = 9+"";
			this.m_2.name = 10+"";
			this.m_3.name = 11+"";
			this.m_4.name = 12+"";
			this.m_2.source=RES.getRes("f_x3_png");
			this.m_4.source=RES.getRes("p_x3_png")
		}
	}
}