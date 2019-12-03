module game {
        /** 
        *Created by 渔歌烟火 on 2018/3/28.
        * 字体缓动动画
        */
    export class LabelEffect {
        private static _instance:LabelEffect;
        public static get instance():LabelEffect
        {
            if( null == LabelEffect._instance )
            {
                LabelEffect._instance = new LabelEffect();
            }
            return LabelEffect._instance;
        }
        /**
         * @param target 显示对象
         * @param options 例如{ time: 1500,initNum:100,num: 88888, regulator: 50 }
         */
        public playEffect(target:any,options:any){
            options = options || {}; 
            if(options.initNum==options.num)return;        
            var time = options.time,//总时间--毫秒为单位 
                finalNum = options.num, //要显示的真实数值
                regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度          
                step = (finalNum-options.initNum) / (time / regulator),/*每30ms增加的数值--*/       
                count =  options.initNum, //计数器       
                initial = options.initNum;
            var timer = setInterval(()=> {          
            count = count + step;          
            if(count >= finalNum&&options.initNum<finalNum) {        
                    clearInterval(timer);        
                    count = finalNum;       
            }
            if(count <= finalNum&&options.initNum>=finalNum) {
                clearInterval(timer);        
                count = finalNum;       
            } 
                //t未发生改变的话就直接返回         
                var t = Math.floor(count);       
                if(t == initial) return;          
                initial = t;          
                target.text = initial+"";
            }, 30);     
        }
    }
}