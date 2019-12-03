module game {
	export class msgCell extends eui.Component{
		private m_msg:eui.Group;
		private m_msgTxt:eui.Label;
		private msgArr:string[];
		public constructor() {
			super()
			this.skinName='msgCellSkin'
		}
		public setData(arr:string[]){
			this.msgArr = arr;
		}
		public play(){
			this.stop();
			this.AniEffect(egret.Tween.get(this.m_msg))
		}
		private index = 0;
		private AniEffect(obj:egret.Tween){
			let text = this.msgArr[this.index];
			if(!text)return
			this.m_msgTxt.text = text;
			this.m_msg.x=this.width;
			obj.to({x:0-40-this.getTextWidth(text)},this.getTextTime(text)).call(()=>{
				this.index++;
				if(this.index==this.msgArr.length){
					this.index=0;
				}
				this.AniEffect(egret.Tween.get(this.m_msg))
			});
		}
		private getTextWidth(str:string,fontSize:number=18){
			return str.length*fontSize;
		}
		private getTextTime(str:string,fontTime:number=400){
			return str.length*fontTime;
		}
		public stop(){
			egret.Tween.removeTweens(this.m_msg);
		}
	}
}