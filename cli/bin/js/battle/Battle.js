var dawn;
(function (dawn) {
    var Battle = (function () {
        function Battle() {
        }
        Battle.prototype.init = function () {
            this.cmd = dawn.ProtoLoader.getInstance().getPbObject("Command");
        };
        Battle.prototype.enterBattle = function () {
            dawn.NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_START, "");
        };
        Battle.prototype.exitBattle = function () {
            dawn.NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_END, "");
        };
        return Battle;
    }());
    dawn.Battle = Battle;
})(dawn || (dawn = {}));
//# sourceMappingURL=Battle.js.map