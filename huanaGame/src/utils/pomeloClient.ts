// TypeScript file
module rPomelo {
  export var pomelo;
  var pomelo2;
  pomelo = new PomeloForEgret.Pomelo2();
  pomelo2 = new PomeloForEgret.Pomelo2();   //登录用pomelo
  var isGameReconn:boolean=false;
  var isConnected:boolean=false;
  export var ServerClose:boolean=false;
  var nHeartBeat:number=0;
  var t_heartbeat:egret.Timer=new egret.Timer(5000,0);
  var t_timer:egret.Timer=new egret.Timer(8000,0);
  var interval;
  export var isLoginView=true;
  pomelo2.on('close', function(e:any):void {  	// 连接关闭
     //console.log("pomelo2 close");
  });
  pomelo.on('close', function(e:any):void {  	// 连接关闭
     console.log("--------pomelo 关闭,请重连------------");
     console.log("err:",e.error)
     isConnected=false;
     Global.nCnnState=0;
     reconnect();
  });  
  function reconnect(){
    if ( isGameReconn==false && ServerClose==false){ 
        isGameReconn=true;
        t_timer.addEventListener(egret.TimerEvent.TIMER,doRecnn,this);
        t_timer.start();
    } 
  }
  function doRecnn(){
       console.log("----------isConnected1:"+isConnected +"---------");
       if (isConnected==false&&!rPomelo.isLoginView){
           console.log("--------断线重连中:---------");
           rPomelo.doQueryEntry(game.gameData.userInfo.userId,game.gameData.userInfo.token,game.gameData.userInfo.rType,game.gameData.userInfo.roomId);
       }
       isGameReconn=false;
  }

  pomelo.on("onKick",function(e:any):void {  	// 被踢开
     doKick();
  });  

  export function doKick(){
        console.log("踢出")                    
        t_timer.stop();
        t_heartbeat.stop();
        t_heartbeat.removeEventListener(egret.TimerEvent.TIMER,chkHeartBeat,this)
        pomeloDisconn();
        Global.pomeloInfo="00;"+"<@>";
        rPomelo.isLoginView=true;
        let evt = new egret.Event(EventNotify.LOGIN_OUT)
        EventCenter.getInstance().dispatchEventData(evt)
    //  EventCenter.dispatchGEvent(GEventType.SOCKET_INFO);
  }
  pomelo.on('onMsg', function(data) {          //默认接收数据路由
      nHeartBeat=0;
      Global.pomeloInfo=data.code;
      console.log("广播",data)
      var info = new egret.Event(EventNotify.SOCKET_INFO)
      info.data = data;
      EventCenter.getInstance().dispatchEventData(info);
  });
//获得gate服务器分配的host和port
function queryEntry(uid, callback) {
    console.log("uid:"+uid);
   	var route = 'gate.gateHandler.queryEntry';
	  pomelo2.init({
		   host: Global.pConnInfo.ip,//
		   port: 3014,
	       log: true
	  }, function() {
		    pomelo2.request(route, {
	  		uid: uid
	 	}, function(data) {
	  		pomelo2.disconnect();
	  		if(data.code === 500) {
		   		//showError(LOGIN_ERROR);
				return;
		  	}
			callback(data.host, data.port);
		});
	});
};
 ////连接gate服务器,login   进入游戏或房间
export function doQueryEntry(uid,token,rType="",roomId=""){                  
	 	 queryEntry(uid,function(host, port) {
		  	pomelo.init({host: host,port: port,log: true}, function(){
			  var route = "connector.entryHandler.entry";
              console.log("host:"+host,"port:"+port);
              pomelo.request(route, {userId:uid,token:token,rType:rType,roomId:roomId},function(msg){
                  console.log(msg);
                  if (msg.code==200){
                     Global.nCnnState=1;
                     isConnected=true;
                     ServerClose=false;
                     nHeartBeat=0;
                     t_heartbeat.addEventListener(egret.TimerEvent.TIMER,chkHeartBeat,this);
                     t_heartbeat.start();
                     t_timer.stop();
                     game.TipsBase.getInstance().setContent("欢迎回来",1)
                     rPomelo.isLoginView=false;
                     let evt = new egret.Event(EventNotify.LOGIN_SUCCESS)
                     evt.data=msg;
                     EventCenter.getInstance().dispatchEventData(evt)//success
                  }
                  if(msg.code==300){
                      isConnected=true;
                      rPomelo.isLoginView=true;
                      let evt = new egret.Event(EventNotify.LOGIN_OUT)
                      EventCenter.getInstance().dispatchEventData(evt)
                      game.TipsBase.getInstance().setContent("重复登录！！！")
                    }  //重复登录,客户端可以提示玩家
                  console.log("---------isConnected2:"+isConnected+"-----------")
              });    
		  });
	  });
}

// 向服务器发起需要反馈的通知
export function sendMsgForReturn(route,msg){
    pomelo.request(route, msg, function(data) {
           if (data.error) {
                return;
           }
    });           
}
/**请求服务器 */
export function request(url,data,callback:Function,obj){
    pomelo.request(url, data, function(resp) {
           if (resp.error) {
               console.warn(url,"---",resp)
                return;
           }
           if(!callback)return;
           callback.call(obj,resp);
    });           
}
  // 向服务器发起不需要反馈的通知
export function sendMsgNoReturn(route,msg){
    pomelo.notify(route,msg);
}
function chkHeartBeat(){
    if (nHeartBeat>20 && ServerClose==false&&!rPomelo.isLoginView){
       console.log("自检测跳线了");
       pomelo.disconnect();
       window.location.reload(true);
       rPomelo.doQueryEntry(game.gameData.userInfo.userId,game.gameData.userInfo.token,game.gameData.userInfo.rType,game.gameData.userInfo.roomId);   //心跳包跳线后才重连
    }
    nHeartBeat+=3;
    var msg={uid:game.gameData.userInfo.userId};                      //记得改
    var route:string = "bjl.bjlHandler.chkHardBean";
    pomelo.request(route, msg, function(data) {
         if (data.code=="07")nHeartBeat=0;  
    });           
}

// 主动从服务器断开连接
export function pomeloDisconn(){
     pomelo.disconnect();
     t_timer.removeEventListener(egret.TimerEvent.TIMER,doRecnn,this)
     ServerClose=true;
     console.log("主动从服务器断开连接:");
  }
}
