module dawn
{
    export class NetworkManager
    {
        private static m_instance:NetworkManager = new NetworkManager();
        
        private m_conn:GameConnection = new GameConnection();
        private m_msgHandler:Dictionary = new Dictionary([]);

        constructor()
        {
            if(NetworkManager.m_instance)
            {
                throw new Error("Error: Instantiation failed: Use NetworkManager.getInstance() instead of new.");
            }
            NetworkManager.m_instance = this;
        }

        public static getInstance():NetworkManager
        {
            return NetworkManager.m_instance;
        }

        public init():void
        {
            this.m_conn.init();
        }

        public connect():void
        {
            this.m_conn.connect();
        }

        public registerCMD(cmd:number, callback:Function):void
        {
            if(this.m_msgHandler.containsKey(cmd))
            {
                this.m_msgHandler[cmd].push(callback);
            }
            else
            {
                this.m_msgHandler.add(cmd, [callback]);
            }
        }

        public unregisterCMD(cmd:number, callback:Function):void
        {
            if(this.m_msgHandler.containsKey(cmd))
            {
                var handlers = this.m_msgHandler[cmd];
                for(var i = 0; i < handlers.length; ++i)
                {
                    if (handlers[i] == callback) 
                    {
                        handlers.splice(i, 1);
                    }
                    else
                    {
                        console.log("callback is not register")
                    }
				}
            }
            else
            {
                console.log("CMD is NOT register");
            }
        }

        public handleMsg(cmd:number, message:any):void
        {
            if(this.m_msgHandler.containsKey(cmd))
            {
                var handlers = this.m_msgHandler[cmd];
                for(var i = 0; i < handlers.length; ++i)
                {
                    try
                    {
                        handlers[i].call(this, message);
                    }
                    catch(e)
                    {
                         console.log(e);
                    }
                }
            }
        }

        public sendMessage(cmd:number, message:any):void
        {
            this.m_conn.send(this.m_conn.pack(cmd, message).buffer);
        }

        public addEventListener(typeStr:string, listenerFunc:Function):void
        {
            this.m_conn.evtDispatcher.addEventListener(typeStr, listenerFunc);
        }

        public removeEventListener(typeStr:string, listenerFunc:Function):void
        {
            this.m_conn.evtDispatcher.removeEventListener(typeStr, listenerFunc);
        }
        
    }
}