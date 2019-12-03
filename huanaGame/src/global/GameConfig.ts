/**
* 游戏配置文件
* by zhongqing
* (c) copyright 2018 - 2019
* All Rights Reserved.
*/
module GameConfig {

    export function gameType(num:number){//1.百家乐(bjl)   2.龙虎(lh)   3.牛牛(nn)   4.炸金花(xjh)  5.大小(dx)   6.推筒子(tts)   7.时时彩（ssc)  8.江苏快3(jsk3)  9.北京赛车(bjcs)
        switch(num){
            case 1:return "bjl";
            case 2:return "lh";
            case 3:return "nn";
            case 5:return "dx";
        }
    }

    //判断是否为微信
    export function isWeiXin(): boolean {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if(microStr == "null") {
            return false;
        } else if(microStr == "micromessenger") {
            return true;
        }
    }
    export function checkType(val){
			var _val = 'abcdefgh'.indexOf(val);
			if(_val>=0&&_val<=3){
				return 'a';
			}
			if(_val>=4&&_val<=7){
				return 'e';
			}
			return false;
		} 
    export function removeChildren(perent:egret.DisplayObjectContainer){
			for(let i=perent.numChildren-1;i>1;i--){
                perent.removeChildAt(i);
            }
		}
    //是不是大屏
    export function isBigScreen(): boolean {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    } 

    //获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    export function systemType(): string {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if(("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        } else if(("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        } else if(("" + ua.match(/android/i)) == "android") {
            return "android";
        } else if(("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        } else if(("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        } else if(("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        } else if(("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        } else {
            console.log("未知系统类型");
        }
    }  

    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    export function platformType(): string {
        var ua = window.navigator.userAgent.toLowerCase();
        if(("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        } else if(("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        } else if(("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        } else if(("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        } else if(("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        } else if(("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        } else if(("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        } else {
            return "other";
        }
    }
    //当前舞台
    export function curStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    //当前面板
    export var curPanel: egret.DisplayObjectContainer;

    //当前游戏宽度
    export function curWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    //当前游戏宽度
    export function curHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }
    export function strJson(str:string,sign:string=';'){
        var data = str.split(sign)
        return data;
    }
}



