module game {
	export class nngameItem extends gameItem{
		public data:any[];
		private m_roomId:eui.Label;
		private m_xh:eui.Label;
		private m_time:eui.BitmapLabel;
		private ludan:any[];
		private m_cells:eui.Group;
		private m_name:eui.Label;
		private m_state:eui.Label;
		private dateTimer:DateTimer;
		private resultArr=[0,0,0];
		public constructor() {
			super();
			this.skinName="gameItemSkin";
		}
		public initData(data:any){
			this.data = GameConfig.strJson(data,",");
			this.roomId = this.data[0];
			this.name = this.data[0];
			this.m_roomId.text = "牛牛NO"+this.data[11];
			this.m_xh.text = "限红"+this.data[1];
			this.setState(this.data[3])
			this.m_time.text = this.data[4];
			this.play(parseInt(this.data[4]));
			this.m_name.text = this.data.slice(-3)[0];
			this.ludan = GameConfig.strJson(this.data[5],"^");
			if(this.ludan[0]=='')return;
			if(this.ludan.length>=10){this.ludan = this.ludan.slice(0,10);}
			for(let k=0;k<this.ludan.length;k++){
				let item = new gameItemCell();
				this.setResult(this.ludan[k]);
				item.initData(this.ludan[k])
				this.m_cells.addChild(item);
			}
			this['r_1'].text = "闲1:"+this.resultArr[0];
			this['r_2'].text = "闲2:"+this.resultArr[1];
			this['r_3'].text = "闲3:"+this.resultArr[2];
		}
		private setResult(data:any){
			if(!data)return;
			let item = GameConfig.strJson(data,"");
			if(parseInt(item[5])){this.resultArr[0]++};
			if(parseInt(item[6])){this.resultArr[1]++};
			if(parseInt(item[7])){this.resultArr[2]++};
		}
		private play(num:number){
            if(this.dateTimer){
                this.dateTimer.stop();
                this.dateTimer.removeEventListener(egret.TimerEvent.TIMER, this.onDateTimerHandler,this)
            }
			this.dateTimer = new DateTimer(1000,num);
			this.dateTimer.addEventListener(egret.TimerEvent.TIMER, this.onDateTimerHandler,this);
            this.dateTimer.addEventListener(egret.TimerEvent.COMPLETE,this.stop,this)
			this.dateTimer.start();
		}
		public setState(num){
			if(num==1){
				this.m_state.text = "下注中";
			}else if(num==3){
				this.m_state.text = "结算中";
			}else if(num==2){
				this.m_state.text = "停止下注";
			}else{
				this.m_state.text = "-----";
			}
		}
		public updateItem(time:number,state:number){
			this.play(time);
			this.setState(state);
		}
		public stop(){
			this.dateTimer.stop();
			this.dateTimer.reset();
			this.m_time.text=0+"";
		}
		private onDateTimerHandler(){
			var num = this.dateTimer.repeatCount-this.dateTimer.currentCount;
			if(num<0){this.stop();return;}
			this.m_time.text = num+"";
		}
	}
	export class gameItemCell extends eui.Component{
		public data:any[];
		private m_0:nnCell;
		private m_1:nnCell;
		private m_2:nnCell;
		private m_3:nnCell;
		public constructor() {
			super();
			this.skinName="gameItemCellSkin";
		}
		public initData(data:any){
			if(!data)return;
			let item = GameConfig.strJson(data,"")
			this.m_0.setdata(item[0],0);
			this.m_1.setdata(item[1],parseInt(item[5]));
			this.m_2.setdata(item[2],parseInt(item[6]));
			this.m_3.setdata(item[3],parseInt(item[7]));
		}
	}
}