module game {
	export class ElementUI extends BaseUI{
		public constructor() {
			super();
		}
		/**所有子组件初始化完成 */
		protected init(){
			super.init();
			console.log("初始")
		}
		/**销毁方法 */
		protected destroy(){
			super.destroy();
		}
	}
}