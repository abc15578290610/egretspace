/**
 * Created by Tint_ on 2017/4/17.
 */
class SoundManager{
    /**
     * 播放音效
     * @param name 名字
     * @param times 次数
     * @param vol 音量 0 - 1
     */
    public static playSound(name:string, times:number = 0, vol:number = 1){
        let sound:egret.Sound = RES.getRes(name);
        sound.play(0, times).volume = vol;
    }

    /**
     * 播放一次音效
     * @param name 名字
     * @param vol 音量 0 - 1
     */
    public static playSoundOnce(name:string, vol:number = 1){
        SoundManager.playSound(name,1, vol);
    }
    /**
     * 循环播放音乐
     * @param name 名字
     * @param vol 音量 0 - 1
     */
    public static playMusicLoops(name:string, vol:number = 1){
        SoundManager.playSound(name,0, vol);
    }
}