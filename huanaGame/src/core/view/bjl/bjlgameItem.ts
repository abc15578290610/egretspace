module game {
	export class bjlgameItem extends gameItem{
		public data:any[];
		private m_roomId:eui.Label;
		private m_xh:eui.Label;
		private m_time:eui.BitmapLabel;
		private ludan:any[];
		private m_cells:eui.Group;
		private m_name:eui.Label;
		private m_state:eui.Label;
		private dateTimer:DateTimer;
		private m_box:eui.Group;
		private m_box1:eui.Group;
		private m_box2:eui.Group;
		private m_box3:eui.Group;
		private m_box_bg:eui.Image;
		private m_box1_bg:eui.Image;
		private m_box2_bg:eui.Image;
		private m_box3_bg:eui.Image;
		private m_betNum:eui.Label;
		private resultArr=[0,0,0];
		//边框颜色 #8f8260 线条颜色 #a59a7d
		public constructor() {
			super();
			this.skinName="bjlgameItemSkin";
		}
		public createChildren(){
			super.createChildren();
		}
		public initData(data:any){
			console.log("----",data)
			this.data = GameConfig.strJson(data,",");
			this.roomId = this.data[0];
			this.name = this.data[0];
			this.m_roomId.text = "百乐-"+this.data[11];
			this.m_xh.text = "限红"+this.data[1];
			this.m_betNum.text="筹码 "+this.data[2]+"   局数 "+this.data[7];
			this.setState(this.data[3])
			this.m_time.text = this.data[4];
			this.play(parseInt(this.data[4]));
			this.m_name.text = this.data.slice(-4)[0];
			gameData.videoData = this.data[13];
			this.ludan = GameConfig.strJson(this.data[5],"^");
			if(this.ludan[0]=='')return;
			var bjlstr = ''
			for(let k=0;k<this.ludan.length;k++){
				bjlstr +=this.ludan[k].slice(0,1);
			}
			let info = bjlstr.split('').reduce((p, k) => (p[k]++ || (p[k] = 1), p), {})
			this['r_1'].text = info['a']||0+info['b']||0+info['c']||0+info['d']||0+'';
			this['r_2'].text = info['e']||0+info['f']||0+info['g']||0+info['h']||0+'';
			this['r_3'].text = info['i']||0+info['j']||0+info['k']||0+info['l']||0+'';
			if(this.data[5]){
				var bjl = bjlLib.getInstance();
				bjl.initNode(this.m_box,25,0);
				bjl.init(bjlstr)

				var bjl1 = bjlLib.getInstance();
				bjl1.initNode(this.m_box1,13,1);
				bjl1.init(bjl.getLuTu(1,bjl))

				var bjl2 = bjlLib.getInstance();
				bjl2.initNode(this.m_box2,13,2);
				bjl2.init(bjlLib.getInstance().getLuTu(2,bjl))

				var bjl3 = bjlLib.getInstance();
				bjl3.initNode(this.m_box3,13,3);
				bjl3.init(bjlLib.getInstance().getLuTu(3,bjl))
			}
			setTimeout(()=>{
				this.m_box_bg.width = this.m_box.contentWidth>224?this.m_box.contentWidth:224;
				this.m_box1_bg.width = this.m_box1.contentWidth>294.5?this.m_box1.contentWidth:294.5
				this.m_box2_bg.width = this.m_box2.contentWidth>151?this.m_box2.contentWidth:151
				this.m_box3_bg.width = this.m_box3.contentWidth>144?this.m_box3.contentWidth:144
			},200)
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
                this.dateTimer.repeatCount = num;
            }else{
				this.dateTimer = new DateTimer(1000,num);
				this.dateTimer.addEventListener(egret.TimerEvent.TIMER, this.onDateTimerHandler,this);
				this.dateTimer.addEventListener(egret.TimerEvent.COMPLETE,this.stop,this)
			}
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
			this.dateTimer.reset();
			this.m_time.text=0+"";
		}
		private onDateTimerHandler(){
			var num = this.dateTimer.repeatCount-this.dateTimer.currentCount;
			if(num<0){this.stop();return;}
			this.m_time.text = num+"";
		}
	}
}