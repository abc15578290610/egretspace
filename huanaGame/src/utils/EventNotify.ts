/**
* 游戏配置文件
* by zhongqing
* (c) copyright 2018 - 2019
* All Rights Reserved.
*/
class EventNotify{
    ///////////////////////////////////界面事件处理
    /**进入账号登录界面 */
    public static SHOW_LOGIN = "SHOW_LOGIN";
    /**进入关闭登录界面 */
    public static CLOSE_LOGIN = "CLOSE_LOGIN";
    /**进入大厅界面 */
    public static SHOW_MAIN = "SHOW_MAIN";
    /**进入游戏界面 */
    public static SHOW_GAME = "SHOW_GAME";
    /**关闭游戏界面 */
    public static CLOSE_GAME = "CLOSE_GAME";
    /**进入开始界面 */
    public static SHOW_START = "SHOW_START";
    /**关闭开始界面 */
    public static CLOSE_START = "CLOSE_START";
    /**进入规则界面 */
    public static SHOW_RULE = "SHOW_RULE";
    /**关闭规则界面 */
    public static CLOSE_RULE = "CLOSE_RULE";
    /**进入排行界面 */
    public static SHOW_RANK = "SHOW_RANK";
    /**关闭排行界面 */
    public static CLOSE_RANK = "CLOSE_RANK";
    /**进入下注记录界面 */
    public static SHOW_BETRECORD = "SHOW_BETRECORD";
    /**关闭排行界面 */
    public static CLOSE_BETRECORD = "CLOSE_BETRECORD";
    /**游戏结算 */
    public static GAME_RESULT = "GAME_RESULT";
    /**游戏列表*/
    public static GAME_ROOM_LIST = "GAME_ROOM_LIST";
    /**关闭游戏列表，返回主界面*/
    public static CLOSE_GAME_ROOM_LIST = "CLOSE_GAME_ROOM_LIST";

    ////////////////////game中界面事件处理
    /**换桌*/
    public static GAME_SWITCH_DESK = "GAME_SWITCH_DESK";
    /**游戏设置*/
    public static GAME_SHOW_SET = "GAME_SHOW_SET";
    /**关闭游戏设置*/
    public static GAME_CLOSE_SET = "GAME_CLOSE_SET";
    /**游戏帮助*/
    public static GAME_SHOW_HELP = "GAME_SHOW_HELP";
    /**关闭游戏帮助*/
    public static GAME_CLOSE_HELP = "GAME_CLOSE_HELP";
    //////////////////////////////服务器消息事件处理
    /**登录http服务器返回 */
    public static LOGIN_RESP = "LOGIN_RESP";
    /**登录游戏服务器成功消息 */
    public static LOGIN_SUCCESS = "LOGIN_SUCCESS";
    /**服务器推送消息 */
    public static SOCKET_INFO = "SOCKET_INFO";
    /**切换推送消息 */
    public static SWITCH_ROOM="SWITCH_ROOM";
    /**退出登录 */
    public static LOGIN_OUT="LOGIN_OUT";
    /**发牌推送消息 */
    public static SEND_CARD="SEND_CARD";

    //////////////////////////////客户端通知消息事件处理
    /**刷新个人信息 */
    public static USER_INFO = "USER_INFO";

    /**刷新个人筹码 */
    public static COIN_INFO = "COIN_INFO";

    /**网络加载中*/
    public static NET_LOAD = "NET_LOAD";
    /**播放视频 */
    public static PLAY_VIDEO="PLAY_VIDEO";
    /**暂停视频 */
    public static STOP_VIDEO="STOP_VIDEO";
}