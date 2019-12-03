module game {
	export class bjlludan extends PanelUI{
		public state:boolean = false;
		private m_box1_bg:eui.Image;
		private m_box2_bg:eui.Image;
		private m_box3_bg:eui.Image;
		private m_box4_bg:eui.Image;
		private m_box:eui.Group;
		private m_box1:eui.Group;
		private m_box2:eui.Group;
		private m_box3:eui.Group;
		private m_box4:eui.Group;//珠盘路
		private data=[];
		private bjlstr:string;
		private m_xwl:eui.Image;
		private m_zwl:eui.Image;
		private m_box_bg:eui.Image;
		public constructor() {
			super();
			this.skinName="bjlludanSkin";
		}
		/**所有子组件初始化完成 */
		protected init(){
			super.init();
			this.m_zwl.addEventListener(egret.TouchEvent.TOUCH_TAP,this.preIsZWin,this);
			this.m_xwl.addEventListener(egret.TouchEvent.TOUCH_TAP,this.preIsXWin,this);
		}
		//生成珠盘路
		private initZhuPan(str=''){
			let data = GameConfig.strJson(str,'');
			data.map((val,index)=>{
				let item = new bjlludanCell(val);
				item.setType(val);
				this.m_box4.addChild(item)
			});
		}
		public initData(str:any){
			this.cleanBox();
			this.data = GameConfig.strJson(str,"^");
			if(this.data[0]=='')return;
			var bjlstr='';
			let infoScore={z:0,x:0,h:0,zd:0,xd:0,all:0}
			for(let k=0;k<this.data.length;k++){
				let obj = GameConfig.strJson(this.data[k],'_');
				if(obj[0]=='a'||obj[0]=='b'||obj[0]=='c'||obj[0]=='d'){
					infoScore.z+=parseInt(obj[1]);
				}
				if(obj[0]=='e'||obj[0]=='f'||obj[0]=='g'||obj[0]=='h'){
					infoScore.x+=parseInt(obj[1]);
				}
				if(obj[0]=='i'||obj[0]=='j'||obj[0]=='k'||obj[0]=='l'){
					infoScore.h+=parseInt(obj[1]);
				}
				if(obj[0]=='c'||obj[0]=='d'||obj[0]=='g'||obj[0]=='h'||obj[0]=='k'||obj[0]=='l'){
					infoScore.zd+=parseInt(obj[1]);
				}
				if(obj[0]=='b'||obj[0]=='d'||obj[0]=='f'||obj[0]=='h'||obj[0]=='j'||obj[0]=='l'){
					infoScore.xd+=parseInt(obj[1]);
				}
				infoScore.all+=parseInt(obj[1]);
				bjlstr +=this.data[k].slice(0,1);
			}
			this.bjlstr = bjlstr;
			let info = bjlstr.split('').reduce((p, k) => (p[k]++ || (p[k] = 1), p), {})
			this['r_1'].text = info['a']||0+info['b']||0+info['c']||0+info['d']||0+'';//庄
			this['r_2'].text = info['e']||0+info['f']||0+info['g']||0+info['h']||0+'';//闲
			this['r_3'].text = info['i']||0+info['j']||0+info['k']||0+info['l']||0+'';//和
			this['r_4'].text = info['c']||0+info['d']||0+info['g']||0+info['h']||0+info['k']||0+info['l']||0+'';//庄对
			this['r_5'].text = info['b']||0+info['d']||0+info['f']||0+info['h']||0+info['j']||0+info['l']||0+'';//闲对
			this['r_6'].text = parseInt(this['r_1'].text)+parseInt(this['r_2'].text)+parseInt(this['r_3'].text)+parseInt(this['r_4'].text)+parseInt(this['r_5'].text)+"";
			this.setAllMap(bjlstr)

			this['k_1'].text = infoScore.z+'';
			this['k_2'].text = infoScore.x+'';
			this['k_3'].text = infoScore.h+'';
			this['k_4'].text = infoScore.zd+'';
			this['k_5'].text = infoScore.xd+'';
			this['k_6'].text = infoScore.all+'';
		}
		//生成所有路图
		private setAllMap(bjlstr){
			this.initZhuPan(bjlstr)
			if(this.data[5]){
				var bjl = bjlLib.getInstance();
				bjl.initNode(this.m_box,24,4);//大路
				bjl.init(bjlstr)

				var bjl1 = bjlLib.getInstance();
				bjl1.initNode(this.m_box1,12,5);//大眼路
				bjl1.init(bjl.getLuTu(1,bjl))

				var bjl2 = bjlLib.getInstance();
				bjl2.initNode(this.m_box2,12,6);
				bjl2.init(bjlLib.getInstance().getLuTu(2,bjl));

				var bjl3 = bjlLib.getInstance();
				bjl3.initNode(this.m_box3,12,7);
				bjl3.init(bjlLib.getInstance().getLuTu(3,bjl));
			}
			this.refectInfo();
		}
		private refectInfo(){
			setTimeout(()=>{
				this.m_box_bg.width = this.m_box.contentWidth>573?this.m_box.contentWidth:573;
				this.m_box1_bg.width = this.m_box1.contentWidth>191?this.m_box1.contentWidth:191
				this.m_box2_bg.width = this.m_box2.contentWidth>191?this.m_box2.contentWidth:191
				this.m_box3_bg.width = this.m_box3.contentWidth>191?this.m_box3.contentWidth:191
				this.m_box.scrollH=this.m_box.contentWidth>573?this.m_box.contentWidth-573:0;
				this.m_box1.scrollH=this.m_box1.contentWidth-191;
				this.m_box2.scrollH=this.m_box2.contentWidth-191;
				this.m_box3.scrollH=this.m_box3.contentWidth-191;
			},200)
		}
		/**假设下个是庄赢 */
		private preIsZWin(e:egret.Event){
				e.stopPropagation()
				this.cleanBox()
				this.setAllMap(this.bjlstr+"a");
				if(this.m_box1.numChildren>=1)EffectUtils.blinEffect(this.m_box1.getChildAt(this.m_box1.numChildren-1));
				if(this.m_box2.numChildren>=1)EffectUtils.blinEffect(this.m_box2.getChildAt(this.m_box2.numChildren-1));
				if(this.m_box3.numChildren>=1)EffectUtils.blinEffect(this.m_box3.getChildAt(this.m_box3.numChildren-1));
		}
		public cleanBox(){
			this.m_box4.removeChildren();
			GameConfig.removeChildren(this.m_box1)
			GameConfig.removeChildren(this.m_box2)
			GameConfig.removeChildren(this.m_box3)
			GameConfig.removeChildren(this.m_box)
		}
		/**假设下个是闲赢 */
		private preIsXWin(e:egret.Event){
				e.stopPropagation();
				this.cleanBox()
				this.setAllMap(this.bjlstr+"e");
				EffectUtils.blinEffect(this.m_box1.getChildAt(this.m_box1.numChildren-1));
				EffectUtils.blinEffect(this.m_box2.getChildAt(this.m_box2.numChildren-1));
				EffectUtils.blinEffect(this.m_box3.getChildAt(this.m_box3.numChildren-1));
		}
	}
}