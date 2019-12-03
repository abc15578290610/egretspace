module game {
	export class ScrollerBase extends eui.Scroller{
		public constructor() {
			super();
			this.skinName = "ScrollerBaseSkin"
		}
	}
	export class ItemCell extends eui.ItemRenderer{
		public constructor() {
			super();
			this.skinName = "itemSkin"
		}
	}
}