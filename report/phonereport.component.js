"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var card_1 = require("../model/card");
var cards_1 = require("../model/cards");
var phone_report_1 = require("~/model/phone.report");
var PhoneReportComponent = /** @class */ (function () {
    function PhoneReportComponent(routerExtensions, cards) {
        this.routerExtensions = routerExtensions;
        this.cards = cards;
        this.phoneReport = new phone_report_1.PhoneReport();
    }
    PhoneReportComponent.prototype.ngAfterViewInit = function () {
        this.generateReports();
    };
    PhoneReportComponent.prototype.onRefresh = function () {
        this.generateReports();
    };
    PhoneReportComponent.prototype.onClose = function () {
        this.routerExtensions.navigate(["/list"]);
    };
    PhoneReportComponent.prototype.onHelp = function () {
    };
    PhoneReportComponent.prototype.generateReports = function () {
        var _this = this;
        this.phoneReport.clear();
        this.cards.cards.forEach(function (element) {
            //generate phone report
            _this.phoneReport.total += element.totalAmount;
            switch (element.whichPhone) {
                case card_1.Phones.oldest:
                    _this.phoneReport.oldest += element.totalAmount;
                    break;
                case card_1.Phones.middle:
                    _this.phoneReport.middle += element.totalAmount;
                    break;
                case card_1.Phones.newest:
                    _this.phoneReport.newest += element.totalAmount;
                    break;
                case card_1.Phones.s8:
                    _this.phoneReport.s8 += element.totalAmount;
                    break;
                case card_1.Phones.iphone6:
                    _this.phoneReport.iphone6 += element.totalAmount;
                    break;
                case card_1.Phones.iphone7:
                    _this.phoneReport.iphone7 += element.totalAmount;
                    break;
                case card_1.Phones.nubia:
                    _this.phoneReport.nubia += element.totalAmount;
                    break;
                case card_1.Phones.none:
                    break;
                default:
                    break;
            }
        });
        //end of foreach
        this.oldest.nativeElement.text = this.phoneReport.oldest;
        this.middle.nativeElement.text = this.phoneReport.middle;
        this.newest.nativeElement.text = this.phoneReport.newest;
        this.s8.nativeElement.text = this.phoneReport.s8;
        this.iphone6.nativeElement.text = this.phoneReport.iphone6;
        this.iphone7.nativeElement.text = this.phoneReport.iphone7;
        this.nubia.nativeElement.text = this.phoneReport.nubia;
        this.total.nativeElement.text = this.phoneReport.total;
    };
    __decorate([
        core_1.ViewChild("oldest"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "oldest", void 0);
    __decorate([
        core_1.ViewChild("middle"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "middle", void 0);
    __decorate([
        core_1.ViewChild("newest"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "newest", void 0);
    __decorate([
        core_1.ViewChild("s8"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "s8", void 0);
    __decorate([
        core_1.ViewChild("iphone6"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "iphone6", void 0);
    __decorate([
        core_1.ViewChild("iphone7"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "iphone7", void 0);
    __decorate([
        core_1.ViewChild("nubia"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "nubia", void 0);
    __decorate([
        core_1.ViewChild("total"),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneReportComponent.prototype, "total", void 0);
    PhoneReportComponent = __decorate([
        core_1.Component({
            selector: "app-phonereport",
            moduleId: module.id,
            templateUrl: "./phonereport.component.html",
            styleUrls: ["./phonereport.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            cards_1.Cards])
    ], PhoneReportComponent);
    return PhoneReportComponent;
}());
exports.PhoneReportComponent = PhoneReportComponent;
