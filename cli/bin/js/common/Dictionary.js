var dawn;
(function (dawn) {
    var Dictionary = (function () {
        function Dictionary(init) {
            this.m_keys = [];
            this.m_values = [];
            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this.m_keys.push(init[x].key);
                this.m_values.push(init[x].value);
            }
        }
        Dictionary.prototype.add = function (key, value) {
            this[key] = value;
            this.m_keys.push(key);
            this.m_values.push(value);
        };
        Dictionary.prototype.remove = function (key) {
            var index = this.m_keys.indexOf(key, 0);
            this.m_keys.splice(index, 1);
            this.m_values.splice(index, 1);
            delete this[key];
        };
        Dictionary.prototype.keys = function () {
            return this.m_keys;
        };
        Dictionary.prototype.values = function () {
            return this.m_values;
        };
        Dictionary.prototype.containsKey = function (key) {
            if (typeof this[key] === "undefined") {
                return false;
            }
            return true;
        };
        return Dictionary;
    }());
    dawn.Dictionary = Dictionary;
})(dawn || (dawn = {}));
//# sourceMappingURL=Dictionary.js.map