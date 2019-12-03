module Global {
 
    export var nCnnState:number=0;
    export var strLogin:string="";      //连接关健字
    export var nRoom:number=0;          //房间局限
    export var nState:number=0;         //下注状态  0下注
    export var pomeloInfo:any;
    export var loginType:number=0;        //1.帐号登录  2.微信登录   
    export var pConnInfo={ip:"43.250.9.6"};  //43.225.107.162    127.0.0.1 124.248.245.226  43.250.9.6
    export var strReq;
    export var self;
    export var vidsocket:any;
}