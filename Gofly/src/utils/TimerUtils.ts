class TimerUtils {
    private static _mServerTime = 0;       //通过服务器协议返回的时间
    private static ServerTimeStamp = 0;  //时间标尺

    /**记录网络延迟,读取请用 TimerUtils.getNetDelay()*/
    private static _mNetDelay:number = 10;// 网络延迟
    public static calcuNetDelayEnd():void{//结束计算
        TimerUtils._mNetDelay = egret.getTimer() - TimerUtils._mSendTime;
    }
    private static _mSendTime:number = 0;
    public static calcuNetDelayStart(){//开始计算
        TimerUtils._mSendTime = egret.getTimer();
    }
    /**
     * 获取服务器时间
     */
    public static getServerTime(): number {
        return Math.floor(TimerUtils.getServerTimeMill() / 1000);
    }
    public static setServerTime(time:number){
        this._mServerTime = time;
        this.ServerTimeStamp = egret.getTimer();
    }
    /**毫秒*/
    public static getServerTimeMill(): number {
        return this._mServerTime + (egret.getTimer() - this.ServerTimeStamp);
    }
    /**当前网络延迟*/
    public static getNetDelay(){
        return TimerUtils._mNetDelay;
    }

    /**
     * 获取服务器时间的Ymd格式
     */
    public static getServerTimeYmd(): number {
        return Number(TimerUtils.dateFormat("yyyyMMdd", TimerUtils.getServerTime()));
    }

    /**
     * 获取服务器时间的Ymd格式
     */
    public static getServerTimeYmd2() {
        return TimerUtils.dateFormat("yyyyMMdd-hh:mm:ss", TimerUtils.getServerTime());
    }

    //格式化日期
    public static dateFormat(fmt: string, time: number) {
        var date = new Date(time);
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    /**
     * 时分(本地时间)
     * @param time 秒
     * @returns {string}
     */
    public static getCurrTimeStr():string{
        let date:Date = new Date();
        var hour:string = "" + date.getHours();
        var minutent:string = "" + date.getMinutes();
        if(hour.length < 2) hour = "0" + hour;
        if(minutent.length < 2) minutent = "0" + minutent;
        date = null;
        return hour + ":" + minutent;
    }
    /**
     * 时分秒_毫秒(本地时间)
     * @param time 秒
     * @returns {string}
     */
    public static getTimeSecStr():string{
        let date:Date = new Date();
        var hour:string = "" + date.getHours();
        var minutent:string = "" + date.getMinutes();
        var seconds:string = "" + date.getSeconds();
        var mSeconds:string = "" + date.getMilliseconds();
        
        if(hour.length < 2) hour = "0" + hour;
        if(minutent.length < 2) minutent = "0" + minutent;
        if(seconds.length < 2) seconds = "0" + seconds;
        if(mSeconds.length < 2) mSeconds = "0" + mSeconds;
        date = null;
        return hour + ":" + minutent + ":" +seconds + ":" +mSeconds;
    }

    /**计算当天剩余多少秒 */
    public static getCurrentDaysRestTime():number{
        let date:Date = new Date(this.getServerTimeMill());
        let hour:number = date.getHours();
        let minutent:number = date.getMinutes();
        let seconds:number = date.getSeconds();
        let during:number = hour*60*60+minutent*60+seconds;
        let restTime = 86400-during;
        return restTime;
    }
    /**计算两个时间戳经过天数 */
    public static getDaysOf2Timestamps(regeditTime:number):number{
        let date:Date = new Date(regeditTime*1000);
        let hour:number = date.getHours();
        let minutent:number = date.getMinutes();
        let seconds:number = date.getSeconds();
        let serverTime = this.getServerTime();
        let during:number = hour*60*60+minutent*60+seconds;
        let zeroT = regeditTime-during;
        // let delta = serverTime-zeroT;
        // let day = delta/86400;
        return Math.ceil((serverTime-zeroT)/86400);
    }
    /**根据某个时间戳  和间隔天数 返回日期段 2017.7.6--2017.7.13 */
    public static getDaysStrStartByTimestamps(regeditTime:number,duringday:number):string{
        // let date:Date = new Date(regeditTime*1000);
        // let hour:number = date.getHours();
        // let minutent:number = date.getMinutes();
        // let seconds:number = date.getSeconds();
        // let serverTime = this.getServerTime();
        // let during:number = hour*60*60+minutent*60+seconds;
        // let zeroT = regeditTime-during;
        // let delta = serverTime-zeroT;
        // let day = delta/86400;

        return ""+TimerUtils.dateFormat("yyyy-MM-dd",regeditTime*1000)+"至"+TimerUtils.dateFormat("yyyy-MM-dd",(regeditTime+7*86400)*1000);
    }

    /////------------------------  临时计时  --------------------------
    private static _mCurrTempTime:number = 0;
    public static tempTimeStart():void{
        TimerUtils._mCurrTempTime = egret.getTimer();
    }
    public static tempTimeEnd(){
        let t = egret.getTimer() - TimerUtils._mCurrTempTime
        return t;
    }
    /////------------------------  临时计时  --------------------------
}