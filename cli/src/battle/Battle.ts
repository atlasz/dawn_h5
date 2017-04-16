module dawn
{
    export class Battle
    {
        private cmd:any;
        constructor() 
        { 
    
        }

        public init():void
        {
            this.cmd = ProtoLoader.getInstance().getPbObject("Command");   
        }

        public enterBattle():void
        {
            NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_START, "");
        }

        public exitBattle():void
        {
            NetworkManager.getInstance().sendMessage(this.cmd.CmdType.BATTLE_END, "");
        }
    }
}