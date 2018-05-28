import { DeviceInterface } from "./DeviceInterface";

export class Device{
DeviceId:Number ;
HostName:String="";
LoopBack:string="";
DeviceInterfaces:Array<DeviceInterface>=new Array();
}