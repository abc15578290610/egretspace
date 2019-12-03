class cell extends eui.Component{
	private m_bj:eui.Image;
	public constructor() {
		super();
		this.skinName="cellSkin";
	}
	public setData(url){
		this.m_bj.source = url;
	}
}