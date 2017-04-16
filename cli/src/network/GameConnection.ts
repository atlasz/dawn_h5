module dawn
{
    import Socket = Laya.Socket;
    import LayaEvent = Laya.Event;
    import Byte = Laya.Byte;

    export class GameConnection
    {
        private m_socket:Socket;
        public evtDispatcher:EventDispatcher = new EventDispatcher();
        private m_connectedEvt:Event= new Event("connect", null);
        private m_disconnectedEvt:Event = new Event("disconnect", null);
        private m_readBuffer:Byte = new Byte();
        private cmd:any;
        private conn:GameConnection;
        constructor()
        {
            this.m_socket = new Socket(); 
            this.conn = this;       
        }

        public init():void
        {
            this.cmd = ProtoLoader.getInstance().getPbObject("Command");   
            this.m_socket.on(LayaEvent.OPEN, this, this.onSocketOpen);
            this.m_socket.on(LayaEvent.CLOSE, this, this.onSocketClose);
            this.m_socket.on(LayaEvent.MESSAGE, this, this.onMessageReveived);
            this.m_socket.on(LayaEvent.ERROR, this, this.onConnectError);
        }

        public connect():void
        {
            this.m_socket.connectByUrl("ws://localhost:8888");
        }

        private onSocketOpen(): void {
            console.log("Connected");          
            this.evtDispatcher.dispatchEvent(this.m_connectedEvt);
        }

        private onSocketClose(): void {
            console.log("Socket closed");
            this.evtDispatcher.dispatchEvent(this.m_disconnectedEvt);
        }

        private onMessageReveived(message: any): void {
            console.log("Message from server length: " + message.length);
            this.unpack(message);
            //this.m_socket.input.clear();
        }

        private onConnectError(e: Event): void {
            console.log("error");
        }

        public send(data:any):void
        {
            this.m_socket.send(data);
            this.m_socket.flush();
        }

        public pack(cmd:number, message:any):Byte
        {
            var buf:Byte = new Byte();
            buf.writeInt32(99);
            buf.writeInt32(NetworkManager.getInstance().userId);
            buf.writeInt32(4 + message.length);
            buf.writeInt32(cmd);
            buf.writeArrayBuffer(message);
            console.log("usrId: " + NetworkManager.getInstance().userId + " msg length: " + message.length
            + " cmd: " + cmd + " message: " + message);
            return buf;
        }

        public unpack(message:any):void
        {
            console.log("unpack: " + typeof(message));
           // console.log("arraybuff: " + message.buffer);
            this.m_readBuffer.clear();
            
           /* this.m_readBuffer.writeUTFBytes(message);
            if(this.m_readBuffer.length < 8)
            {
                console.log("wrong bytes");
                return;
            }*/
            this.m_readBuffer.writeArrayBuffer(message, 0, message.length);
            this.m_readBuffer.pos = 0;

           /* var pb:any = ProtoLoader.getInstance().getPbObject("Command");
            var aaa:any = pb.decode(this.m_readBuffer.getUint8Array(0, this.m_readBuffer.length));
            console.log("cmd: " + aaa.cmd);
            console.log("uid: " + aaa.uid);
            //console.log(typeof(aaa.content));

            var spawnInfo:any = ProtoLoader.getInstance().getPbObject("ObjectSpawn");
            var info:any = spawnInfo.decode(aaa.content);
            console.log("netid:" + info.netId);*/
            var cmdType:number = this.m_readBuffer.getInt32();
            var userId:number = this.m_readBuffer.getInt32();

            switch(cmdType)
            {
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
            this.conn.m_socket.input.clear();             
        }

        private handleMsg(buffer:Byte):void
        {
            console.log("handleMsg");
            while(buffer.pos < buffer.buffer.byteLength)
            {
                var length:number = buffer.getInt32();
                var msgType:number = buffer.getInt32();
                console.log("msgType: " + msgType);
                var protobuf:any = buffer.getUint8Array(buffer.pos, length);
                NetworkManager.getInstance().handleMsg(msgType, protobuf);
            }   
        }

        public doConnStart():void
        {
            var buf:Byte = new Byte();
            buf.writeInt32(this.conn.cmd.CmdType.CONN_CMD_START_REQ);
            var uid:number = NetworkManager.getInstance().userId; 
            buf.writeInt32(uid);
            console.log("doConnStart uid:" + uid);
            this.send(buf.buffer);
        }

        public doConnStop():void
        {
            var buf:Byte = new Byte();
            buf.writeInt32(this.conn.cmd.CmdType.CONN_CMD_STOP_REQ);
            console.log("doConnStop cmd:" + this.conn.cmd.CmdType.CONN_CMD_STOP_REQ);
            var uid:number = NetworkManager.getInstance().userId; 
            buf.writeInt32(uid);
            console.log("doConnStop uid:" + uid);
            this.send(buf.buffer);
        }
    }
}