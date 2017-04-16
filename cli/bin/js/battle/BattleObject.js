var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var dawn;
(function (dawn) {
    var Sprite = Laya.Sprite;
    var BattleObject = (function (_super) {
        __extends(BattleObject, _super);
        function BattleObject() {
            var _this = _super.call(this) || this;
            _this.resPath = "res/tank.jpeg";
            _this.loadImage(_this.resPath);
            _this.scale(0.1, 0.1);
            return _this;
        }
        Object.defineProperty(BattleObject.prototype, "netId", {
            set: function (id) { this.m_netId = id; },
            enumerable: true,
            configurable: true
        });
        return BattleObject;
    }(Sprite));
    dawn.BattleObject = BattleObject;
})(dawn || (dawn = {}));
//# sourceMappingURL=BattleObject.js.map