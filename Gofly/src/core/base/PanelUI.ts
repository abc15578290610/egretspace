module game {
	/**弹出框组件基类 */
	export class PanelUI extends ElementUI{
		public constructor() {
			super();
		}
		/**所有子组件初始化完成*/
		protected init(){
			super.init();
			this.show();
		}
		/**销毁方法 */
		protected destroy(){
			super.destroy();
		}
		public show(){

		}
		protected close(){
			this.removeChildren();
		}
	}
}