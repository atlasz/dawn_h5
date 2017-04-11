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
            this.m_protojs.load("data/chat.proto", this.onPbLoaded);
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
            // Obtain a message type
            var pb = root.lookup("chat.ChatInfo");
            ProtoLoader.getInstance().m_dicCfgs.add("chat.ChatInfo", pb);
            var evt = new dawn.Event("LoadComplete", null);
            ProtoLoader.getInstance().m_loadEvtDispatcher.dispatchEvent(evt);
        };
        return ProtoLoader;
    }());
    ProtoLoader.m_instance = new ProtoLoader();
    dawn.ProtoLoader = ProtoLoader;
})(dawn || (dawn = {}));
//# sourceMappingURL=ProtoLoader.js.map