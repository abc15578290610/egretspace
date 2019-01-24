module game {
	/**主界面（开始界面）*/
	export class MainView extends ElementUI{
		private m_start:eui.Button;//开始挑战
		private m_rule:eui.Button;//游戏规则
		private m_rank:eui.Button;//排行榜
		private m_song:eui.Label;//诗词
		private _text:string="对酒忆贺监二首\n[唐] 李白\n四明有狂客，风流贺季真。\n长安一相见，呼我谪仙人。\n昔好杯中物，翻为松下尘。\n金龟换酒处，却忆泪沾巾。"
		private static _instance:MainView;
		public static getInstance():MainView  
		{  
			if(!this._instance)  
				this._instance = new MainView();  
			return this._instance;  
		}  
		public constructor() {
			super();
			this.skinName = "mainViewSkin";
		}
		protected init(){
			EffectUtils.typerEffect(this.m_song,this._text,300);
		}
		protected addEvent(){
			EventManager.addTouchScaleListener(this.m_start,this,this.handleEvent)
			// this.m_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_rule.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
			this.m_rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleEvent,this);
		}
		private handleEvent(e:egret.TouchEvent){
			let target = e.currentTarget;
			if(target == this.m_rule){
				EventManager.dispatchEventWith(EventNotify.SHOW_RULE,false,{dd:11});
			}else if(target == this.m_start){
				EventManager.dispatchEventWith(EventNotify.SHOW_GAME,false,{dd:11});
			}else if(target == this.m_rank){
				EventManager.dispatchEventWith(EventNotify.SHOW_RANK,false,{dd:11});
			}
		}
	}
}