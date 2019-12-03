module game {
	export class DateTimer extends egret.EventDispatcher{
    /**以前时间 */
    private previous: number;
    /**当前时间 */
    private curTime: number;
    /**已过去时间 */
    private passTime: number;
    /**累计时间 */
    private accTime: number;
    /**每帧耗时 */
    public delay: number;
    /**当前计数 */
    public currentCount:number;
    /**设置的计时器运行总次数 */
    public repeatCount:number;
     
        public constructor(delay:number,repeatCount:number = 0) {
            super();
            this.delay = delay;
            this.repeatCount = repeatCount;
        }
         
    /**开始计时 */
    public start(){
        this.reset();
        egret.startTick(this.update, this);
        }
         
    /**重置计时并停止 */
        public reset(){
			this.previous = egret.getTimer();
			this.accTime = 0;
			this.currentCount = 0;
			this.stop();
        }
         
    /**停止计时 */
    public stop(){
       egret.stopTick(this.update, this);
    }
         
    /**更新时间 */
    private update():boolean{
        this.curTime = egret.getTimer();
        this.passTime = this.curTime - this.previous;
        this.previous = this.curTime;
        this.accTime += this.passTime;
        if(this.accTime >= this.delay) {
            this.accTime -= this.delay;
            this.currentCount++;
            if(this.repeatCount > 0 && (this.currentCount == this.repeatCount)){
                this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER_COMPLETE));
                this.stop();
            }
			this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER));
        }
        return false;
        }
}
}