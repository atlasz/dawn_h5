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
            this.conn = this;
        }
        GameConnection.prototype.init = function () {
            this.cmd = dawn.ProtoLoader.getInstance().getPbObject("Command");
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
            buf.writeInt32(99);
            buf.writeInt32(dawn.NetworkManager.getInstance().userId);
            buf.writeInt32(message.length);
            buf.writeInt32(cmd);
            buf.writeArrayBuffer(message);
            return buf;
        };
        GameConnection.prototype.unpack = function (message) {
            //console.log(typeof(message));
            this.m_readBuffer.clear();
            this.m_readBuffer.writeUTFBytes(message);
            if (this.m_readBuffer.length < 8) {
                console.log("wrong bytes");
                return;
            }
            this.m_readBuffer.pos = 0;
            var cmdType = this.m_readBuffer.getInt32();
            var userId = this.m_readBuffer.getInt32();
            switch (cmdType) {
                case this.conn.cmd.CmdType.CONN_CMD_START_RSP:
                    console.log("CONN_CMD_START_RSP userId: " + userId);
                    break;
                case this.conn.cmd.CmdType.CONN_CMD_STOP_RSP:
                    console.log("CONN_CMD_STOP_RSP");
                    break;
                case this.conn.cmd.CmdType.CONN_CMD_HEARTBEAT:
                    console.log("CONN_CMD_HEARTBEAT");
                    break;
                default:
                    this.handleMsg(this.m_readBuffer);
                    break;
            }
        };
        GameConnection.prototype.handleMsg = function (buffer) {
            while (buffer.pos < buffer.buffer.byteLength) {
                var length = buffer.getInt32();
                var msgType = buffer.getInt32();
                var protobuf = buffer.getUint8Array(buffer.pos, length);
                dawn.NetworkManager.getInstance().handleMsg(msgType, protobuf);
            }
        };
        GameConnection.prototype.doConnStart = function () {
            var buf = new Byte();
            buf.writeInt32(this.conn.cmd.CmdType.CONN_CMD_START_REQ);
            var uid = dawn.NetworkManager.getInstance().userId;
            buf.writeInt32(uid);
            console.log("doConnStart uid:" + uid);
            this.send(buf.buffer);
        };
        GameConnection.prototype.doConnStop = function () {
            var buf = new Byte();
            buf.writeInt32(this.conn.cmd.CmdType.CONN_CMD_STOP_REQ);
            console.log("doConnStop cmd:" + this.conn.cmd.CmdType.CONN_CMD_STOP_REQ);
            var uid = dawn.NetworkManager.getInstance().userId;
            buf.writeInt32(uid);
            console.log("doConnStop uid:" + uid);
            this.send(buf.buffer);
        };
        return GameConnection;
    }());
    dawn.GameConnection = GameConnection;
})(dawn || (dawn = {}));
//# sourceMappingURL=GameConnection.js.map