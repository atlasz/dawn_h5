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
    var Tank = (function (_super) {
        __extends(Tank, _super);
        function Tank() {
            return _super.call(this) || this;
        }
        return Tank;
    }(dawn.BattleObject));
    dawn.Tank = Tank;
})(dawn || (dawn = {}));
//# sourceMappingURL=Tank.js.map