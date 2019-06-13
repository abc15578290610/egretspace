/**
 * todo
 * 困死小蚂蚁：玩法随机乱窜的蚂蚁，由一只开始繁殖，玩家需要用最少的木棍，困死蚂蚁
 */
module game {
    /**白鹭游戏库，不依赖其他第三方库 */
	export class GameLib {
		public constructor() {
		}
        /**
         * 创建一个圆形
         */
        public static createBall(r: number): egret.Shape {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(r, r, r);
            shape.graphics.endFill();
            return shape;
        }
        /**
         * 创建一个方形
         */
        public static createBox(width:number,height:number): egret.Shape {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0,0,width,height);
            shape.graphics.endFill();
            return shape;
        }
        /**
         * 创建一条画线
         */
        public static createLine(x:number,y:number,to_x:number,to_y:number): egret.Shape {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xfffff);
            shape.graphics.moveTo(x,y);
            shape.graphics.lineStyle(2,0xfffff,0.9);
            shape.graphics.lineTo(to_x,to_y);
            shape.graphics.endFill();
            return shape;
        }
        /**
         * 求两点间直线距离
         */
        public static distance(x:number,y:number,to_x:number,to_y:number){
            return egret.Point.distance(new egret.Point(x,y),new egret.Point(to_x,to_y))
        }
        /**
         * 求向量角度
         */
        public static angle(diff_x,diff_y){
            //返回角度,不是弧度
            var data = 360*Math.atan(diff_y/diff_x)/(2*Math.PI)
            if(isNaN(data))return 0;
            return data;
        }
	}
}