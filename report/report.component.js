"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var card_1 = require("../model/card");
var cards_1 = require("../model/cards");
var Report_1 = require("../model/Report");
var Reports_1 = require("../model/Reports");
var sys_utils_1 = require("~/utils/sys.utils");
var ReportComponent = /** @class */ (function () {
    function ReportComponent(routerExtensions, cards) {
        this.routerExtensions = routerExtensions;
        this.cards = cards;
        this.reports = new Reports_1.Reports();
        this.displayReports = [];
    }
    ReportComponent.prototype.ngAfterViewInit = function () {
        this.generateReports();
    };
    ReportComponent.prototype.onRefresh = function () {
        this.generateReports();
    };
    ReportComponent.prototype.onClose = function () {
        this.routerExtensions.navigate(["/list"]);
    };
    ReportComponent.prototype.onHelp = function () {
    };
    ReportComponent.prototype.generateReports = function () {
        var _this = this;
        this.reports.clear();
        this.cards.cards.forEach(function (element) {
            var readyDate = sys_utils_1.SysUtils.getDate(element.readyDate);
            var year = readyDate.getFullYear();
            var month = readyDate.getMonth() + 1;
            var today = new Date();
            var thisYear = today.getFullYear();
            var thisMonth = today.getMonth() + 1;
            _this.putInOverallReport(element.status, element.totalAmount);
            _this.putInYearlyReport(year, element.status, element.totalAmount);
            if (thisYear == year) {
                _this.putInMonthlyReport(thisYear, month, element.status, element.totalAmount);
            }
            _this.reports.thisMonth.year = thisYear;
            _this.reports.thisMonth.month = thisMonth;
            if (year == thisYear && month == thisMonth) {
                _this.putInThisMonthReport(element.status, element.totalAmount);
            }
        });
        //end of foreach
        this.prepareDisplayReport();
    };
    ReportComponent.prototype.putInOverallReport = function (status, amount) {
        this.prepareReport(status, this.reports.overall, amount);
    };
    ReportComponent.prototype.putInYearlyReport = function (year, status, amount) {
        var _this = this;
        if (isNaN(year)) {
            return;
        }
        var yearInReport = false;
        this.reports.yearly.forEach(function (report) {
            if (report.year == year) {
                _this.prepareReport(status, report, amount);
                yearInReport = true;
            }
        });
        if (!yearInReport) {
            var report = new Report_1.Report();
            report.year = year;
            this.prepareReport(status, report, amount);
            this.reports.yearly.push(report);
        }
    };
    ReportComponent.prototype.putInMonthlyReport = function (year, month, status, amount) {
        var _this = this;
        var monthInReport = false;
        this.reports.monthly.forEach(function (report) {
            if (report.year == year && report.month == month) {
                _this.prepareReport(status, report, amount);
                monthInReport = true;
            }
        });
        if (!monthInReport) {
            var report = new Report_1.Report();
            report.year = year;
            report.month = month;
            this.prepareReport(status, report, amount);
            this.reports.monthly.push(report);
        }
    };
    ReportComponent.prototype.putInThisMonthReport = function (status, amount) {
        this.prepareReport(status, this.reports.thisMonth, amount);
    };
    ReportComponent.prototype.prepareReport = function (status, report, amount) {
        report.total++;
        if (amount)
            report.spent += amount;
        switch (status) {
            case card_1.CardStatus.registered:
                report.registered++;
                break;
            case card_1.CardStatus.done:
                report.done++;
                break;
            case card_1.CardStatus.ready:
                report.ready++;
                break;
            case card_1.CardStatus.remove:
                report.remove++;
                break;
        }
    };
    ReportComponent.prototype.prepareDisplayReport = function () {
        var _this = this;
        this.displayReports = [];
        this.displayReports.push(this.reports.thisMonth);
        this.displayReports.push(this.reports.overall);
        this.reports.monthly.forEach(function (report) {
            _this.displayReports.push(report);
        });
        this.reports.yearly.forEach(function (report) {
            _this.displayReports.push(report);
        });
    };
    ReportComponent = __decorate([
        core_1.Component({
            selector: "app-report",
            moduleId: module.id,
            templateUrl: "./report.component.html",
            styleUrls: ["./report.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            cards_1.Cards])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
