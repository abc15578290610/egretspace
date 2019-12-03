module game{
     export function doOpt(strpara){
        var request:egret.HttpRequest = new egret.HttpRequest();
        var respHandler = function( evt:egret.Event ):void {
            switch ( evt.type ){
              case egret.Event.COMPLETE:
                 var request:egret.HttpRequest = evt.currentTarget;
                 console.log( "respHandler:", request.response );
                 //var strJson=JSON.parse(request.response);
                 //Global.strLogin=strJson.code+";@";
                 Global.strLogin=request.response+";@";
                 let data = GameConfig.strJson(Global.strLogin)
                 console.log("Global.strLogin:"+Global.strLogin);
                 var event = new game.EventData(EventNotify.LOGIN_RESP)
                gameData.userInfo.userId = parseInt(data[2]);
                gameData.userInfo.ye = parseInt(data[3]);
                gameData.userInfo.token = data[4];
                gameData.userInfo.name = data[5];
                event._data.userId = parseInt(data[2]);
                event._data.ye = parseInt(data[3])
                event._data.tokey = data[4];
                event._data.name = data[5]
                 EventCenter.getInstance().dispatchEventData(event);
                 break;
            }
        }
        timerTool.checkNetState();
        request.once( egret.Event.COMPLETE, respHandler, null);
        var ip=Global.pConnInfo.ip+":3195";                  //Global.pConnInfo.ip=124.248.245.226
        var params="";
        var url="http://"+ip+"/opt";
        request.open(url,egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(strpara);
    }
}