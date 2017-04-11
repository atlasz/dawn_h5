var dawn;
(function (dawn) {
    var NetworkManager = (function () {
        function NetworkManager() {
            this.m_conn = new dawn.GameConnection();
            this.m_msgHandler = new dawn.Dictionary([]);
            if (NetworkManager.m_instance) {
                throw new Error("Error: Instantiation failed: Use NetworkManager.getInstance() instead of new.");
            }
            NetworkManager.m_instance = this;
        }
        NetworkManager.getInstance = function () {
            return NetworkManager.m_instance;
        };
        NetworkManager.prototype.init = function () {
            this.m_conn.init();
        };
        NetworkManager.prototype.connect = function () {
            this.m_conn.connect();
        };
        NetworkManager.prototype.registerCMD = function (cmd, callback) {
            if (this.m_msgHandler.containsKey(cmd)) {
                this.m_msgHandler[cmd].push(callback);
            }
            else {
                this.m_msgHandler.add(cmd, [callback]);
            }
        };
        NetworkManager.prototype.unregisterCMD = function (cmd, callback) {
            if (this.m_msgHandler.containsKey(cmd)) {
                var handlers = this.m_msgHandler[cmd];
                for (var i = 0; i < handlers.length; ++i) {
                    if (handlers[i] == callback) {
                        handlers.splice(i, 1);
                    }
                    else {
                        console.log("callback is not register");
                    }
                }
            }
            else {
                console.log("CMD is NOT register");
            }
        };
        NetworkManager.prototype.handleMsg = function (cmd, message) {
            if (this.m_msgHandler.containsKey(cmd)) {
                var handlers = this.m_msgHandler[cmd];
                for (var i = 0; i < handlers.length; ++i) {
                    try {
                        handlers[i].call(this, message);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        };
        NetworkManager.prototype.sendMessage = function (cmd, message) {
            this.m_conn.send(this.m_conn.pack(cmd, message).buffer);
        };
        NetworkManager.prototype.addEventListener = function (typeStr, listenerFunc) {
            this.m_conn.evtDispatcher.addEventListener(typeStr, listenerFunc);
        };
        NetworkManager.prototype.removeEventListener = function (typeStr, listenerFunc) {
            this.m_conn.evtDispatcher.removeEventListener(typeStr, listenerFunc);
        };
        return NetworkManager;
    }());
    NetworkManager.m_instance = new NetworkManager();
    dawn.NetworkManager = NetworkManager;
})(dawn || (dawn = {}));
//# sourceMappingURL=NetworkManager.js.map