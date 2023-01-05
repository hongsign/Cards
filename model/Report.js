"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Report = /** @class */ (function () {
    function Report() {
        this.total = 0;
        this.registered = 0;
        this.done = 0;
        this.ready = 0;
        this.remove = 0;
        this.spent = 0;
        this.year = 0;
        this.month = 0;
    }
    Report.prototype.clear = function () {
        this.total = 0;
        this.registered = 0;
        this.done = 0;
        this.ready = 0;
        this.remove = 0;
        this.spent = 0;
        this.year = 0;
        this.month = 0;
    };
    return Report;
}());
exports.Report = Report;
