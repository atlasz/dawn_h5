var dawn;
(function (dawn) {
    var NetworkManager = (function () {
        function NetworkManager() {
            this.m_conn = new dawn.GameConnection();
            if (NetworkManager.m_instance) {
                throw new Error("Error: Instantiation failed: Use NetworkManager.getInstance() instead of new.");
            }
            NetworkManager.m_instance = this;
        }
        NetworkManager.getInstance = function () {
            return NetworkManager.m_instance;
        };
        return NetworkManager;
    }());
    NetworkManager.m_instance = new NetworkManager();
    dawn.NetworkManager = NetworkManager;
    /*export class NetworkManager
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
    }*/
})(dawn || (dawn = {}));
//# sourceMappingURL=NetworkManager.js.map