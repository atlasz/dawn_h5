var dawn;
(function (dawn) {
    var Browser = Laya.Browser;
    var ProtoLoader = (function () {
        function ProtoLoader() {
            this.m_dicCfgs = new dawn.Dictionary([]);
            this.m_protojs = Browser.window.protobuf;
            this.m_loadEvtDispatcher = new dawn.EventDispatcher();
            if (ProtoLoader.m_instance) {
                throw new Error("Error: Instantiation failed: Use ProtoLoader.getInstance() instead of new.");
            }
            ProtoLoader.m_instance = this;
        }
        ProtoLoader.getInstance = function () {
            return ProtoLoader.m_instance;
        };
        ProtoLoader.prototype.init = function () {
            this.m_protojs.load("data/allinone.proto", this.onPbLoaded);
        };
        ProtoLoader.prototype.addEventListener = function (typeStr, listenerFunc) {
            this.m_loadEvtDispatcher.addEventListener(typeStr, listenerFunc);
        };
        ProtoLoader.prototype.removeEventListener = function (typeStr, listenerFunc) {
            this.m_loadEvtDispatcher.removeEventListener(typeStr, listenerFunc);
        };
        ProtoLoader.prototype.getPbObject = function (type) {
            if (this.m_dicCfgs.containsKey(type)) {
                return this.m_dicCfgs[type];
            }
            else {
                return null;
            }
        };
        ProtoLoader.prototype.onPbLoaded = function (err, root) {
            console.log("onPbLoaded");
            if (err)
                throw err;
            //register all type
            //a way to find all type
            //i don't know whether it's the offical method to get all type ^_^
            root.resolveAll();
            var typeReflection = root.nested.dawnpb._nestedArray;
            for (var idxType = 0; idxType < typeReflection.length; ++idxType) {
                var oneType = typeReflection[idxType];
                ProtoLoader.getInstance().m_dicCfgs.add(oneType.name, oneType);
                console.log(oneType.name, oneType);
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
            var evt = new dawn.Event("LoadComplete", null);
            ProtoLoader.getInstance().m_loadEvtDispatcher.dispatchEvent(evt);
        };
        return ProtoLoader;
    }());
    ProtoLoader.m_instance = new ProtoLoader();
    dawn.ProtoLoader = ProtoLoader;
})(dawn || (dawn = {}));
//# sourceMappingURL=ProtoLoader.js.map