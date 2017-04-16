module dawn
{
    import Sprite = Laya.Sprite;
    export class BattleObject extends Sprite
    {
        protected m_netId:Number;
        public resPath:string = "res/tank.jpeg";

        constructor() 
        { 
            super();
			this.loadImage(this.resPath);
            this.scale(0.1, 0.1);
        }
        public set netId(id: Number){this.m_netId = id;}
    }
}