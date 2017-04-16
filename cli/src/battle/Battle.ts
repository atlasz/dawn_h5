module dawn
{
    export class Battle
    {
        private cmd:any;
        private m_battleObjects:Dictionary = new Dictionary([]);
        private battle:Battle;

        constructor() 
        { 
            this.battle = this;
        }

        public init():void
        {
            this.cmd = ProtoLoader.getInstance().getPbObject("Command");  
            NetworkManager.getInstance().registerCMD(this.cmd.CmdType.SPAWN_OBJECT, this.handleSpawn); 
        }

        public enterBattle():void
        {
            NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_START, "");
        }

        public exitBattle():void
        {
            NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_END, "");
        }

        private handleSpawn(message:any):void
        {
            var pb:any = ProtoLoader.getInstance().getPbObject("ObjectSpawn");
            var spawnInfo:any = pb.decode(message);
            var netid:number = spawnInfo.netid;
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
            var bo:BattleObject = new BattleObject();
            bo.pos(spawnInfo.position.x, spawnInfo.position.y);
            Laya.stage.addChild(bo);
        }
    }
}