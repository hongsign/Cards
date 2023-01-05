"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Report_1 = require("./Report");
var Reports = /** @class */ (function () {
    function Reports() {
        this.overall = new Report_1.Report();
        this.yearly = [];
        this.monthly = [];
        this.thisMonth = new Report_1.Report();
    }
    Reports.prototype.clear = function () {
        this.overall.clear();
        this.yearly = [];
        this.monthly = [];
        this.thisMonth.clear();
    };
    return Reports;
}());
exports.Reports = Reports;
