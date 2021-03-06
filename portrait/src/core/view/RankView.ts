module game {
/**
* 排行榜
* by zhongqing
* (c) copyright 2018 - 2019
* All Rights Reserved.
*/
export class RankView extends PanelUI{
	private m_list:eui.List;
	public constructor() {
		super();
		this.skinName ="rankViewSkin"
	}
	protected init(){
		super.init();
		var data =[]
		for(let i=0;i<=15;i++){
			let item = {num:0,grade:0,alpha:0.5}
			item.num = i+1;
			item.grade=i*1000;
			item.alpha = i%2==0?0.5:0;
			data.push(item);
		}
		this.setData(data)
	}
	public setData(data:Array<any>){
		this.m_list.dataProvider = new eui.ArrayCollection(data);
	}
	protected addEvent(){
	}
	protected close(){
		super.close();
		PopUpManager.removePopUp(this)
	}
}
}