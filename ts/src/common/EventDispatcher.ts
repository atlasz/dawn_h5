module dawn
{
	export class Event {
		private m_type:string;
		private m_target:any;

		constructor(type:string, targetObj:any) {
			this.m_type = type;
			this.m_target = targetObj;
		}
		
		public getTarget():any {
			return this.m_target;
		}

		public getType():string {
			return this.m_type;
		}
	}

	export class EventDispatcher {
		private m_listeners:any[];
		constructor() {
			this.m_listeners = [];
		}

		public hasEventListener(type:string, listener:Function):Boolean {
			var exists:Boolean = false;
			for (var i = 0; i < this.m_listeners.length; i++) {
				if (this.m_listeners[i].type === type && this.m_listeners[i].listener === listener) {
					exists = true;
				}
			}

			return exists;
		}

		public addEventListener (typeStr:string, listenerFunc:Function):void {
			if (this.hasEventListener(typeStr, listenerFunc)) {
				return;
			}

			this.m_listeners.push({type: typeStr, listener: listenerFunc});
		}

		public removeEventListener (typeStr:string, listenerFunc:Function):void {
			for (var i = 0; i < this.m_listeners.length; i++) {
				if (this.m_listeners[i].type === typeStr && this.m_listeners[i].listener === listenerFunc) {
					this.m_listeners.splice(i, 1);
				}
			}
		}

		public dispatchEvent (evt:Event) {
			for (var i = 0; i < this.m_listeners.length; i++) {
				if (this.m_listeners[i].type === evt.getType()) {
					this.m_listeners[i].listener.call(this, evt);
				}
			}
		}
	}
}
