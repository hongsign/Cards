"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var card_1 = require("../model/card");
var cards_1 = require("../model/cards");
var file_utils_1 = require("../utils/file.utils");
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(routerExtensions, cards) {
        this.routerExtensions = routerExtensions;
        this.cards = cards;
        this.fileUtils = new file_utils_1.FileUtils(cards);
    }
    HistoryComponent.prototype.ngAfterViewInit = function () {
        this.populateHistoryToUI();
    };
    HistoryComponent.prototype.onSave = function () {
        this.populateUIToHistory();
        this.cards.updateFromCurrentCard();
        var cardsStr = JSON.stringify(this.cards.cards);
        console.log("cards json string: " + cardsStr);
        this.fileUtils.write(cardsStr);
        this.routerExtensions.navigate(["/card"]);
    };
    HistoryComponent.prototype.onCancel = function () {
        this.routerExtensions.navigate(["/card"]);
    };
    HistoryComponent.prototype.onTextChangeOfDate = function (num) {
    };
    HistoryComponent.prototype.onTextChangeOfAmount = function (num) {
    };
    HistoryComponent.prototype.onTextChangeOfNotes = function (num) {
    };
    HistoryComponent.prototype.populateHistoryToUI = function () {
        var _this = this;
        var i = 1;
        this.cards.currentCard.history.forEach(function (element) {
            switch (i) {
                case 1:
                    _this.date1.nativeElement.text = element.date;
                    _this.amount1.nativeElement.text = element.amount;
                    _this.notes1.nativeElement.text = element.notes;
                    break;
                case 2:
                    _this.date2.nativeElement.text = element.date;
                    _this.amount2.nativeElement.text = element.amount;
                    _this.notes2.nativeElement.text = element.notes;
                    break;
                case 3:
                    _this.date3.nativeElement.text = element.date;
                    _this.amount3.nativeElement.text = element.amount;
                    _this.notes3.nativeElement.text = element.notes;
                    break;
                case 4:
                    _this.date4.nativeElement.text = element.date;
                    _this.amount4.nativeElement.text = element.amount;
                    _this.notes4.nativeElement.text = element.notes;
                    break;
                case 5:
                    _this.date5.nativeElement.text = element.date;
                    _this.amount5.nativeElement.text = element.amount;
                    _this.notes5.nativeElement.text = element.notes;
                    break;
                case 6:
                    _this.date6.nativeElement.text = element.date;
                    _this.amount6.nativeElement.text = element.amount;
                    _this.notes6.nativeElement.text = element.notes;
                    break;
                case 7:
                    _this.date7.nativeElement.text = element.date;
                    _this.amount7.nativeElement.text = element.amount;
                    _this.notes7.nativeElement.text = element.notes;
                    break;
                case 8:
                    _this.date8.nativeElement.text = element.date;
                    _this.amount8.nativeElement.text = element.amount;
                    _this.notes8.nativeElement.text = element.notes;
                    break;
                case 9:
                    _this.date9.nativeElement.text = element.date;
                    _this.amount9.nativeElement.text = element.amount;
                    _this.notes9.nativeElement.text = element.notes;
                    break;
                case 10:
                    _this.date10.nativeElement.text = element.date;
                    _this.amount10.nativeElement.text = element.amount;
                    _this.notes10.nativeElement.text = element.notes;
                    break;
                case 11:
                    _this.date11.nativeElement.text = element.date;
                    _this.amount11.nativeElement.text = element.amount;
                    _this.notes11.nativeElement.text = element.notes;
                    break;
                default:
                    break;
            }
            i++;
        });
    };
    HistoryComponent.prototype.populateUIToHistory = function () {
        this.cards.currentCard.totalAmount = 0;
        this.cards.currentCard.history = [];
        if (this.date1.nativeElement.text.length > 0) {
            var history_1 = new card_1.CardHistory();
            history_1.date = this.date1.nativeElement.text;
            history_1.amount = +this.amount1.nativeElement.text;
            history_1.notes = this.notes1.nativeElement.text;
            this.cards.currentCard.addHistory(history_1);
        }
        if (this.date2.nativeElement.text.length > 0) {
            var history_2 = new card_1.CardHistory();
            history_2.date = this.date2.nativeElement.text;
            history_2.amount = +this.amount2.nativeElement.text;
            history_2.notes = this.notes2.nativeElement.text;
            this.cards.currentCard.addHistory(history_2);
        }
        if (this.date3.nativeElement.text.length > 0) {
            var history_3 = new card_1.CardHistory();
            history_3.date = this.date3.nativeElement.text;
            history_3.amount = +this.amount3.nativeElement.text;
            history_3.notes = this.notes3.nativeElement.text;
            this.cards.currentCard.addHistory(history_3);
        }
        if (this.date4.nativeElement.text.length > 0) {
            var history_4 = new card_1.CardHistory();
            history_4.date = this.date4.nativeElement.text;
            history_4.amount = +this.amount4.nativeElement.text;
            history_4.notes = this.notes4.nativeElement.text;
            this.cards.currentCard.addHistory(history_4);
        }
        if (this.date5.nativeElement.text.length > 0) {
            var history_5 = new card_1.CardHistory();
            history_5.date = this.date5.nativeElement.text;
            history_5.amount = +this.amount5.nativeElement.text;
            history_5.notes = this.notes5.nativeElement.text;
            this.cards.currentCard.addHistory(history_5);
        }
        if (this.date6.nativeElement.text.length > 0) {
            var history_6 = new card_1.CardHistory();
            history_6.date = this.date6.nativeElement.text;
            history_6.amount = +this.amount6.nativeElement.text;
            history_6.notes = this.notes6.nativeElement.text;
            this.cards.currentCard.addHistory(history_6);
        }
        if (this.date7.nativeElement.text.length > 0) {
            var history_7 = new card_1.CardHistory();
            history_7.date = this.date7.nativeElement.text;
            history_7.amount = +this.amount7.nativeElement.text;
            history_7.notes = this.notes7.nativeElement.text;
            this.cards.currentCard.addHistory(history_7);
        }
        if (this.date8.nativeElement.text.length > 0) {
            var history_8 = new card_1.CardHistory();
            history_8.date = this.date8.nativeElement.text;
            history_8.amount = +this.amount8.nativeElement.text;
            history_8.notes = this.notes8.nativeElement.text;
            this.cards.currentCard.addHistory(history_8);
        }
        if (this.date9.nativeElement.text.length > 0) {
            var history_9 = new card_1.CardHistory();
            history_9.date = this.date9.nativeElement.text;
            history_9.amount = +this.amount9.nativeElement.text;
            history_9.notes = this.notes9.nativeElement.text;
            this.cards.currentCard.addHistory(history_9);
        }
        if (this.date10.nativeElement.text.length > 0) {
            var history_10 = new card_1.CardHistory();
            history_10.date = this.date10.nativeElement.text;
            history_10.amount = +this.amount10.nativeElement.text;
            history_10.notes = this.notes10.nativeElement.text;
            this.cards.currentCard.addHistory(history_10);
        }
        if (this.date11.nativeElement.text.length > 0) {
            var history_11 = new card_1.CardHistory();
            history_11.date = this.date11.nativeElement.text;
            history_11.amount = +this.amount11.nativeElement.text;
            history_11.notes = this.notes11.nativeElement.text;
            this.cards.currentCard.addHistory(history_11);
        }
    };
    __decorate([
        core_1.ViewChild("date1"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date1", void 0);
    __decorate([
        core_1.ViewChild("amount1"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount1", void 0);
    __decorate([
        core_1.ViewChild("notes1"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes1", void 0);
    __decorate([
        core_1.ViewChild("date2"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date2", void 0);
    __decorate([
        core_1.ViewChild("amount2"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount2", void 0);
    __decorate([
        core_1.ViewChild("notes2"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes2", void 0);
    __decorate([
        core_1.ViewChild("date3"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date3", void 0);
    __decorate([
        core_1.ViewChild("amount3"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount3", void 0);
    __decorate([
        core_1.ViewChild("notes3"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes3", void 0);
    __decorate([
        core_1.ViewChild("date4"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date4", void 0);
    __decorate([
        core_1.ViewChild("amount4"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount4", void 0);
    __decorate([
        core_1.ViewChild("notes4"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes4", void 0);
    __decorate([
        core_1.ViewChild("date5"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date5", void 0);
    __decorate([
        core_1.ViewChild("amount5"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount5", void 0);
    __decorate([
        core_1.ViewChild("notes5"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes5", void 0);
    __decorate([
        core_1.ViewChild("date6"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date6", void 0);
    __decorate([
        core_1.ViewChild("amount6"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount6", void 0);
    __decorate([
        core_1.ViewChild("notes6"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes6", void 0);
    __decorate([
        core_1.ViewChild("date7"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date7", void 0);
    __decorate([
        core_1.ViewChild("amount7"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount7", void 0);
    __decorate([
        core_1.ViewChild("notes7"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes7", void 0);
    __decorate([
        core_1.ViewChild("date8"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date8", void 0);
    __decorate([
        core_1.ViewChild("amount8"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount8", void 0);
    __decorate([
        core_1.ViewChild("notes8"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes8", void 0);
    __decorate([
        core_1.ViewChild("date9"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date9", void 0);
    __decorate([
        core_1.ViewChild("amount9"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount9", void 0);
    __decorate([
        core_1.ViewChild("notes9"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes9", void 0);
    __decorate([
        core_1.ViewChild("date10"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date10", void 0);
    __decorate([
        core_1.ViewChild("amount10"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount10", void 0);
    __decorate([
        core_1.ViewChild("notes10"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes10", void 0);
    __decorate([
        core_1.ViewChild("date11"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "date11", void 0);
    __decorate([
        core_1.ViewChild("amount11"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "amount11", void 0);
    __decorate([
        core_1.ViewChild("notes11"),
        __metadata("design:type", core_1.ElementRef)
    ], HistoryComponent.prototype, "notes11", void 0);
    HistoryComponent = __decorate([
        core_1.Component({
            selector: "app-history",
            moduleId: module.id,
            templateUrl: "./history.component.html",
            styleUrls: ["./history.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, cards_1.Cards])
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
