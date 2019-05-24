module game {
	/**
	 * 场景组件基类
	 */
	export class BaseUI extends eui.Component{
		public constructor() {
			super();
		}
		protected createChildren(){
			super.createChildren();
			this.init();
			this.addEvent();
		}
		/**添加事件 */
		protected addEvent(){

		}
		/**移除事件 */
		protected removeEvent(){
			
		}
		/**所有子组件初始化完成 */
		protected init(){
			
		}
		/**销毁方法 */
		protected destroy(){
			this.removeEvent();
		}
	}
}