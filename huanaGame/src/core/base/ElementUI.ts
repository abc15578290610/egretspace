module game {
	/**UI界面元素 */
	export class ElementUI extends BaseUI{
		public constructor() {
			super();
		}
		/**所有子组件初始化完成 */
		protected init(){
			super.init();
		}
		/**销毁方法 */
		protected destroy(){
			super.destroy();
		}
	}
	/**全屏界面元素 */
	export class ViewElementUI extends BaseUI{
		public constructor() {
			super();
		}
		/**所有子组件初始化完成 */
		protected init(){
			super.init();
			this.onResize();
		}
		protected onResize(){
			this.width = GameConfig.curWidth();
        	this.height = GameConfig.curHeight();
		}
		/**销毁方法 */
		protected destroy(){
			super.destroy();
		}
	}
}