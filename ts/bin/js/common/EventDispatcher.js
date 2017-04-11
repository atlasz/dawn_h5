var dawn;
(function (dawn) {
    var Event = (function () {
        function Event(type, targetObj) {
            this.m_type = type;
            this.m_target = targetObj;
        }
        Event.prototype.getTarget = function () {
            return this.m_target;
        };
        Event.prototype.getType = function () {
            return this.m_type;
        };
        return Event;
    }());
    dawn.Event = Event;
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.m_listeners = [];
        }
        EventDispatcher.prototype.hasEventListener = function (type, listener) {
            var exists = false;
            for (var i = 0; i < this.m_listeners.length; i++) {
                if (this.m_listeners[i].type === type && this.m_listeners[i].listener === listener) {
                    exists = true;
                }
            }
            return exists;
        };
        EventDispatcher.prototype.addEventListener = function (typeStr, listenerFunc) {
            if (this.hasEventListener(typeStr, listenerFunc)) {
                return;
            }
            this.m_listeners.push({ type: typeStr, listener: listenerFunc });
        };
        EventDispatcher.prototype.removeEventListener = function (typeStr, listenerFunc) {
            for (var i = 0; i < this.m_listeners.length; i++) {
                if (this.m_listeners[i].type === typeStr && this.m_listeners[i].listener === listenerFunc) {
                    this.m_listeners.splice(i, 1);
                }
            }
        };
        EventDispatcher.prototype.dispatchEvent = function (evt) {
            for (var i = 0; i < this.m_listeners.length; i++) {
                if (this.m_listeners[i].type === evt.getType()) {
                    this.m_listeners[i].listener.call(this, evt);
                }
            }
        };
        return EventDispatcher;
    }());
    dawn.EventDispatcher = EventDispatcher;
})(dawn || (dawn = {}));
//# sourceMappingURL=EventDispatcher.js.map