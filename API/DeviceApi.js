"use strict";
var DeviceApiService = (function () {
    function DeviceApiService() {
    }
    DeviceApiService.prototype.createDb = function () {
        console.log("run");
        var devices = [
            { DeviceId: 1, HostName: "1001", LoopBack: "100.12" },
            { DeviceId: 2, HostName: "1002", LoopBack: "100.1" },
            { DeviceId: 3, HostName: "1003", LoopBack: "100.3" },
            { DeviceId: 4, HostName: "1004", LoopBack: "100.2" }
        ];
        return { devices: devices };
    };
    return DeviceApiService;
}());
exports.DeviceApiService = DeviceApiService;
//# sourceMappingURL=DeviceApi.js.map