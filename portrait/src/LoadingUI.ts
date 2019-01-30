class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
    private m_load:egret.Sprite;
    private m_bg:eui.Rect;
    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;

    private createView(): void {
        let _width = egret.MainContext.instance.stage.width;
        let _height = egret.MainContext.instance.stage.height;
        this.m_load = new egret.Sprite();
        this.m_load.graphics.clear();
        this.m_load.graphics.beginFill(0x595959,1);
        this.m_load.graphics.drawRect(0, 0,_width/2,40);
        this.m_load.graphics.endFill();
        this.m_load.x =(_width-this.m_load.width)/2;
        this.m_load.y =(_height-this.m_load.height)/2;

        this.m_bg = new eui.Rect(0,30,0x95de64);
        this.m_bg.x=5;
        this.m_bg.y = (this.m_load.height-this.m_bg.height)/2;

        this.textField = new egret.TextField();
        this.textField.width = this.m_load.width;
        this.textField.textAlign = "center";
        this.textField.height = 30;
        this.textField.y = (this.m_load.height-this.textField.height)/2;
        this.m_load.addChild(this.m_bg)
        this.m_load.addChild(this.textField)
        this.addChild(this.m_load)
    }

    public onProgress(current: number, total: number): void {
        this.textField.text = Math.ceil(100* current / total )+ "%";
        this.m_bg.width=(current / total)*(this.m_load.width-10);
    }
}
