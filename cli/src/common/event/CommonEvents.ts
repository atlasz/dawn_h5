module dawn
{
    export class NetworkManagerEvent extends Event
    {
        public static CONNECTED:string = "connected";
        public static DISCONNECTED:string = "disconnected";
        constructor(type:string, targetObj:any){super(type, targetObj);}
    }
}