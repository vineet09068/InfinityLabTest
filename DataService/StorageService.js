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
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var StorageService = (function () {
    function StorageService() {
        if (localStorage.getItem("deviceId") == null)
            localStorage.setItem("deviceId", "0");
    }
    StorageService.prototype.getInterfaces = function () {
        if (localStorage) {
            var interfaces = localStorage.getItem("interfaces");
            return Rx_1.Observable.of(interfaces);
        }
        else {
            return Rx_1.Observable.of('Local storage is not supported on your browser');
        }
    };
    StorageService.prototype.getDeviceId = function () {
        if (localStorage) {
            return localStorage.getItem("deviceId");
        }
        else {
            return 'Local storage is not supported on your browser';
        }
    };
    StorageService.prototype.getInterfaceDeviceId = function () {
        if (localStorage) {
            return localStorage.getItem("deviceInterfaceId" + localStorage.getItem("selectDeviceId"));
        }
        else {
            return 'Local storage is not supported on your browser';
        }
    };
    StorageService.prototype.getDevices = function () {
        if (localStorage) {
            var devices = localStorage.getItem("devices");
            return Rx_1.Observable.of(devices);
        }
        else {
            return Rx_1.Observable.of('Local storage is not supported on your browser');
        }
    };
    StorageService.prototype.UpdateInterfaces = function (interfaces, deviceID) {
        if (localStorage) {
            //localStorage.setItem("deviceId",(parseInt(localStorage.getItem("deviceId"))+1).toString())
            localStorage.setItem("interfaces", interfaces);
            localStorage.setItem("selectDeviceId", deviceID);
        }
    };
    StorageService.prototype.UpdateDevice = function (devices) {
        if (localStorage) {
            //localStorage.setItem("deviceId",(parseInt(localStorage.getItem("deviceId"))+1).toString())
            localStorage.setItem("devices", devices);
        }
    };
    StorageService.prototype.addDeviceInterface = function (interfaces, action) {
        if (localStorage) {
            if (action != "removed") {
                var deviceInterfaceID = (parseInt(this.getInterfaceDeviceId()) + 1).toString();
                var deviceID = localStorage.getItem("selectDeviceId");
                localStorage.setItem("deviceInterfaceId" + deviceID, deviceInterfaceID);
            }
            localStorage.setItem("interfaces", interfaces);
            return Rx_1.Observable.of('Succesfully ' + action);
        }
        else {
            return Rx_1.Observable.of('Local storage is not supported on your browser');
        }
    };
    StorageService.prototype.addDevice = function (devices, action) {
        if (localStorage) {
            var deviceID = (parseInt(localStorage.getItem("deviceId")) + 1).toString();
            localStorage.setItem("deviceId", deviceID);
            var deviceInterfaceID = (parseInt(localStorage.getItem("deviceInterfaceId" + deviceID))).toString();
            console.log(deviceInterfaceID);
            if (isNaN(parseInt(deviceInterfaceID))) {
                console.log("set");
                deviceInterfaceID = "0";
            }
            localStorage.setItem("deviceInterfaceId" + deviceID, deviceInterfaceID);
            localStorage.setItem("devices", devices);
            return Rx_1.Observable.of('Succesfully ' + action);
        }
        else {
            return Rx_1.Observable.of('Local storage is not supported on your browser');
        }
    };
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=StorageService.js.map