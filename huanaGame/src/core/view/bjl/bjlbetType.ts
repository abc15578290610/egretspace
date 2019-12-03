module game {
	export class bjlbetType extends eui.Component{
		/**当前桌面分数*/
		public static score:number[]=[0,0,0,0,0];
		/**已提交分数 */
		public static onLine_score:number[]=[0,0,0,0,0];
		public constructor() {
			super();
			this.skinName='bjlbetTypeSkin';
		}
		public addScore(key:string,num:number){
			if(typeof(num)==='number'){
				bjlbetType.score[parseInt(key)-1] += num;
			}
		}

		public cancelScore(key:string,num:number){
			if(typeof(num)==='number'&&num<betType.score[parseInt(key)-1]){
				bjlbetType.score[parseInt(key)-1] -= num;
			};
		}
		public setBase(num){
			// this.b_0.text = "1:"+num+"";
			// this.b_1.text = "1:"+num+""
			// this.b_2.text = "1:"+num+""
			// this.b_3.text = "1:"+num+""
		}
		/**{ time: 1500,initNum:100,num: 88888, regulator: 50 } */
		public playEffect(obj:eui.Label,option){
			LabelEffect.instance.playEffect(obj,option)
		}
		public static reSetScore(){
			bjlbetType.score=[0,0,0,0,0]
		}
		public static reSetAllScore(){
			bjlbetType.score=[0,0,0,0,0];
			bjlbetType.onLine_score=[0,0,0,0,0];
		}
	}
}