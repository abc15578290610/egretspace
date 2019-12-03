module game {
	/**
	 * 百家乐开发库
	 */
	export class bjlLibTool {
		private maxheight = 120;
        private maxLen=0;
        private layout=[];
        private dataTable=[];
        private curCol=0;
        private curRow=0;
        private beforeVal=null;
		private m_space=12;
		private type=0;
		private lastpos={x:0,y:0}
		private static _instance: bjlLibTool;
		public static getInstance(): bjlLibTool {
			
			this._instance = new bjlLibTool();
			return this._instance;
		}
		public constructor() {
		}
		public initNode(space,type){
			this.m_space=space;
			this.type=type;
		}
		public init(str){
			var data = this.dataSource(str);
			var cell;
			var ping=0;
			for (let i = 0; i < 50; i++) {
				this.layout[i]=[];//生成一个0行10列二维矩阵，记录界面布局
				this.dataTable[i]=[];//生成一个0行10列表结构，记录各列元素
			}
			data.map((val,index)=>{
				if(val=='a'||val=='b'||val=='c'||val=='d'){
					var pos = this.checkVal(val,index);
					this.beforeVal = 'a';
					checkPing(this);
				}else if(val=='e'||val=='f'||val=='g'||val=='h'){
					var pos = this.checkVal(val,index);
					this.beforeVal = 'e';
					checkPing(this)
				}else if(val=='i'||val=='j'||val=='k'||val=='l'){//判断和
					if(!this.curCol&&!this.curRow){
						ping++;
					}else{
						this.layout[this.lastpos.x][this.lastpos.y].ping = ping++;
					}
				}
			})
			//**判断是否有ping */
			function checkPing(_that:any){
				if(ping!=0&&_that.layout[0].length==1&&_that.layout[1].length==0){
					_that.layout[0][0].ping = ping
				}else{
                	ping=0;
            	}
			}
		}
		private checkType(val){
			var _val = 'abcdefgh'.indexOf(val);
			if(_val>=0&&_val<=3){
				return 'a';
			}
			if(_val>=4&&_val<=7){
				return 'e';
			}
			return false;
		}
		public checkVal(val,index){
			var curCol = this.curCol;
			var curRow = this.curRow;
			var layout = this.layout;
			var dataTable = this.dataTable;
			var _val = this.checkType(val);
			if(_val&&_val==this.beforeVal){
				dataTable[curCol].push(val);
				if(curRow>=this.maxLen){
					let len = dataTable[curCol].length;
					let offset = len-this.maxLen-1;
					if(this.maxLen==0){
						curCol=curCol+offset;
						curRow=0;
						this.curRow=curRow;
						this.curCol=curCol;
						this.maxLen = this.getMaxPos(layout[curCol])
						dataTable[curCol][curRow]=val;
						layout[curCol][curRow]={value:val,ping:0,index:index};
						this.lastpos.x = curCol;
						this.lastpos.y = curRow;
						return{val:val,position:{x:curCol*this.m_space,y:curRow*this.m_space}}
					}
					layout[curCol+offset][curRow]={value:val,ping:0,index:index};
					this.lastpos.x = curCol+offset;
					this.lastpos.y = curRow;
					return{val:val,position:{x:(curCol+offset)*this.m_space,y:curRow*this.m_space}}
				}else{
					curRow++;
					this.curRow++;
					layout[curCol][curRow]={value:val,ping:0,index:index};
				}
			}else if(this.beforeVal){//换新行
				curRow=0;
				this.curRow=curRow;
				curCol++;
				this.curCol=curCol;
				this.maxLen = this.getMaxPos(layout[curCol])
				dataTable[curCol][curRow]=val;
				layout[curCol][curRow]={value:val,ping:0,index:index};
			}else{
				this.maxLen =this.getMaxPos(layout[curCol])
				dataTable[curCol][curRow]=val;
				layout[curCol][curRow]={value:val,ping:0,index:index};
			}
			this.lastpos.x = curCol;
			this.lastpos.y = curRow;
			return{val:val,position:{x:curCol*this.m_space,y:curRow*this.m_space}}
		}
		private getMaxPos(arr){
			let len = 5;
			if(arr.length!=0){//如果长度不为0
				for (let i = 0; i < arr.length; i++) {
					let val = arr[i];
					if(!val){
						len=i;
					}
				}
			}
			return len;
		}
		private dataSource(str){
			return str.split('');
		}
		private getCell(type,top,left,val=''):egret.DisplayObject{
			var ele=null;
			if(this.type==0){
				ele = new roadCell(val);
				if(type){
					ele.setType('r_b1_png');
				}else{
					ele.setType('r_b2_png');
				}
			}else if(this.type==1){
				ele = new smallCell();
				if(type){
					ele.setType('r_b1_png');
				}else{
					ele.setType('r_b2_png');
				}
			}else if(this.type==2){
				ele = new smallCell();
				if(type){
					ele.setType('points_1_png');
				}else{
					ele.setType('points_2_png');
				}
			}else if(this.type==3){
				ele = new smallCell();
				if(type){
					ele.setType('xie_1_png');
				}else{
					ele.setType('xie_2_png');
				}
			}else if(this.type==4){
				ele = new roadCell(val);
				(ele as roadCell).scaleX = (ele as roadCell).scaleY=0.96;
				if(type){
					ele.setType('r_b1_png');
				}else{
					ele.setType('r_b2_png');
				}
			}else if(this.type==5){
				ele = new smallCell();
				(ele as smallCell).scaleX = (ele as smallCell).scaleY=0.92;
				if(type){
					ele.setType('r_b1_png');
				}else{
					ele.setType('r_b2_png');
				}
			}else if(this.type==6){
				ele = new smallCell();
				(ele as smallCell).scaleX = (ele as smallCell).scaleY=0.92;
				if(type){
					ele.setType('points_1_png');
				}else{
					ele.setType('points_2_png');
				}
			}else if(this.type==7){
				ele = new smallCell();
				(ele as smallCell).scaleX = (ele as smallCell).scaleY=0.92;
				if(type){
					ele.setType('xie_1_png');
				}else{
					ele.setType('xie_2_png');
				}
			}
			ele.y=top;
			ele.x=left;
			return ele;
		}
		/**
		 * type:1:大眼仔
		 * 		2:小路
		 * 
		 */
		public getLuTu(type,bjl){
			return new LuTu(type).init(bjl.dataTable,bjl.layout);
		}
		public getlayOut(){
			return this.layout
		}
	}
	export class LuTuMap{
		private dataTable=[];
        private layout=[];
        private str='';
        private step=0;
		public constructor(step){
			this.dataTable=[];
			this.layout=[];
			this.str='';
			this.step=step;
		}
		public init(dataTable,layout){
			this.dataTable=dataTable;
			this.layout = layout;
			dataTable.forEach((element,index)=> {
				if(element.length!=0&&index>=this.step){//从第二列开始
					for (let i = 0; i < element.length; i++) {
						var val = element[i];
						if(i==0&&index==this.step){

						}else{
							this.checkRoadType(index,i);
						}
					}
				}
			});
			return this.str;
		}
		private checkRoadType(x,y){
			if(this.layout[x].length>1&&y>=1){//按照路中牌规则
				if(this.layout[x][y].value==this.dataTable[x][y]){
					this.getResult(x,y,true)
				}else{//拐点的牌都是红
					this.str+='a';
				}
			}else if(y==0&&this.layout[x][y].value){//按照路头牌规则
				this.getResult(x,y,false)
			}
		}
		private getResult(x,y,type){
			if(type){
				if(this.isDui(x,y)){
					this.str+='a'
				}else if(this.isYi(x,y)){
					this.str+='e'
				}else if(this.isLong(x,y)){
					this.str+='a'
				}else{
					console.log("意外")
				}
			}else{//鹿头牌
				var y1 = this.dataTable[x-1].length;
				if(this.isDui(x-1,y1)){
					this.str+='e'
				}else if(this.isYi(x-1,y1)){
					this.str+='a'
				}else if(this.isLong(x-1,y1)){
					this.str+='e'
				}else{
					console.log("意外")
				}
			}
		}
		private isDui(x,y){
			if(this.layout[x-this.step][y]){
				return true;
			}
			return false;
		}
		private isYi(x,y){
			if(!this.layout[x-this.step][y]&&this.layout[x-this.step][y-1]){
				return true;
			}
			return false;
		}
		private isLong(x,y){
			if(!this.layout[x-this.step][y]&&!this.layout[x-this.step][y-1]){
				return true;
			}
			return false;
		}
	}
}