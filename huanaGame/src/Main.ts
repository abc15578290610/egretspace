declare function flv_pause();
class Main extends eui.UILayer {
    static _instance:Main;
    protected createChildren(): void {
        super.createChildren();
        Main._instance = this;
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            //egret publish Game --version v3.8 --runtime html5
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.resume();
            //  egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        this.addEventListener(egret.Event.RESIZE,this.onGameResize,this);
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        EventCenter.getInstance().registEvent(EventNotify.LOGIN_OUT,this.loginOut,this);
        this.runGame().catch(e => {
            console.log(e);
        })
    }
    private onGameResize(){
    }
    private async runGame() {
        await this.loadResource()
        await platform.login();
        const userInfo = await platform.getUserInfo();
    }
    public loadingView:LoadingUI
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("loading",1);
            document.getElementById("preloading").style.display = 'none'
            this.loadingView = new LoadingUI();
            this.addChild(this.loadingView);
            this.initLayer();
            let layer =  game.GameLayerManager.gameLayer();
            layer.loadLayer.addChild(game.netView.getInstance())
            this.initNet();
            await RES.loadGroup("preload", 0, this.loadingView);
            this.loadingView.g_loading.visible=false;
            this.loadingView.g_login.visible=true;
        }
        catch (e) {
            console.error(e);
        }
    }
    private initNet(){
        window.addEventListener('online', function(){
            game.TipsBase.getInstance().setContent("网络连接恢复!!!")
        })
        window.addEventListener('offline', function(){
            game.TipsBase.getInstance().setContent("网络连接中断!!!")
        })
    }
    private initLayer(){
        let layer =  game.GameLayerManager.gameLayer();
        this.addChild(layer)
        layer.init();
    }
    private loadTheme() {
        return new Promise((resolve, reject) => {
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    public createGameScene(): void {
        game.TipsBase.getInstance().setContent("进入大厅",1)
        game.MainView.getInstance().visible = false;
        this.stage.dispatchEventWith(EventNotify.SHOW_MAIN);
    }
    private loginOut(){
        flv_pause()
        this.loadingView.visible=true;
        game.GameLayerManager.gameLayer().panelLayer.removeChildren();
        game.GameLayerManager.gameLayer().mainLayer.removeChildren();
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
