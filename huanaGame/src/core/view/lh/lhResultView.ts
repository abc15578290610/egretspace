module game {
	export class lhResultView extends PanelUI{
		private k_0:eui.Image;
		private k_1:eui.Image;
		private k_2:eui.Image;
		private k_3:eui.Image;
		private k_4:eui.Image;
		private k_5:eui.Image;
		private l_0:eui.Label;
		private l_1:eui.Label;
		public constructor() {
			super();
			this.skinName="lhResultViewSkin";
			this.touchEnabled = false;
		}
		private static _instance: lhResultView;
		public static getInstance(): lhResultView {
			if (!this._instance)
				this._instance = new lhResultView();
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
			for(let i=0;i<2;i++){
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
			PopUpManager.removePopUp(this);
		}
	}
}