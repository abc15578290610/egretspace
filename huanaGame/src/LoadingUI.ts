class LoadingUI extends eui.Component implements RES.PromiseTaskReporter {

    public g_loading:eui.Group;
    public g_login:eui.Group;
    private m_loading:eui.Image;
    private m_fast:eui.Image;
    private m_acount:eui.Image;
    public constructor() {
        super();
        this.skinName="loading";
        this.m_acount.addEventListener(egret.TouchEvent.TOUCH_TAP,this.login,this);
        this.m_fast.addEventListener(egret.TouchEvent.TOUCH_TAP,this.fastlogin,this);
        this.width = GameConfig.curWidth();
        this.height = GameConfig.curHeight();
        this.g_login.y = GameConfig.curHeight()-350;
        game.gameData.nn_rooms=[];
        game.gameData.roomData=[];
    }
    private login(e:egret.TouchEvent){
        this.stage.dispatchEventWith(EventNotify.SHOW_LOGIN);
        EffectUtils.playEffect(e.currentTarget,4);
    }
    private connetToServer(evt:game.EventData){
        console.log(evt._data)
        rPomelo.doQueryEntry(evt._data.userId,evt._data.tokey);
    }
    private loginSuccess(evt:egret.Event){
        console.log("登录成功",evt.data);
        this.visible = false;
        game.gameData.login = evt.data;
        game.gameData.userInfo.rType = evt.data.rType;
        game.gameData.userInfo.roomId = evt.data.roomId;
        (this.parent as Main).createGameScene();
    }
    private fastlogin(e:egret.TouchEvent){
        EffectUtils.playEffect(e.currentTarget,4);
        var pInfo="&data=03;";
        game.doOpt(pInfo);
        EventCenter.getInstance().registEvent(EventNotify.LOGIN_RESP,this.connetToServer,this);
        EventCenter.getInstance().registEvent(EventNotify.LOGIN_SUCCESS,this.loginSuccess,this);
    }
    public onProgress(current: number, total: number): void {
        this.m_loading.width = current / total*860;
    }
}
