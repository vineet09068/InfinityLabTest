"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var GridComponent_1 = require("../Component/GridComponent");
var DeviceComponent_1 = require("../Component/DeviceComponent");
var DeviceInterfaceComponent_1 = require("../Component/DeviceInterfaceComponent");
var ng2_pagination_1 = require("../ng2-pagination");
var DeviceAppModule = (function () {
    function DeviceAppModule() {
    }
    return DeviceAppModule;
}());
DeviceAppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, ng2_pagination_1.Ng2PaginationModule, forms_1.FormsModule, http_1.HttpModule],
        declarations: [DeviceComponent_1.DeviceComponent, GridComponent_1.GridComponent, DeviceInterfaceComponent_1.DeviceInterfaceComponent],
        bootstrap: [DeviceComponent_1.DeviceComponent]
    })
], DeviceAppModule);
exports.DeviceAppModule = DeviceAppModule;
//# sourceMappingURL=DeviceAppModule.js.map