class EventCenter extends egret.DisplayObject{
	private static _instance: EventCenter;
	public static getInstance() {
		if (!EventCenter._instance) {
			EventCenter._instance = new EventCenter();
		}
		return EventCenter._instance;
	}
	public constructor() {
		super();
	}
	public registEvent(type:string,callback:Function,obj:any){
		this.addEventListener(type,callback,obj)
	}
	public dispatchEventData(evt:egret.Event){
		this.dispatchEvent(evt)
	}
	public removeRegistEvent(type:string,callback:Function,obj:any){
		this.removeEventListener(type,callback,obj)
	}
}
module game {
	export class EventData extends egret.Event{
			/**  成功: 1;1;userId;ye;tokey;name;onLineNum;
			 *   失败: 1;2
			*/
			public _data={userId:0,ye:0,tokey:"",name:""};
			public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
			{
				super(type,bubbles,cancelable);
			}
	}
}