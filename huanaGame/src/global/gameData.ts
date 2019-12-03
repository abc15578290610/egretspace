module game {
	export class gameData {
		static roomData=[];
		static videoData='';
		static userInfo={
			userId:0,
			/**玩家身份0:游客，1:玩家，2:vip */
			userType:0,
			name:"",
			nicheng:"",
			pw:"",
			token:"",
			uid:"",
			sex:"",
			/**余额*/
			ye:0,
			wxh:"",
			companyWxh:"",
			dlWxh:"",
			reference_id:"",
			imgHeadUrl:"",
            game_name:"",
			upperId:"",
			gameType:1,
			teskId:"",
			roomname:"",
			bank:"",
			rType:"",
			roomId:""
		};	
		static login ={
			data:{
				msg: "",
				players: {nn: 0, bjl: 0, lh: 0, xjh: 0, dx: 0},
				url: "",
				wxh: ""
			}
		}
		static nn_rooms:string[]=[];
		static baseRoutes={
			"getTradeRecord":"connector.entryHandler.getTradeRecord",//选择游戏房间   //牛牛进入 nnHandler   百乐进入 bjlHandler
			"getRecord":"connector.entryHandler.getRecord",
			"getOnLineNum":"connector.entryHandler.getOnLineNum"
		}
		static routes={
			"doSelectGame":"nn.nnHandler.doSelectGame",//选择游戏房间   //牛牛进入 nnHandler   百乐进入 bjlHandler
			"doQuitGame":"nn.nnHandler.doSelectGame",
			"doSelectDesk":"nn.nnHandler.doSelectDesk",//选择桌号进入游戏环节
			"doBet":"nn.nnHandler.doBet",//下注
			"getRecord":"connector.entryHandler.getRecord",//获取下注记录
			"returnHall":"connector.entryHandler.returnGameMap",//返回大厅
		}
		static bjlroutes={
			"doSelectGame":"bjl.bjlHandler.doSelectGame",//选择游戏房间   // 百乐进入 bjlHandler
			"doQuitGame":"bjl.bjlHandler.doSelectGame",
			"doSelectDesk":"bjl.bjlHandler.doSelectDesk",//选择桌号进入游戏环节
			"doBet":"bjl.bjlHandler.doBet",//下注
			"getRecord":"connector.entryHandler.getRecord",//获取下注记录
			"returnHall":"connector.entryHandler.returnGameMap",//返回大厅
		}
		static lhroutes={
			"doSelectGame":"lh.lhHandler.doSelectGame",//选择游戏房间   // 百乐进入 bjlHandler
			"doQuitGame":"lh.lhHandler.doSelectGame",
			"doSelectDesk":"lh.lhHandler.doSelectDesk",//选择桌号进入游戏环节
			"doBet":"lh.lhHandler.doBet",//下注
			"getRecord":"connector.entryHandler.getRecord",//获取下注记录
			"returnHall":"connector.entryHandler.returnGameMap",//返回大厅
		}
		static betList={
			cm1:1,
			cm2:10,
			cm3:50,
			cm4:100,
			cm5:500,
			cm6:1000,
			cm7:5000,
			cm8:10000,
		}
		static ludan={
			a:1,
			b:2,
			c:3,
			d:4,
			e:5,
			f:6,
			g:7,
			h:8,
			i:9,
			j:10,//牛牛
			k:11,//炸弹
			l:12//没牛
		}
		static nnResult={
			a:"牛1",
			b:"牛2",
			c:"牛3",
			d:"牛4",
			e:"牛5",
			f:"牛6",
			g:"牛7",
			h:"牛8",
			i:"牛9",
			j:"牛牛",//牛牛
			k:"炸弹",//炸弹
			l:"没牛"//没牛
		}
		static gameFactory(Type){
			var obj = null;
			if(Type=='nn'){
				obj = gameView.getInstance();
			}else if(Type=='bjl'){
				obj = bjlgameView.getInstance();
			}else if(Type=='lh'){
				obj = lhgameView.getInstance();
			}
			return obj;
		}
		static itemfactory(type){
			if(type=='nn'){
				return new nngameItem();
			}else if(type=='bjl'){
				return new bjlgameItem();
			}else if(type=='lh'){
				return new lhgameItem();
			}else{
				console.error('找不到类型')
			}
		}
		static ResultFactory(Type){
			var obj = null;
			if(Type=='nn'){
				obj = resultView.getInstance();
			}else if(Type=='bjl'){
				obj = bjlResultView.getInstance();
			}
			else if(Type=='lh'){
				obj = lhResultView.getInstance();
			}
			return obj;
		}
	}
	export class timerTool{
	static m_timer=0
	static timer:egret.Timer
    public static checkNetState(){
			if(!this.timer){this.timer = new egret.Timer(500, 50);}
			
			if(!this.timer.hasEventListener(egret.TimerEvent.TIMER)){
				this.timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
			}
			this.timer.start()
			function timerFunc(){
				this.m_timer++;
				console.log("检查网络状况")
				if(this.m_timer>5){
					netTool.send(true);
				}
			}
		}
	}
}