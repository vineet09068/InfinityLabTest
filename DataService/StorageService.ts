import {Injectable} from "@angular/core";
import{Observable} from "rxjs/Rx";
import { Device } from "../Model/Device";
import {of} from "rxjs/observable/of";

@Injectable()
export class StorageService {
  constructor(){
    if(localStorage.getItem("deviceId")==null)
        localStorage.setItem("deviceId","0");

  }
  getInterfaces():Observable<string>
  {
   if(localStorage){
      var  interfaces:string=localStorage.getItem("interfaces")
      return Observable.of(interfaces);
     }else{
       return Observable.of('Local storage is not supported on your browser');
  }
  }
  getDeviceId():string
  {
   if(localStorage){
       return localStorage.getItem("deviceId");
     }else{
       return 'Local storage is not supported on your browser';
  }
  }
  getInterfaceDeviceId():string
  {
   if(localStorage){
       return localStorage.getItem("deviceInterfaceId"+localStorage.getItem("selectDeviceId"));
     }else{
       return 'Local storage is not supported on your browser';
  }
  }
   getDevices():Observable<string>
   {
    if(localStorage){
       var  devices:string=localStorage.getItem("devices")
       return Observable.of(devices);
      }else{
        return Observable.of('Local storage is not supported on your browser');
   }
   }
   UpdateInterfaces(interfaces:string,deviceID:string):void
   {
     if(localStorage){
       //localStorage.setItem("deviceId",(parseInt(localStorage.getItem("deviceId"))+1).toString())
       localStorage.setItem("interfaces",interfaces)
       localStorage.setItem("selectDeviceId",deviceID)
     }
    }
    UpdateDevice(devices:string){
      if(localStorage){
        //localStorage.setItem("deviceId",(parseInt(localStorage.getItem("deviceId"))+1).toString())
        localStorage.setItem("devices",devices);
      }

    }
    addDeviceInterface(interfaces:string,action:string):Observable<string>
    {
      if(localStorage){
        if(action!="removed"){
          var deviceInterfaceID=(parseInt(this.getInterfaceDeviceId())+1).toString();
          var deviceID=  localStorage.getItem("selectDeviceId") ;
          localStorage.setItem("deviceInterfaceId"+deviceID,deviceInterfaceID);
        }
        localStorage.setItem("interfaces",interfaces)
      return Observable.of('Succesfully '+ action);
 }else{
      return Observable.of('Local storage is not supported on your browser');
 }
       
   }

   addDevice(devices:string,action:string):Observable<string>
   {
     if(localStorage){
       var deviceID=(parseInt(localStorage.getItem("deviceId"))+1).toString();
       localStorage.setItem("deviceId",deviceID)
       var deviceInterfaceID=(parseInt(localStorage.getItem("deviceInterfaceId"+deviceID))).toString();
       console.log(deviceInterfaceID);
       if(isNaN(parseInt(deviceInterfaceID))){
         console.log("set");
        deviceInterfaceID="0";
       }
       localStorage.setItem("deviceInterfaceId"+deviceID,deviceInterfaceID);
       localStorage.setItem("devices",devices)
     return Observable.of('Succesfully '+ action);
}else{
     return Observable.of('Local storage is not supported on your browser');
}
      
  }

  }
  

