module game {
	export class resultCell extends eui.Component{
		private dateTimer:DateTimer;
		private m_time:eui.BitmapLabel;
		private shape:egret.Shape;
		private m_light:eui.Image;
		public constructor() {
			super();
			this.skinName="resultCellSkin";
			this.shape = new egret.Shape();
			this.addChild(this.shape);
			this.m_light.mask = this.shape;
		}
		public play(num:number,state=1){
            if(state==1){
                
            }
            if(this.dateTimer){
                this.dateTimer.stop();
                this.dateTimer.removeEventListener(egret.TimerEvent.TIMER, this.onDateTimerHandler,this)
            }
            this.visible=true;
            this.angle=360;
			this.dateTimer = new DateTimer(1000,num);
			this.dateTimer.addEventListener(egret.TimerEvent.TIMER, this.onDateTimerHandler,this);
            this.dateTimer.addEventListener(egret.TimerEvent.COMPLETE,this.stop,this)
			this.dateTimer.start();
		}
		public stop(){
            this.angle=360;
            this.changeGraphics(360)
            if(this.dateTimer){
                this.dateTimer.stop();
                this.dateTimer.reset();
            }
			this.m_time.text=0+"";
            this.visible=false;
		}
		private angle=360
		private onDateTimerHandler(){
            var all = this.dateTimer.repeatCount;
			var num = all-this.dateTimer.currentCount;
			if(num<0){this.stop();return;}
			this.m_time.text = num+"";
			this.angle -= 360/all;
			this.changeGraphics(this.angle);
			this.angle = this.angle % 360;
		}
		private changeGraphics(angle) {
			this.shape.graphics.clear();
			this.shape.graphics.beginFill(0xff0000);
			this.shape.graphics.moveTo(66, 66);
			this.shape.graphics.lineTo(132, 66);
			this.shape.graphics.drawArc(66, 66, 66, 0, angle * Math.PI / 180, false);
			this.shape.graphics.lineTo(66, 66);
			this.shape.graphics.endFill();
		}
	}
}