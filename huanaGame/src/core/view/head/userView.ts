module game {
	export class userView extends eui.Component{
		private m_head:headView;
		public m_type:number=0;
		private m_name:eui.Label;
		private m_id:eui.Label;
		private m_gold:goldCell;

		public constructor() {
			super();
			this.skinName="userSkin";
		}
		public childrenCreated(){
			super.childrenCreated()
			this.height = GameConfig.curHeight();
		}
		/**玩家身份 */
		public setUserTpye(_type:number){
			this.m_type = _type;
			gameData.userInfo.userType = _type;
		}
		/**玩家初始数据 */
		public setData(name:string,id:number,url=""){
			this.m_name.text = name;
			this.m_id.text =""+id;
			this.m_head.setHeadUrl(url);
		}
		public setGold(num=0){
			this.m_gold.setText(num);
		}
	}
}