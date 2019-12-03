module game {
	/**
	* UI弹窗配管理
	* by zhongqing
	* (c) copyright 2018 - 2019
	* All Rights Reserved.
	* ToDo:
	*/
	export class PopManager {
		private static _instance=null;
		private darkSprite:egret.Sprite;
		/**当前弹窗 */
		public curPanel = null;
		public constructor() {
		}
		//游戏容器管理器单例
		public static getInstance(): PopManager {
			if (!this._instance)
				this._instance = new PopManager();
			return this._instance;
		}
		/**
		* 
		* 添加面板方法
		* @param Layer       		基于父容器
		* @param panel       		面板
		* @param dark        		背景是否变黑
		* @param popUpWidth      	指定弹窗宽度，定位使用
		* @param popUpHeight      	指定弹窗高度，定位使用
		* @param effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
		*/
		protected showUI(Layer:egret.DisplayObjectContainer,panel:egret.DisplayObjectContainer,dark: boolean = false, popUpWidth: number = 0, popUpHeight: number = 0, effectType: number = 0, isAlert: boolean = false, close: boolean = true){
			console.log(this.showUI.arguments)
			if (Layer.contains(panel)) {//判断是否包含panel
				return;
			}

			panel.scaleX = 1;
			panel.scaleY = 1;
			panel.x = 0;
			panel.y = 0;
			panel.alpha = 1;

			if (dark) {
				this.darkSprite = new egret.Sprite();
				this.darkSprite.graphics.clear();
				this.darkSprite.graphics.beginFill(0x000000, 0.8);
				this.darkSprite.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight());
				this.darkSprite.graphics.endFill();
				this.darkSprite.width = GameConfig.curWidth();
				this.darkSprite.height = GameConfig.curHeight();
				if (close) {
					this.darkSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
						e.stopPropagation();
						this.closeUI(panel.parent,panel);
					}, this);
				}
				if (!Layer.contains(this.darkSprite)) {
					Layer.addChild(this.darkSprite);
				}
				this.darkSprite.touchEnabled = true;

				egret.Tween.get(this.darkSprite).to({ alpha: 1 }, 150);
				this.darkSprite.visible = true;
			}

			Layer.addChild(panel);
			this.curPanel = panel;
			if (popUpWidth != 0) {
				panel.x = GameConfig.curWidth() / 2 - popUpWidth / 2;
				panel.y = GameConfig.curHeight() / 2 - popUpHeight / 2;
			} else {
				popUpWidth = panel.width;
				popUpHeight = panel.height;
			}

			//以下是弹窗动画
			var leftX: number = GameConfig.curWidth() / 2 - popUpWidth / 2;
			var upY: number = GameConfig.curHeight() / 2 - popUpHeight / 2;

			switch (effectType) {
				case 0:
					break;
				case 1:
					panel.alpha = 0;
					panel.scaleX = 0.5;
					panel.scaleY = 0.5;
					panel.x = panel.x + popUpWidth / 4;
					panel.y = panel.y + popUpHeight / 4;
					egret.Tween.get(panel).to({ alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 300, egret.Ease.backOut);
					break;
				case 2:
					panel.alpha = 0;
					panel.scaleX = 0.5;
					panel.scaleY = 0.5;
					panel.x = panel.x + popUpWidth / 4;
					panel.y = panel.y + popUpHeight / 4;
					egret.Tween.get(panel).to({ alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 600, egret.Ease.elasticOut);
					break;
				case 3:
					if (isAlert) {
						panel.x = - popUpWidth;
						egret.Tween.get(panel).to({ x: leftX }, 500, egret.Ease.cubicOut);
					} else {
						panel.x = - popUpWidth;
						egret.Tween.get(panel).to({ x: 0 }, 500, egret.Ease.cubicOut);
					}
					break;
				case 4:
					if (isAlert) {
						panel.x = popUpWidth;
						egret.Tween.get(panel).to({ x: leftX }, 500, egret.Ease.cubicOut);
					} else {
						panel.x = popUpWidth;
						egret.Tween.get(panel).to({ x: 0 }, 500, egret.Ease.cubicOut);
					}
					break;
				case 5:
					if (isAlert) {
						panel.y = - popUpHeight;
						egret.Tween.get(panel).to({ y: upY }, 500, egret.Ease.cubicOut);
					} else {
						panel.y = - popUpHeight;
						egret.Tween.get(panel).to({ y: 0 }, 500, egret.Ease.cubicOut);
					}
					break;
				case 6:
					if (isAlert) {
						panel.y = GameConfig.curHeight();
						egret.Tween.get(panel).to({ y: upY }, 500, egret.Ease.cubicOut);
					} else {
						panel.y = popUpHeight;
						egret.Tween.get(panel).to({ y: 0 }, 500, egret.Ease.cubicOut);
					}
					break;
				default:
					break;
			}
		}
		protected closeUI(Layer:egret.DisplayObjectContainer,panel:egret.DisplayObjectContainer,effectType: number = 0){
			var onComplete: Function = function () {
				if (Layer.contains(this.darkSprite)) {
					Layer.removeChild(this.darkSprite);
				}
			};
			if (this.darkSprite) {
				egret.Tween.get(this.darkSprite).to({ alpha: 0 }, 100).call(onComplete, this);
			}

			//以下是弹窗动画
			switch (effectType) {
				case 0:
					break;
				case 1:
					egret.Tween.get(panel).to({ alpha: 0, scaleX: 0, scaleY: 0, x: panel.x + panel.width / 2, y: panel.y + panel.height / 2 }, 300);
					break;
				case 2:
					break;
				case 3:
					egret.Tween.get(panel).to({ x: panel.width }, 500, egret.Ease.cubicOut);
					break;
				case 4:
					egret.Tween.get(panel).to({ x: -panel.width }, 500, egret.Ease.cubicOut);
					break;
				case 5:
					egret.Tween.get(panel).to({ y: panel.height }, 500, egret.Ease.cubicOut);
					break;
				case 6:
					egret.Tween.get(panel).to({ y: -panel.height }, 500, egret.Ease.cubicOut);
					break;
				default:
					break;
			}

			var waitTime = 500;
			if (effectType == 0) {
				waitTime = 0;
			}
			egret.setTimeout(function () {
				if (Layer.contains(panel)) {//判断是否包含panel
					Layer.removeChild(panel);
				}
			}, this, waitTime);
		}
	}
}