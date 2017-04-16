module laya {
    import Browser = Laya.Browser;
    import Handler = Laya.Handler;
    import Event = Laya.Event;
    import Socket = Laya.Socket;
    import Byte = Laya.Byte;
    import ProtoLoader = dawn.ProtoLoader;
    import DispatchEvt = dawn.Event;
    import NetworkManager = dawn.NetworkManager;
    import Battle = dawn.Battle;
    // 程序入口
    class GameMain {
        //private ProtoBuf:any = Browser.window.ProtoBuf;
        private socket: Socket;
        private output: Byte;
        private buffer: any;
        private m_processStep: number = 0;
        private index:number = 0;
        

        constructor() {
            Laya.init(1000, 800);

            //pb.load("data/chat.proto", this.onAssetsLoaded);
            //this.connect();
            this.process();
            //Laya.timer.loop(1000, this, this.animateTimeBased);
        }

        private animateTimeBased():void
        {
            this.index++;
            console.log("tick index: " + this.index);
        }

        //tmpcode
        private process():void
        {
            switch(this.m_processStep)
            {
                case 0://load resource
                ProtoLoader.getInstance().init();
                ProtoLoader.getInstance().addEventListener("LoadComplete", this.onProtoLoaderComplete);
                this.m_processStep++;
                break;
                case 1://init networkmanager
                NetworkManager.getInstance().init();
                NetworkManager.getInstance().connect();
                NetworkManager.getInstance().addEventListener("connect", this.onConnected);
                this.m_processStep++;
                break;
                case 2:
               // this.sendTempleMsg();
                NetworkManager.getInstance().DoConnStart();
               // NetworkManager.getInstance().registerCMD(1, this.handleMsg1);
               // NetworkManager.getInstance().registerCMD(1, this.handleMsg2);           
                this.m_processStep++;
                this.process();
                break;
                case 3:
                //NetworkManager.getInstance().DoConnStop();
                var battle:Battle = new Battle();
                battle.init();
                battle.enterBattle();
                this.m_processStep++;
                break;
            }
        }

        private handleMsg1(message:any):void
        {
            var pb:any = ProtoLoader.getInstance().getPbObject("ChatInfo");
            var aaa:any = pb.decode(message);
            console.log("handleMsg1: " + aaa.playerName);
        }
        private handleMsg2(message:any):void
        {
            var pb:any = ProtoLoader.getInstance().getPbObject("ChatInfo");
            var aaa:any = pb.decode(message);
            console.log("handleMsg2: " + aaa.playerName);
        }

        private onProtoLoaderComplete(evt:DispatchEvt):void
        {
            if(evt.getType() == "LoadComplete")
            {
                console.log("onProtoLoaderComplete");
                ProtoLoader.getInstance().removeEventListener("LoadComplete", game.onProtoLoaderComplete);
                game.process();
            }
        }

        private onConnected(evt:dawn.NetworkManagerEvent):void
        {
            if(evt.getType() == "connect")
            {
                console.log("onConnected");
                game.process();
            }
        }

        private sendTempleMsg():void
        {
            var pb:any = ProtoLoader.getInstance().getPbObject("ChatInfo");
            //console.log(pb);
           
            //tmpcode
            var message: any = pb.create(
            {
                playerName: "AwesomeString"
            });
        
            var errMsg: any = pb.verify(message);
            if (errMsg)
                throw Error(errMsg);

            // Encode a message to an Uint8Array (browser) or Buffer (node)
            game.buffer = pb.encode(message).finish();
            NetworkManager.getInstance().sendMessage(1,game.buffer);
        }
        
    }
    var game = new GameMain();
}