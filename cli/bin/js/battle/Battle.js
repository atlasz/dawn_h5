var dawn;
(function (dawn) {
    var Battle = (function () {
        function Battle() {
            this.m_battleObjects = new dawn.Dictionary([]);
            this.battle = this;
        }
        Battle.prototype.init = function () {
            this.cmd = dawn.ProtoLoader.getInstance().getPbObject("Command");
            dawn.NetworkManager.getInstance().registerCMD(this.cmd.CmdType.SPAWN_OBJECT, this.handleSpawn);
        };
        Battle.prototype.enterBattle = function () {
            dawn.NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_START, "");
        };
        Battle.prototype.exitBattle = function () {
            dawn.NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_END, "");
        };
        Battle.prototype.handleSpawn = function (message) {
            var pb = dawn.ProtoLoader.getInstance().getPbObject("ObjectSpawn");
            var spawnInfo = pb.decode(message);
            var netid = spawnInfo.netid;
            console.log("handleSpawn: " + netid);
            /*if(this.battle.m_battleObjects.containsKey(netid))
            {
              
            }
            else
            {
                var bo:BattleObject = new BattleObject();
                Laya.stage.addChild(bo);
                this.battle.m_battleObjects.add(netid, bo);
            }*/
            var bo = new dawn.BattleObject();
            bo.pos(spawnInfo.position.x, spawnInfo.position.y);
            Laya.stage.addChild(bo);
        };
        return Battle;
    }());
    dawn.Battle = Battle;
})(dawn || (dawn = {}));
//# sourceMappingURL=Battle.js.map