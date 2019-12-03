window["game"] = game;
module game {
	/**
	* 结算界面
	* by zhongqing
	* (c) copyright 2018 - 2019
	* All Rights Reserved.
	* todo
	*/
	export class resultView extends PanelUI{
		private k_0:eui.Image;
		private k_1:eui.Image;
		private k_2:eui.Image;
		private k_3:eui.Image;
		private k_4:eui.Image;
		private k_5:eui.Image;
		private k_6:eui.Image;
		private k_7:eui.Image;
		private k_8:eui.Image;
		private k_9:eui.Image;
		private k_10:eui.Image;
		private k_11:eui.Image;
		private k_12:eui.Image;
		private k_13:eui.Image;
		private k_14:eui.Image;
		private k_15:eui.Image;
		private k_16:eui.Image;
		private k_17:eui.Image;
		private k_18:eui.Image;
		private k_19:eui.Image;
		private l_0:eui.Label;
		private l_1:eui.Label;
		private l_2:eui.Label;
		private l_3:eui.Label;
		public constructor() {
			super();
			this.skinName="resultViewSkin";
			this.touchEnabled = false;
		}
		private static _instance: resultView;
		public static getInstance(): resultView {
			if (!this._instance)
				this._instance = new resultView();
			return this._instance;
		}
		protected addEvent(){
			EventCenter.getInstance().registEvent(EventNotify.SEND_CARD,this.doSendCard,this)
			// this.m_restart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startHandle,this);
		}
		protected init(){
			super.init();
			this.width = GameConfig.curWidth();
        	this.height = GameConfig.curHeight();
			this.touchChildren = false;
			this.touchEnabled = false;
		}
		public initData(){
			egret.Tween.removeTweens(this)
			for(let i=0;i<20;i++){
				(this["k_"+i] as eui.Image).source = "poke_bg_png";
			}
			this.l_0.text="";
			this.l_1.text="";
			this.l_2.text="";
			this.l_3.text="";
		}
		//pk:1^2^a3 
		public doSendCard(data){
			let _arr = GameConfig.strJson(data,"^");
			let seat = parseInt(_arr[0])-1;
			let num = parseInt(_arr[1])-1;
			let index = (seat*4)+num;
			this.openCard(this["k_"+index],_arr[2],200)
		}
		private winEffect(data:any[]){
			let bool = false;
			data.filter((val,index)=>{
				let obj = this["w_"+index] as eui.Image;
				if(val=='1'){
					bool = true;
					// obj.source = RES.getRes("xy_"+index+"_png");
					obj.visible = true;
				}else{
					obj.visible = false;
				}
			})
			if(!bool){
				(this["w_3"] as eui.Image).visible=true;
			}else{
				(this["w_3"] as eui.Image).visible=false;
			}
		}
		public setdata(data:any){
			if(data.win){
				this.winEffect(GameConfig.strJson(data.win,''));
			}
			var result = GameConfig.strJson(data.result,'');
			this.l_0.text=gameData.nnResult[result[0]];
			this.l_1.text=gameData.nnResult[result[1]];
			this.l_2.text=gameData.nnResult[result[2]];
			this.l_3.text=gameData.nnResult[result[3]];

			let str = data.poker.toLowerCase();
			var arr = GameConfig.strJson(str,'$');
			var newarr = []
			let item=[];
			arr.filter((val)=>{
				item = item.concat(GameConfig.strJson(val,','));
			})
			item.filter((val,index)=>{
				setTimeout(()=>{
					this.openCard(this["k_"+index],val,200)
				},(index+1)*400)
			})
			setTimeout(()=>{
				this.close();
			},15000)
		}
		public openCard(obj:eui.Image,src:string,time:number){
			let _src = src+"_png";
			if(obj.source!="poke_bg_png"){
				return;
			}
			var tw = egret.Tween.get(obj);
			let _w = obj.width;

			tw.to({width:0},time).call(()=>{
					obj.source = RES.getRes(_src)
			}).to({width:_w},time);
		}		
		protected close(){
			PopUpManager.removePopUp(this);
		}
	}
}