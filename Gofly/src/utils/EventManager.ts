module game {
	export class EventManager {
		public static dispatchEventWith(str:string,bool:boolean,data:any){
			egret.MainContext.instance.stage.dispatchEventWith(str,bool,data);
		}
	}
}