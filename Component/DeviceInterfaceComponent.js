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
var StorageService_1 = require("../DataService/StorageService");
var DeviceInterface_1 = require("../Model/DeviceInterface");
var DeviceInterfaceComponent = (function () {
    function DeviceInterfaceComponent(_storageService) {
        this._storageService = _storageService;
        this.CurrentInterfaces = new core_1.EventEmitter();
        this.ShouldHide = new core_1.EventEmitter();
        this.CurrentDeviceInterface = new DeviceInterface_1.DeviceInterface();
        this.DeviceInterfaces = [];
        this.DeviceInterfaceMessage = "";
        this.DeviceInterfaceColArr = [{ 'colName': 'SR NO' }, { 'colName': 'Interface' }, { 'colName': 'IP' }];
        this.Display();
    }
    DeviceInterfaceComponent.prototype.Success = function (res) {
        this.DeviceInterfaces = JSON.parse(res);
        if (this.DeviceInterfaces === null)
            this.DeviceInterfaces = [];
    };
    ;
    DeviceInterfaceComponent.prototype.Error = function (err) {
        alert(err);
    };
    ;
    DeviceInterfaceComponent.prototype.Success1 = function (res) {
        this.CurrentDeviceInterface = new DeviceInterface_1.DeviceInterface();
        this.DeviceInterfaceMessage = res;
    };
    DeviceInterfaceComponent.prototype.Display = function () {
        var _this = this;
        var obserable = this._storageService.getInterfaces();
        obserable.subscribe(function (res) { return _this.Success(res); }, function (res) { return _this.Error(res); });
    };
    ;
    DeviceInterfaceComponent.prototype.Add = function () {
        var _this = this;
        this.isModify = false;
        this.DeviceInterfaceMessage = "";
        var action = "added";
        var duplicateDeviceInterface = this.DeviceInterfaces
            .filter(function (deviceInterface) { return deviceInterface.Interface === _this.CurrentDeviceInterface.Interface
            && deviceInterface.DeviceInterfaceId !== _this.CurrentDeviceInterface.DeviceInterfaceId; });
        if (duplicateDeviceInterface.length !== 0) {
            this.DeviceInterfaceMessage = "Interface Already exists";
            return;
        }
        duplicateDeviceInterface = this.DeviceInterfaces
            .filter(function (deviceInterface) { return deviceInterface.IP === _this.CurrentDeviceInterface.IP
            && deviceInterface.DeviceInterfaceId !== _this.CurrentDeviceInterface.DeviceInterfaceId; });
        if (duplicateDeviceInterface.length !== 0) {
            this.DeviceInterfaceMessage = "IP Already exists";
            return;
        }
        duplicateDeviceInterface = this.DeviceInterfaces.filter(function (deviceInterface) { return deviceInterface.DeviceInterfaceId === _this.CurrentDeviceInterface.DeviceInterfaceId; });
        if (duplicateDeviceInterface.length !== 0) {
            this.DeviceInterfaces.map(function (deviceInterface) {
                if (deviceInterface.DeviceInterfaceId === _this.CurrentDeviceInterface.DeviceInterfaceId) {
                    deviceInterface.Interface = _this.CurrentDeviceInterface.Interface;
                    deviceInterface.IP = _this.CurrentDeviceInterface.IP;
                    action = "updated";
                }
            });
        }
        else {
            this.CurrentDeviceInterface.DeviceInterfaceId = parseInt(this._storageService.getInterfaceDeviceId());
            this.DeviceInterfaces.push(this.CurrentDeviceInterface);
        }
        this.DeviceInterfaces.forEach(function (v) { delete v["SR NO"]; });
        var obserable = this._storageService.addDeviceInterface(JSON.stringify(this.DeviceInterfaces), action);
        obserable.subscribe(function (res) { return _this.Success1(res); }, function (res) { return _this.Error(res); });
        this.CurrentInterfaces.emit(this.DeviceInterfaces);
        this.Display();
    };
    DeviceInterfaceComponent.prototype.Remove = function (deviceInterfaceId) {
        var _this = this;
        this.isModify = false;
        this.DeviceInterfaces = this.DeviceInterfaces.filter(function (device) { return device.DeviceInterfaceId != deviceInterfaceId; });
        var obserable = this._storageService.addDeviceInterface(JSON.stringify(this.DeviceInterfaces), "removed");
        obserable.subscribe(function (res) { return _this.Success1(res); }, function (res) { return _this.Error(res); });
        this.Display();
        this.DeviceInterfaceMessage = "Deleted successfully";
    };
    DeviceInterfaceComponent.prototype.SelectedRow = function (_selected) {
        this.isModify = false;
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
    };
    DeviceInterfaceComponent.prototype.Hide = function () {
        this.ShouldHide.emit(true);
    };
    return DeviceInterfaceComponent;
}());
__decorate([
    core_1.Output("update-interface"),
    __metadata("design:type", core_1.EventEmitter)
], DeviceInterfaceComponent.prototype, "CurrentInterfaces", void 0);
__decorate([
    core_1.Output("should-Hide"),
    __metadata("design:type", core_1.EventEmitter)
], DeviceInterfaceComponent.prototype, "ShouldHide", void 0);
DeviceInterfaceComponent = __decorate([
    core_1.Component({
        selector: "device-interface-ui",
        templateUrl: "../UI/DeviceInterface.html",
        styles: ['.deviceInterface{position: fixed;top:39px; right: 50px;bottom:60px;left: 540px;z-index: 1000;overflow:overlay;background-color: white;border: solid; padding: 12px;margin:-3px;}']
    }),
    __metadata("design:paramtypes", [StorageService_1.StorageService])
], DeviceInterfaceComponent);
exports.DeviceInterfaceComponent = DeviceInterfaceComponent;
//# sourceMappingURL=DeviceInterfaceComponent.js.map