module game {
	export class Mbutton extends eui.Button{
		public labelDisplay:eui.Label;
		public constructor() {
			super();
			this.skinName="MButton"
		}
		set label(text:string){
			this.labelDisplay.text = text;
		}
		/**设置字号大小，默认26 */
		set size(num:number){
			if(!num)num=26;
			console.log(num)
			this.labelDisplay.size = num;
		}
	}
}