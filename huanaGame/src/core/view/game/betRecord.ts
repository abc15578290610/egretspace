module game {
	export class betRecord extends PanelUI{
		private m_list:eui.List;
		private m_tracklist:eui.List;
		private m_btn1:eui.Button;
		private m_btn2:eui.Button;
		private m_track:eui.Group;
		private m_dobet:eui.Group;
		private s_dobet:eui.Scroller;
		private s_track:eui.Scroller;
		public constructor() {
			super();
			this.skinName="betRecordSkin"
		}
		public addEvent(){
			this.m_btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectTap,this)
			this.m_btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectTap,this)
		}
		private selectTap(){
			if(this.m_btn1.currentState=='up'){
				this.m_btn1.currentState='down';
				this.setDobetView();
				this.m_btn2.currentState='up';
				return;
			}
			if(this.m_btn2.currentState=='up'){
				this.setTrackView();
				this.m_btn2.currentState='down';
				this.m_btn1.currentState='up';
			}
		}
		public show(){
			this.selectTap()
		}
		public setDobetView(){
			this.m_list.itemRendererSkinName = "dobetListItem";
			this.getRecordBet();
			this.m_track.visible = false;
			this.s_track.visible = false;
			this.m_dobet.visible=true;
			this.s_dobet.visible=true;
		}
		public setTrackView(){
			// this.m_list.removeChildren();
			this.getRecordTrack();
			this.m_tracklist.itemRendererSkinName = "doTrackListItem";
			this.m_dobet.visible=false;
			this.m_track.visible = true;
			this.s_dobet.visible=false;
			this.s_track.visible = true;
		}
		public setData(data:any){
			this.m_list.dataProvider = new eui.ArrayCollection(data)
		}
		public setTrackData(data:any){
			this.m_tracklist.dataProvider = new eui.ArrayCollection(data)
		}
		public getRecordBet(){
			console.log(gameData.userInfo.rType,"房间类型")
			let data = {rType:"bjl",date:1,currentPage:1,pageSize:20}//date:1/2/3
			rPomelo.request(gameData.bjlroutes.getRecord,data,this.doRecordBetSuccess,this)
		}
		private doRecordBetSuccess(res){
			console.log("下注记录回调",res)
			let arraydata = [];
			let list = GameConfig.strJson(res.data.jsonData,"#");
			// let list = ['userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime','userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime','userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime','userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime','userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime','userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime','userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime','userId~rType~roomId~cc~kj~xz~yl~ye~xzmx~stime'];
			list.filter((val)=>{
				let item = GameConfig.strJson(val,"~");
				console.log(item,"-----------")
				let obj = {userId:"",rType:"",roomId:"",cc:"",kj:"",xz:"",ye:"",yl:"",xzmx:"",stime:""}
				obj.userId = item[0];
				obj.rType = item[1];
				obj.roomId = item[2];
				obj.cc = item[3];
				obj.kj = item[4];
				obj.xz = item[5];
				obj.yl = item[6];
				obj.ye = item[7];
				obj.xzmx = item[8];
				obj.stime = item[9];
				arraydata.push(obj);
			})
			this.setData(arraydata)
		}

		////////////////////////

		public getRecordTrack(){
			console.log("获取交易记录")
			let data = {date:1,currentPage:1,pageSize:20}//date:1/2/3
			rPomelo.request(gameData.baseRoutes.getTradeRecord,data,this.doRecordTrackSuccess,this)
		}
		private doRecordTrackSuccess(res){
			console.log("交易记录回调",res)
			let arraydata = [];
			let list = GameConfig.strJson(res.data.jsonData,"#");
			// "name~type~tradeMoney~totalMoney~stime
			list.filter((val)=>{
				let item = GameConfig.strJson(val,"~");
				console.log(item,"-----------")
				let obj = {name:"",type:"",tradeMoney:"",totalMoney:"",stime:""}
				obj.name = item[0];
				obj.type = item[1];
				obj.tradeMoney = item[2];
				obj.totalMoney = item[3];
				obj.stime = item[4];
				arraydata.push(obj);
			})
			this.setTrackData(arraydata)
		}
	}
}