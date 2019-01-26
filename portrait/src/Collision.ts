
/**碰撞工具类 */
class Collision {
    /**
     * 矩形包围盒碰撞检测
     * 参数obj1,obj2要求是显示对象，必须有坐标和宽高
     */
    protected testRectangleHit(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var b1Rect: egret.Rectangle = obj1.getBounds();
        var b2Rect: egret.Rectangle = obj2.getBounds();
        b1Rect.x = obj1.x; b1Rect.y = obj1.y;
        b2Rect.x = obj2.x; b2Rect.y = obj2.y;
        return b1Rect.intersects(b2Rect);
    }
    private aRect: egret.Rectangle;
    private bRect: egret.Rectangle;
    /**面与面检测,
     * 参数a和b均为对象，
     * (包围盒相交检测 this.aRect.intersects(this.bRect);) */
    protected faceToFaceHit(a, b) {
        if (a != null && b != null) {
            if ((a.x + a.width < b.x) && (a.y + a.height < b.y)) {
                return false;
            }

            if ((a.x + a.width > b.x + b.width) && (a.y + a.height > b.y + b.height)) {
                return false;
            }

            if (!this.aRect) {
                this.aRect = new egret.Rectangle(a.x, a.y, a.width, a.height);
            } else {
                this.aRect.x = a.x;
                this.aRect.y = a.y;
                this.aRect.width = a.width;
                this.aRect.height = a.height;
            }

            if (!this.bRect) {
                this.bRect = new egret.Rectangle(b.x, b.y, b.width, b.height);
            } else {
                this.bRect.x = b.x;
                this.bRect.y = b.y;
                this.bRect.width = b.width;
                this.bRect.height = b.height;
            }

            return this.aRect.intersects(this.bRect);
        } else {
            return false;
        }
    }

    /**点与面的检测，
     * 参数you为对象，x和y为检测点的坐标，
     * （ you.hitTestPoint(x: number, y:number ) ） */
    protected faceToPointHit(you, x: number, y: number) {
        var isHit: boolean = you.hitTestPoint(x, y);
        return isHit;

    }
    /**点与面的像素检测，
     * 据说很耗性能
     * 像素碰撞检测，是判断显示对象的图案（非透明区域）是否与一点相交。
     * 参数you为对象，x和y为检测点的坐标，
     * （ you.hitTestPoint(x: number, y:number, true:boolean ) ） */
    protected pxFaceToPointHit(you, x: number, y: number) {
        var isHit: boolean = you.hitTestPoint(x, y, true);
        return isHit;

    }

    /**
     * 圆与圆的检测
     * 根据圆形的半径，检查圆形是否碰撞
     * @ballA 圆形A
     * @ballB 圆形B
     * @radius 半径
     * @return 是否碰撞
        */
    protected checkCircle(circleA: egret.DisplayObject, circleB: egret.DisplayObject) {
        var pA: egret.Point = new egret.Point(circleA.x, circleA.y);
        var pB: egret.Point = new egret.Point(circleB.x, circleB.y);
        if (egret.Point.distance(pA, pB) <= (circleA.width / 2 + circleB.width / 2)) {
            return true;
        }
        return false;
    }

    /**
     * 多点与面检测（未完成）
     * objA为主角对象（应该有 存有的需要检测的点 成员属性hitPointList[]）
     * objB为需要碰撞的对象
     * pointList 填充结构防报错（）
     */
    protected checkHero(objA: egret.DisplayObject, objB: egret.DisplayObject, pointList: any[]) {
        //碰撞检测
        let rect = new egret.Rectangle(objB.x - objB.anchorOffsetX, objB.y -
            objB.anchorOffsetY, objB.width, objB.height);
        // let hitPointList = objA.hitPointList;
        let hitPointList = pointList;
        let len = hitPointList.length;
        let p: egret.Point = new egret.Point();

        //遍历碰撞点和矩形碰撞
        for (let i = 0; i < len; i++) {
            p = objA.localToGlobal(hitPointList[i].x, hitPointList[i].y);
            if (rect.containsPoint(p)) {
                console.log("hit");
                break;
            }
        }
    }












}