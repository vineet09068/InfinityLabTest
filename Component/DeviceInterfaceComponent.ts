import { Component, Output, EventEmitter } from "@angular/core";
import { StorageService } from "../DataService/StorageService";
import { DeviceInterface } from "../Model/DeviceInterface";

@Component({

    selector: "device-interface-ui",
    templateUrl: "../UI/DeviceInterface.html",
    styles: ['.deviceInterface{position: fixed;top:39px; right: 50px;bottom:60px;left: 540px;z-index: 1000;overflow:overlay;background-color: white;border: solid; padding: 12px;margin:-3px;}']
})

export class DeviceInterfaceComponent {

    CurrentDeviceInterface: DeviceInterface;
    DeviceInterfaces: Array<DeviceInterface>;
    DeviceInterfaceColArr: Array<Object>;
    DeviceInterfaceMessage: string;
    isModify:Boolean;
    constructor(private _storageService: StorageService, ) {
        this.CurrentDeviceInterface = new DeviceInterface();
        this.DeviceInterfaces = [];
        this.DeviceInterfaceMessage = "";
        this.DeviceInterfaceColArr = [{ 'colName': 'SR NO' }, { 'colName': 'Interface' }, { 'colName': 'IP' }];

        this.Display();
    }
    @Output("update-interface")
    CurrentInterfaces: EventEmitter<Array<DeviceInterface>> = new EventEmitter();
    @Output("should-Hide")
    ShouldHide: EventEmitter<Boolean> = new EventEmitter();
    Success(res: string) {    
        this.DeviceInterfaces = JSON.parse(res);
        if (this.DeviceInterfaces === null)
            this.DeviceInterfaces = [];
    };
    Error(err: string) {
        alert(err);
    };
    Success1(res: string) {
        this.CurrentDeviceInterface = new DeviceInterface();
        this.DeviceInterfaceMessage = res;
    }
    Display() {
        let obserable = this._storageService.getInterfaces()
        obserable.subscribe((res: string) => this.Success(res), res => this.Error(res));
    };
    Add() {
        this.isModify=false;
        this.DeviceInterfaceMessage = "";
        var action="added";
        var duplicateDeviceInterface = this.DeviceInterfaces
            .filter(deviceInterface => deviceInterface.Interface === this.CurrentDeviceInterface.Interface
                && deviceInterface.DeviceInterfaceId !== this.CurrentDeviceInterface.DeviceInterfaceId);
        if (duplicateDeviceInterface.length !== 0) {
            this.DeviceInterfaceMessage = "Interface Already exists";
            return;
        }
        duplicateDeviceInterface = this.DeviceInterfaces
            .filter(deviceInterface => deviceInterface.IP === this.CurrentDeviceInterface.IP
                && deviceInterface.DeviceInterfaceId !== this.CurrentDeviceInterface.DeviceInterfaceId);
        if (duplicateDeviceInterface.length !== 0) {
            this.DeviceInterfaceMessage = "IP Already exists";
            return;
        }
        duplicateDeviceInterface = this.DeviceInterfaces.filter(
            deviceInterface => deviceInterface.DeviceInterfaceId === this.CurrentDeviceInterface.DeviceInterfaceId
        );
        if (duplicateDeviceInterface.length !== 0) {
            this.DeviceInterfaces.map(deviceInterface => {
                if (deviceInterface.DeviceInterfaceId === this.CurrentDeviceInterface.DeviceInterfaceId) {
                    deviceInterface.Interface = this.CurrentDeviceInterface.Interface;
                    deviceInterface.IP = this.CurrentDeviceInterface.IP;
                    action="updated";
                }
            });


        } else {

            this.CurrentDeviceInterface.DeviceInterfaceId = parseInt(this._storageService.getInterfaceDeviceId());
            this.DeviceInterfaces.push(this.CurrentDeviceInterface)
        }

        this.DeviceInterfaces.forEach(function (v) { delete v["SR NO"] });

        let obserable = this._storageService.addDeviceInterface(JSON.stringify(this.DeviceInterfaces), action)
        obserable.subscribe((res: string) => this.Success1(res), res => this.Error(res));
        this.CurrentInterfaces.emit(this.DeviceInterfaces);
        this.Display();
        
    }
    Remove(deviceInterfaceId: Number) {
        this.isModify=false;
        this.DeviceInterfaces = this.DeviceInterfaces.filter(device => device.DeviceInterfaceId != deviceInterfaceId);
        let obserable = this._storageService.addDeviceInterface(JSON.stringify(this.DeviceInterfaces), "removed")
        obserable.subscribe((res: string) => this.Success1(res), res => this.Error(res));
        this.Display();
        this.DeviceInterfaceMessage = "Deleted successfully";

    }
    SelectedRow(_selected: Object) {
        this.isModify=false;
        this.DeviceInterfaceMessage = "";
        var action = _selected["action"];
        if (action == "select") {
            this.CurrentDeviceInterface.DeviceInterfaceId = _selected["DeviceInterfaceId"];
            this.CurrentDeviceInterface.Interface = _selected["Interface"];
            this.CurrentDeviceInterface.IP = _selected["IP"];
        }

        if (action == "delete") {
            this.Remove(_selected["DeviceInterfaceId"]);
        }


    }
    Hide() {
        this.ShouldHide.emit(true);
    }

}