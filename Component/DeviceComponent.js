"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Device_1 = require("../Model/Device");
var core_1 = require("@angular/core");
var StorageService_1 = require("../DataService/StorageService");
var DeviceComponent = (function () {
    function DeviceComponent(_storageService) {
        this._storageService = _storageService;
        this.CurrentDevice = new Device_1.Device();
        this.Devices = [];
        this.DeviceColArr = [{ 'colName': 'SR NO' }, { 'colName': 'HostName' }, { 'colName': 'LoopBack' }];
        this.DeviceMessage = "";
        this.Display();
        this.interfaceShow = false;
        this.deviceClass = "enable";
    }
    DeviceComponent.prototype.Success = function (res) {
        this.Devices = JSON.parse(res);
        if (this.Devices === null)
            this.Devices = [];
    };
    ;
    DeviceComponent.prototype.Error = function (err) {
        alert(err);
        // console.debug(err.json());
    };
    ;
    DeviceComponent.prototype.Success1 = function (res) {
        this.CurrentDevice = new Device_1.Device();
        this.DeviceMessage = res;
    };
    DeviceComponent.prototype.Display = function () {
        var _this = this;
        var obserable = this._storageService.getDevices();
        obserable.subscribe(function (res) { return _this.Success(res); }, function (res) { return _this.Error(res); });
    };
    ;
    DeviceComponent.prototype.Add = function () {
        var _this = this;
        this.DeviceMessage = "";
        this.isModify = false;
        var action = "Added";
        var duplicatedevice = this.Devices.filter(function (device) { return device.HostName === _this.CurrentDevice.HostName && device.DeviceId !== _this.CurrentDevice.DeviceId; });
        console.log(duplicatedevice);
        if (duplicatedevice.length !== 0) {
            this.DeviceMessage = "HostName Already exists";
            return;
        }
        duplicatedevice = this.Devices.filter(function (device) { return device.LoopBack === _this.CurrentDevice.LoopBack && device.DeviceId !== _this.CurrentDevice.DeviceId; });
        if (duplicatedevice.length !== 0) {
            this.DeviceMessage = "LoopBack Already exists";
            return;
        }
        duplicatedevice = this.Devices.filter(function (device) { return device.DeviceId === _this.CurrentDevice.DeviceId; });
        if (duplicatedevice.length !== 0) {
            this.Devices.map(function (device) {
                if (device.DeviceId === _this.CurrentDevice.DeviceId) {
                    device.HostName = _this.CurrentDevice.HostName;
                    device.LoopBack = _this.CurrentDevice.LoopBack;
                    action = "Updated";
                }
            });
        }
        else {
            this.CurrentDevice.DeviceId = parseInt(this._storageService.getDeviceId());
            this.Devices.push(this.CurrentDevice);
        }
        this.Devices.forEach(function (v) { delete v["SR NO"]; });
        var obserable = this._storageService.addDevice(JSON.stringify(this.Devices), action);
        obserable.subscribe(function (res) { return _this.Success1(res); }, function (res) { return _this.Error(res); });
        this.Display();
    };
    DeviceComponent.prototype.UpdateInterface = function (currentInterfaces) {
        var _this = this;
        console.log("currentInterfaces", currentInterfaces);
        this.Devices.forEach(function (Device) {
            console.log("Device.DeviceId:", Device.DeviceId, "this.CurrentDevice.DeviceId", _this.CurrentDevice.DeviceId);
            if (Device.DeviceId == _this.CurrentDevice.DeviceId) {
                Device.DeviceInterfaces = currentInterfaces;
            }
        });
        console.log("devices", this.Devices);
        this._storageService.UpdateDevice(JSON.stringify(this.Devices));
    };
    DeviceComponent.prototype.ViewInterfaces = function (deviceID) {
        var deviceArr = this.Devices.filter(function (device) { return device.DeviceId == deviceID; });
        if (deviceArr != null)
            this._storageService.UpdateInterfaces(JSON.stringify(deviceArr[0].DeviceInterfaces), deviceID.toString());
    };
    ;
    DeviceComponent.prototype.Remove = function (deviceId) {
        var _this = this;
        this.isModify = false;
        this.Devices = this.Devices.filter(function (device) { return device.DeviceId != deviceId; });
        var obserable = this._storageService.addDevice(JSON.stringify(this.Devices), "removed");
        obserable.subscribe(function (res) { return _this.Success1(res); }, function (res) { return _this.Error(res); });
        this.Display();
        this.DeviceMessage = "Deleted successfully";
    };
    DeviceComponent.prototype.SelectedRow = function (_selected) {
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
            this.deviceClass = "disable";
            this.ViewInterfaces(_selected["DeviceId"]);
        }
    };
    DeviceComponent.prototype.Hide = function (_hide) {
        console.log("component hide called", _hide);
        this.interfaceShow = !_hide;
        this.deviceClass = "enable";
    };
    return DeviceComponent;
}());
DeviceComponent = __decorate([
    core_1.Component({
        selector: "device-ui",
        templateUrl: "../UI/Device.html",
        providers: [StorageService_1.StorageService],
        styles: ['.enable{pointer-events:auto; margin-left:30px;margin-top:20px;} .disable{pointer-events:none; margin-left:30px;margin-top:20px;}']
    }),
    __metadata("design:paramtypes", [StorageService_1.StorageService])
], DeviceComponent);
exports.DeviceComponent = DeviceComponent;
//# sourceMappingURL=DeviceComponent.js.map