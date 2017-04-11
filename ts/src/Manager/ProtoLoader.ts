module dawn
{
    import Browser = Laya.Browser;

    export class ProtoLoader
    {
        private static m_instance:ProtoLoader = new ProtoLoader();
        private m_dicCfgs:Dictionary = new Dictionary([]);
        private m_protojs:any = Browser.window.protobuf;
        private m_loadEvtDispatcher:EventDispatcher = new EventDispatcher();
        
        constructor()
        {
            if(ProtoLoader.m_instance)
            {
                throw new Error("Error: Instantiation failed: Use ProtoLoader.getInstance() instead of new.");
            }
            ProtoLoader.m_instance = this;
        }

        public static getInstance():ProtoLoader
        {
            return ProtoLoader.m_instance;
        }

        public init():void
        {
            this.m_protojs.load("data/chat.proto", this.onPbLoaded);
        }

        public addEventListener(typeStr:string, listenerFunc:Function):void
        {
            this.m_loadEvtDispatcher.addEventListener(typeStr, listenerFunc);
        }

        public removeEventListener(typeStr:string, listenerFunc:Function):void
        {
            this.m_loadEvtDispatcher.removeEventListener(typeStr, listenerFunc);
        }

        public getPbObject(type:string):any
        {
            if(this.m_dicCfgs.containsKey(type))
            {
                return this.m_dicCfgs[type];
            }
            else
            {
                return null;
            }
        }

        private onPbLoaded(err: any, root: any): void {
            console.log("onPbLoaded");
            if (err)
                throw err;
            // Obtain a message type
            var pb: any = root.lookup("chat.ChatInfo");
            ProtoLoader.getInstance().m_dicCfgs.add("chat.ChatInfo", pb);

            var evt:Event = new Event("LoadComplete", null);
            ProtoLoader.getInstance().m_loadEvtDispatcher.dispatchEvent(evt);            
        }
    }
}