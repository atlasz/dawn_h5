var laya;
(function (laya) {
    var Browser = Laya.Browser;
    var ProtoLoader = dawn.ProtoLoader;
    var NetworkManager = dawn.NetworkManager;
    // 程序入口
    var GameMain = (function () {
        function GameMain() {
            this.m_processStep = 0;
            this.index = 0;
            Laya.init(600, 400);
            var pb = Browser.window.protobuf;
            //pb.load("data/chat.proto", this.onAssetsLoaded);
            //this.connect();
            this.process();
            //Laya.timer.loop(1000, this, this.animateTimeBased);
        }
        GameMain.prototype.animateTimeBased = function () {
            this.index++;
            console.log("tick index: " + this.index);
        };
        //tmpcode
        GameMain.prototype.process = function () {
            switch (this.m_processStep) {
                case 0:
                    ProtoLoader.getInstance().init();
                    ProtoLoader.getInstance().addEventListener("LoadComplete", this.onProtoLoaderComplete);
                    this.m_processStep++;
                    break;
                case 1:
                    NetworkManager.getInstance().init();
                    NetworkManager.getInstance().connect();
                    NetworkManager.getInstance().addEventListener("connect", this.onConnected);
                    this.m_processStep++;
                    break;
                case 2:
                    this.sendTempleMsg();
                    NetworkManager.getInstance().registerCMD(1, this.handleMsg1);
                    NetworkManager.getInstance().registerCMD(1, this.handleMsg2);
                    this.m_processStep++;
                    break;
            }
        };
        GameMain.prototype.handleMsg1 = function (message) {
            var pb = ProtoLoader.getInstance().getPbObject("ChatInfo");
            var aaa = pb.decode(message);
            console.log("handleMsg1: " + aaa.playerName);
        };
        GameMain.prototype.handleMsg2 = function (message) {
            var pb = ProtoLoader.getInstance().getPbObject("ChatInfo");
            var aaa = pb.decode(message);
            console.log("handleMsg2: " + aaa.playerName);
        };
        GameMain.prototype.onProtoLoaderComplete = function (evt) {
            if (evt.getType() == "LoadComplete") {
                console.log("onProtoLoaderComplete");
                ProtoLoader.getInstance().removeEventListener("LoadComplete", game.onProtoLoaderComplete);
                game.process();
            }
        };
        GameMain.prototype.onConnected = function (evt) {
            if (evt.getType() == "connect") {
                console.log("onConnected");
                game.process();
            }
        };
        GameMain.prototype.sendTempleMsg = function () {
            var pb = ProtoLoader.getInstance().getPbObject("ChatInfo");
            //console.log(pb);
            //tmpcode
            var message = pb.create({
                playerName: "AwesomeString"
            });
            var errMsg = pb.verify(message);
            if (errMsg)
                throw Error(errMsg);
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            game.buffer = pb.encode(message).finish();
            NetworkManager.getInstance().sendMessage(1, game.buffer);
        };
        return GameMain;
    }());
    var game = new GameMain();
})(laya || (laya = {}));
//# sourceMappingURL=LayaSample.js.map