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

        constructor()
        {
            this.m_socket = new Socket();            
        }

        public init():void
        {
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
            console.log("Message from server:");
            this.unpack(message);
        }

        private onConnectError(e: Event): void {
            console.log("error");
        }

        public send(data:any):void
        {
            this.m_socket.send(data);
            //todo 
            //1.m_socket.flush() when buffer is full
            //2.m_socket.flush() when client tick end
            this.m_socket.flush();
        }

        public pack(cmd:number, message:any):Byte
        {
            var buf:Byte = new Byte();
            buf.writeInt32(cmd);
            buf.writeInt32(message.length);
            buf.writeArrayBuffer(message);
            return buf;
        }

        public unpack(message:any):void
        {
            //console.log(typeof(message));
            this.m_readBuffer.clear();
            this.m_readBuffer.writeUTFBytes(message);
            this.m_readBuffer.pos = 0;

            var msgType:number = this.m_readBuffer.getInt32();
            console.log(this.m_readBuffer.pos);
            var length:number = this.m_readBuffer.getInt32();
            console.log(this.m_readBuffer.pos);
            var protobuf:any = this.m_readBuffer.getUint8Array(this.m_readBuffer.pos, length);
            /*var pb:any = ProtoLoader.getInstance().getPbObject("chat.ChatInfo");
            var aaa:any = pb.decode(protobuf);
            console.log(aaa);*/
            NetworkManager.getInstance().handleMsg(msgType, protobuf);
        }
    }
}