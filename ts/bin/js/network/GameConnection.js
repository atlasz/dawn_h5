var dawn;
(function (dawn) {
    var Socket = Laya.Socket;
    var LayaEvent = Laya.Event;
    var Byte = Laya.Byte;
    var GameConnection = (function () {
        function GameConnection() {
            this.evtDispatcher = new dawn.EventDispatcher();
            this.m_connectedEvt = new dawn.Event("connect", null);
            this.m_disconnectedEvt = new dawn.Event("disconnect", null);
            this.m_readBuffer = new Byte();
            this.m_socket = new Socket();
        }
        GameConnection.prototype.init = function () {
            this.m_socket.on(LayaEvent.OPEN, this, this.onSocketOpen);
            this.m_socket.on(LayaEvent.CLOSE, this, this.onSocketClose);
            this.m_socket.on(LayaEvent.MESSAGE, this, this.onMessageReveived);
            this.m_socket.on(LayaEvent.ERROR, this, this.onConnectError);
        };
        GameConnection.prototype.connect = function () {
            this.m_socket.connectByUrl("ws://localhost:8888");
        };
        GameConnection.prototype.onSocketOpen = function () {
            console.log("Connected");
            this.evtDispatcher.dispatchEvent(this.m_connectedEvt);
        };
        GameConnection.prototype.onSocketClose = function () {
            console.log("Socket closed");
            this.evtDispatcher.dispatchEvent(this.m_disconnectedEvt);
        };
        GameConnection.prototype.onMessageReveived = function (message) {
            console.log("Message from server:");
            this.unpack(message);
        };
        GameConnection.prototype.onConnectError = function (e) {
            console.log("error");
        };
        GameConnection.prototype.send = function (data) {
            this.m_socket.send(data);
            //todo 
            //1.m_socket.flush() when buffer is full
            //2.m_socket.flush() when client tick end
            this.m_socket.flush();
        };
        GameConnection.prototype.pack = function (cmd, message) {
            var buf = new Byte();
            buf.writeInt32(cmd);
            buf.writeInt32(message.length);
            buf.writeArrayBuffer(message);
            return buf;
        };
        GameConnection.prototype.unpack = function (message) {
            //console.log(typeof(message));
            this.m_readBuffer.clear();
            this.m_readBuffer.writeUTFBytes(message);
            this.m_readBuffer.pos = 0;
            var msgType = this.m_readBuffer.getInt32();
            console.log(this.m_readBuffer.pos);
            var length = this.m_readBuffer.getInt32();
            console.log(this.m_readBuffer.pos);
            var protobuf = this.m_readBuffer.getUint8Array(this.m_readBuffer.pos, length);
            /*var pb:any = ProtoLoader.getInstance().getPbObject("chat.ChatInfo");
            var aaa:any = pb.decode(protobuf);
            console.log(aaa);*/
            dawn.NetworkManager.getInstance().handleMsg(msgType, protobuf);
        };
        return GameConnection;
    }());
    dawn.GameConnection = GameConnection;
})(dawn || (dawn = {}));
//# sourceMappingURL=GameConnection.js.map