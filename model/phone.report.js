"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhoneReport = /** @class */ (function () {
    function PhoneReport() {
        this.total = 0;
        this.oldest = 0;
        this.middle = 0;
        this.newest = 0;
        this.s8 = 0;
        this.iphone6 = 0;
        this.iphone7 = 0;
        this.nubia = 0;
    }
    PhoneReport.prototype.clear = function () {
        this.total = 0;
        this.oldest = 0;
        this.middle = 0;
        this.newest = 0;
        this.s8 = 0;
        this.iphone6 = 0;
        this.iphone7 = 0;
        this.nubia = 0;
    };
    return PhoneReport;
}());
exports.PhoneReport = PhoneReport;
