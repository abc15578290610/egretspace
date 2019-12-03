module game {
	export class headView extends eui.Component{
		private m_head:eui.Image;
		public constructor() {
			super();
			this.skinName="head";
		}
		public setHeadUrl(url:string){
			if(!url)return;
			this.m_head.source = RES.getRes(url);
		}
	}
}