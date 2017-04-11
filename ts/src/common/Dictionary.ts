module dawn
{
    export class Dictionary {

        private m_keys: any[] = [];
        private m_values: any[] = [];

        constructor(init: { key: string; value: any; }[]) {

            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this.m_keys.push(init[x].key);
                this.m_values.push(init[x].value);
            }
        }

        public add(key: any, value: any) {
            this[key] = value;
            this.m_keys.push(key);
            this.m_values.push(value);
        }

        public remove(key: any) {
            var index = this.m_keys.indexOf(key, 0);
            this.m_keys.splice(index, 1);
            this.m_values.splice(index, 1);

            delete this[key];
        }

        public keys(): any[] {
            return this.m_keys;
        }

        public values(): any[] {
            return this.m_values;
        }

        public containsKey(key: any) {
            if (typeof this[key] === "undefined") {
                return false;
            }

            return true;
        }
    }
}