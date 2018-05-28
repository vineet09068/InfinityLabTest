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
var GridComponent = (function () {
    function GridComponent() {
        this.gridColumns = new Array();
        this.girdData = new Array();
        this.shouldView = false;
        this.selected = new core_1.EventEmitter();
    }
    Object.defineProperty(GridComponent.prototype, "setGridColums", {
        set: function (_gridColumns) {
            this.gridColumns = _gridColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "setPeginationId", {
        set: function (_peginationId) {
            this.peginationId = _peginationId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "setShouldView", {
        set: function (_shouldView) {
            this.shouldView = _shouldView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "setGridDataSet", {
        set: function (_gridData) {
            if (_gridData !== null)
                this.girdData = _gridData.map(function (data, index) { return Object.assign({}, data, data["SR NO"] = index + 1); });
        },
        enumerable: true,
        configurable: true
    });
    GridComponent.prototype.SelectedRow = function (_selected) {
        _selected["action"] = "select";
        this.selected.emit(_selected);
    };
    GridComponent.prototype.DeleteRow = function (_selected) {
        _selected["action"] = "delete";
        this.selected.emit(_selected);
    };
    GridComponent.prototype.ViewRow = function (_selected) {
        _selected["action"] = "view";
        this.selected.emit(_selected);
    };
    return GridComponent;
}());
__decorate([
    core_1.Input("grid-columns"),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], GridComponent.prototype, "setGridColums", null);
__decorate([
    core_1.Input("pegination-id"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], GridComponent.prototype, "setPeginationId", null);
__decorate([
    core_1.Input("ViewButton"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], GridComponent.prototype, "setShouldView", null);
__decorate([
    core_1.Input("grid-data"),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], GridComponent.prototype, "setGridDataSet", null);
__decorate([
    core_1.Output("grid-selected"),
    __metadata("design:type", core_1.EventEmitter)
], GridComponent.prototype, "selected", void 0);
GridComponent = __decorate([
    core_1.Component({
        selector: "grid-ui",
        templateUrl: "../UI/Grid.html"
    })
], GridComponent);
exports.GridComponent = GridComponent;
//# sourceMappingURL=GridComponent.js.map