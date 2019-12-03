window["game"] = game;
module game {
	/**
	* 结算界面
	* by zhongqing
	* (c) copyright 2018 - 2019
	* All Rights Reserved.
	* todo
	*/
	export class bjlResultView extends PanelUI{
		private k_0:eui.Image;
		private k_1:eui.Image;
		private k_2:eui.Image;
		private k_3:eui.Image;
		private k_4:eui.Image;
		private k_5:eui.Image;
		private l_0:eui.Label;
		private l_1:eui.Label;
		private m_win:eui.Image;
		public constructor() {
			super();
			this.skinName="bjlresultViewSkin";
			this.touchEnabled = false;
		}
		private static _instance: bjlResultView;
		public static getInstance(): bjlResultView {
			if (!this._instance)
				this._instance = new bjlResultView();
			return this._instance;
		}
		protected addEvent(){
			EventCenter.getInstance().registEvent(EventNotify.SEND_CARD,this.doSendCard,this)
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
			for(let i=0;i<6;i++){
				let img = (this["k_"+i] as eui.Image);
				img.source = "poke_bg_png";
				img.visible=false;
			}
			this.l_0.text="";
			this.l_1.text="";
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
			var point = GameConfig.strJson(data.point,',');
			this.l_0.text=point[0];
			this.l_1.text=point[1];
			if(GameConfig.checkType(result)=='a'){
				this.m_win.visible=true;
				this.m_win.x=0;
			}else if(GameConfig.checkType(result)=='e'){
				this.m_win.visible=true;
				this.m_win.x = this["m_box"].width/2;
			}else{
				this.m_win.visible=false;
			}
			let str = data.pk.toLowerCase();
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
			if(!obj||obj.source!="poke_bg_png"){
				return;
			}
			if(!src&&obj)obj.visible=false;
			obj.visible=true;
			let _src = src+"_png";
			var tw = egret.Tween.get(obj);
			let _w = obj.width;

			tw.to({width:0},time).call(()=>{
					obj.source = RES.getRes(_src)
			}).to({width:_w},time);
		}		
		protected close(){
			PopUpManager.removePopUp(this,1,GameLayerManager.gameLayer().mainLayer);
		}
	}
}