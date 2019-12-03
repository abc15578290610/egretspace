module game {
	export class login extends PanelUI{
		private txtId:eui.EditableText;
		private txtPw:eui.EditableText;
		private m_login:eui.Image;
		public constructor() {
			super();
			this.skinName = "loginView"
		}
		protected addEvent(){
			this.m_login.addEventListener(egret.TouchEvent.TOUCH_TAP,this.login,this)
		}
		protected init(){
			super.init();
			
		}
		private connetToServer(evt:game.EventData){
			console.log(evt._data)
			rPomelo.doQueryEntry(evt._data.userId,evt._data.tokey);
		}
		private loginSuccess(evt:egret.Event){
			console.log("登录成功",evt.data);
			game.gameData.login = evt.data;
			game.gameData.userInfo.rType = evt.data.rType;
			game.gameData.userInfo.roomId = evt.data.roomId;
			super.close()
			PopUpManager.removePopUp(this)
			Main._instance.createGameScene();
			Main._instance.loadingView.visible = false;
		}
		protected login(){
			if (this.txtId.text=="" || this.txtPw.text==""){
				TipsBase.getInstance().setContent("帐号或密码不能为空！",1)
			    return;
			}
			var strPw:string=this.txtPw.text;
			var md5Str:string = new md5().hex_md5(strPw);
			// console.log(md5Str)
			// var pInfo="&data=01;"+this.txtId.text+";"+md5Str;
			var pInfo="&data=01;"+this.txtId.text+";"+md5Str;
			//var pInfo="&data=03;"
			game.doOpt(pInfo);

			EventCenter.getInstance().registEvent(EventNotify.LOGIN_RESP,this.connetToServer,this);
			EventCenter.getInstance().registEvent(EventNotify.LOGIN_SUCCESS,this.loginSuccess,this);
		}
	}
}