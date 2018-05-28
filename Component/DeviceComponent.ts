import { Device } from '../Model/Device'
import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { StorageService } from "../DataService/StorageService"
import { DeviceInterface } from '../Model/DeviceInterface';
@Component(
    {
        selector: "device-ui",
        templateUrl: "../UI/Device.html",
        providers: [StorageService],
        styles:['.enable{pointer-events:auto; margin-left:30px;margin-top:20px;} .disable{pointer-events:none; margin-left:30px;margin-top:20px;}']
    }
)
export class DeviceComponent {
    CurrentDevice: Device;
    Devices: Array<Device>;
    DeviceColArr: Array<Object>;
    DeviceMessage: string;
    interfaceShow: Boolean;
    isModify: Boolean;
    deviceClass:String;
    constructor(private _storageService: StorageService) {
        this.CurrentDevice = new Device();
        this.Devices = [];
        this.DeviceColArr = [{ 'colName': 'SR NO' }, { 'colName': 'HostName' }, { 'colName': 'LoopBack' }];
        this.DeviceMessage = "";
        this.Display();
        this.interfaceShow = false;
        this.deviceClass="enable";
    }
    Success(res: string) {

        this.Devices = JSON.parse(res);
        if (this.Devices === null)
            this.Devices = [];
    };
    Error(err: Response) {
        alert(err);
        // console.debug(err.json());
    };
    Success1(res: string) {
        this.CurrentDevice = new Device();
        this.DeviceMessage = res;
    }
    Display() {
        let obserable = this._storageService.getDevices()
        obserable.subscribe((res: string) => this.Success(res), res => this.Error(res));
    };

    Add() {
        this.DeviceMessage = "";
        this.isModify = false;
        var action = "Added";
        var duplicatedevice = this.Devices.filter(device => device.HostName === this.CurrentDevice.HostName && device.DeviceId !== this.CurrentDevice.DeviceId);
        console.log(duplicatedevice);
        if (duplicatedevice.length !== 0) {
            this.DeviceMessage = "HostName Already exists";

            return;
        }
        duplicatedevice = this.Devices.filter(device => device.LoopBack === this.CurrentDevice.LoopBack && device.DeviceId !== this.CurrentDevice.DeviceId);
        if (duplicatedevice.length !== 0) {
            this.DeviceMessage = "LoopBack Already exists"

            return;
        }
        duplicatedevice = this.Devices.filter(device => device.DeviceId === this.CurrentDevice.DeviceId);
        if (duplicatedevice.length !== 0) {
            this.Devices.map(device => {
                if (device.DeviceId === this.CurrentDevice.DeviceId) {
                    device.HostName = this.CurrentDevice.HostName;
                    device.LoopBack = this.CurrentDevice.LoopBack;
                    action = "Updated";
                }
            });


        } else {

            this.CurrentDevice.DeviceId = parseInt(this._storageService.getDeviceId());
            this.Devices.push(this.CurrentDevice)
        }

        this.Devices.forEach(function (v) { delete v["SR NO"] });
        let obserable = this._storageService.addDevice(JSON.stringify(this.Devices), action)
        obserable.subscribe((res: string) => this.Success1(res), res => this.Error(res));
        this.Display();

    }

    UpdateInterface(currentInterfaces: Array<DeviceInterface>) {

        console.log("currentInterfaces", currentInterfaces);
        this.Devices.forEach(Device => {
            console.log("Device.DeviceId:", Device.DeviceId, "this.CurrentDevice.DeviceId", this.CurrentDevice.DeviceId);
            if (Device.DeviceId == this.CurrentDevice.DeviceId) {
                Device.DeviceInterfaces = currentInterfaces
            }
        });
        console.log("devices", this.Devices);
        this._storageService.UpdateDevice(JSON.stringify(this.Devices))

    }

    ViewInterfaces(deviceID: Number) {
        var deviceArr = this.Devices.filter(device => device.DeviceId == deviceID)
        if (deviceArr != null)
            this._storageService.UpdateInterfaces(JSON.stringify(deviceArr[0].DeviceInterfaces), deviceID.toString())
    };
    Remove(deviceId: Number) {
        this.isModify=false;
        this.Devices = this.Devices.filter(device => device.DeviceId != deviceId);
        let obserable = this._storageService.addDevice(JSON.stringify(this.Devices), "removed")
        obserable.subscribe((res: string) => this.Success1(res), res => this.Error(res));
        this.Display();
        this.DeviceMessage = "Deleted successfully";
    }
    SelectedRow(_selected: Object) {
        this.isModify = false;
        this.DeviceMessage = "";
        var action = _selected["action"];
        if (action == "select") {

            this.CurrentDevice.DeviceId = _selected["DeviceId"];
            this.CurrentDevice.HostName = _selected["HostName"];
            this.CurrentDevice.LoopBack = _selected["LoopBack"];
        }

        if (action == "delete") {

            this.Remove(_selected["DeviceId"]);
        }


        if (action == "view") {
            this.CurrentDevice.DeviceId = _selected["DeviceId"];
            this.CurrentDevice.HostName = _selected["HostName"];
            this.CurrentDevice.LoopBack = _selected["LoopBack"];
            this.interfaceShow = true;
            this.deviceClass="disable";
            this.ViewInterfaces(_selected["DeviceId"]);
        }

    }
    Hide(_hide: Boolean) {
        console.log("component hide called", _hide);
        this.interfaceShow = !_hide;
        this.deviceClass="enable";

    }

}