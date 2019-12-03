/**
* 游戏配置文件
* by zhongqing
* (c) copyright 2018 - 2019
* All Rights Reserved.
* ToDo:
*/
module game {

    //从下到上弹出
   export class TipsBase extends PanelUI{
        private m_text:eui.Label;
        private static _instance: TipsBase;
		public static getInstance(): TipsBase {
			if (!this._instance)
				this._instance = new TipsBase();
			return this._instance;
		}
        public constructor() {
			super();
			this.skinName="TipsBaseSkin";
		}
        protected init(){
            super.init();
            this.x = (this.parent.width-this.width)/2
            this.show();
        }
        /**设置内容 */
        public setContent(str:string,effecType:number=1){
            this.m_text.text = str;
            let layer =  game.GameLayerManager.gameLayer();
            if(!layer.effectLayer.contains(game.TipsBase.getInstance()))layer.effectLayer.addChild(game.TipsBase.getInstance());
            EffectUtils.tipEffect(this,1);
        }
    }
}