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
            this.m_protojs.load("data/allinone.proto", this.onPbLoaded);
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
            //register all type
            //a way to find all type
            //i don't know whether it's the offical method to get all type ^_^
            root.resolveAll();
            var typeReflection:any = root.nested.dawnpb._nestedArray;
            for(var idxType = 0; idxType < typeReflection.length; ++idxType)
            {
                var oneType = typeReflection[idxType];
                ProtoLoader.getInstance().m_dicCfgs.add(oneType.name, oneType);
            }

            //test the nested construct
            /*
            var vec2:any = ProtoLoader.getInstance().m_dicCfgs["PBVector2"];
            var message: any = vec2.create(
            {
                x: 1.5,
                y: 2.5
            });
            console.log(message);
            var moveMsg:any = ProtoLoader.getInstance().m_dicCfgs["MoveMsg"];
            var move:any = moveMsg.create(
                {
                    position:message,
                    speed:2.5,
                    direction:vec2.create({x:-1,y:1})
                }
            )
            console.log(move.direction);
            var cmd:any = ProtoLoader.getInstance().m_dicCfgs["Command"];
            console.log(cmd.CmdType.CONN_CMD_START_REQ);*/
            
            var evt:Event = new Event("LoadComplete", null);
            ProtoLoader.getInstance().m_loadEvtDispatcher.dispatchEvent(evt);            
        }
    }
}