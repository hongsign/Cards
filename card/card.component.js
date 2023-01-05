"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("nativescript-angular/router");
var dialogs = require("tns-core-modules/ui/dialogs");
var card_1 = require("../model/card");
var cards_1 = require("../model/cards");
var file_utils_1 = require("../utils/file.utils");
var sys_utils_1 = require("../utils/sys.utils");
var CardViewState;
(function (CardViewState) {
    CardViewState[CardViewState["viewing"] = 0] = "viewing";
    CardViewState[CardViewState["adding"] = 1] = "adding";
    CardViewState[CardViewState["editing"] = 2] = "editing";
})(CardViewState || (CardViewState = {}));
var CardComponent = /** @class */ (function () {
    function CardComponent(routerExtensions, cards, datePipe) {
        this.routerExtensions = routerExtensions;
        this.cards = cards;
        this.datePipe = datePipe;
        this.VIEW_INPUTDATE = 1;
        this.VIEW_CARD1 = 2;
        this.VIEW_CARD2 = 3;
        this.VIEW_CARD3 = 4;
        this.VIEW_CARD4 = 5;
        this.VIEW_EXPIREYEAR = 6;
        this.VIEW_EXPIREMONTH = 7;
        this.VIEW_CVC = 8;
        this.VIEW_BIRTHDAY = 9;
        this.VIEW_BILLDAY = 10;
        this.VIEW_BILLDUE = 11;
        this.VIEW_HOMEPHONE = 12;
        this.VIEW_READYDATE = 13;
        this.fileUtils = new file_utils_1.FileUtils(cards);
    }
    CardComponent.prototype.ngAfterViewInit = function () {
        if (sys_utils_1.SysUtils.isNonEmptyString(this.cards.currentCard.cardNumber)) {
            //display only with input disabled
            this.toSave.nativeElement.visibility = "collapse";
            this.toEdit.nativeElement.visibility = "visible";
            this.toAddHistory.nativeElement.visibility = "visible";
            this.toCancel.nativeElement.visibility = "visible";
            this.toDelete.nativeElement.visibility = "visible";
            //(<ActionBar>this.cardActionBar.nativeElement).title= "Card Details";
            this.setUserInteraction(false);
            this.populateUIFromCard(this.cards.currentCard);
            this.viewState = CardViewState.viewing;
        }
        else {
            //Adding new card
            this.toSave.nativeElement.visibility = "visible";
            this.toEdit.nativeElement.visibility = "collapse";
            this.toAddHistory.nativeElement.visibility = "collapse";
            this.toCancel.nativeElement.visibility = "visible";
            this.toDelete.nativeElement.visibility = "collapse";
            //(<ActionBar>this.cardActionBar.nativeElement).title = "Add New Card";
            this.setUserInteraction(true);
            this.inputDate.nativeElement.focus();
            this.viewState = CardViewState.adding;
        }
    };
    CardComponent.prototype.onSave = function () {
        var card = this.populateCardFromUI();
        if (this.viewState == CardViewState.adding) {
            card.totalAmount = 0;
            this.cards.insertNewCard(card);
        }
        else if (this.viewState == CardViewState.editing) {
            this.cards.currentCard.copyWithoutHistory(card);
            this.cards.updateFromCurrentCard();
        }
        var cardsStr = JSON.stringify(this.cards.cards);
        //console.log("cards json string: " + cardsStr);
        this.fileUtils.write(cardsStr);
        //console.log(card.cardNumber);
        this.routerExtensions.navigate(["/list"]);
    };
    CardComponent.prototype.onCancel = function () {
        this.routerExtensions.navigate(["/list"]);
    };
    CardComponent.prototype.onEdit = function () {
        this.toEdit.nativeElement.visibility = "collapse";
        this.toAddHistory.nativeElement.visibility = "collapse";
        this.toSave.nativeElement.visibility = "visible";
        this.toCancel.nativeElement.visibility = "visible";
        this.toDelete.nativeElement.visibility = "collapse";
        this.setUserInteraction(true);
        this.viewState = CardViewState.editing;
    };
    CardComponent.prototype.onAddHistory = function () {
        this.routerExtensions.navigate(["/history"]);
    };
    CardComponent.prototype.onTextChangeOfInputDate = function (who) {
        switch (who) {
            case this.VIEW_INPUTDATE:
                if (sys_utils_1.SysUtils.isValidDate(this.inputDate.nativeElement.text)) {
                    var after15days = sys_utils_1.SysUtils.getPastOrFutureDate(sys_utils_1.SysUtils.getDate(this.inputDate.nativeElement.text), 15);
                    //console.log("after15: " + after15days.toDateString());
                    this.validDate.nativeElement.text = this.datePipe.transform(after15days, "yyyy-MM-dd");
                    this.card1.nativeElement.focus();
                }
                break;
            case this.VIEW_CARD1:
                var txt1 = this.card1.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(txt1) && txt1.length == 4) {
                    this.card2.nativeElement.focus();
                }
                break;
            case this.VIEW_CARD2:
                var txt2 = this.card2.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(txt2) && txt2.length == 4) {
                    this.card3.nativeElement.focus();
                }
                break;
            case this.VIEW_CARD3:
                var txt3 = this.card3.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(txt3) && txt3.length == 4) {
                    this.card4.nativeElement.focus();
                }
                break;
            case this.VIEW_CARD4:
                var txt4 = this.card4.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(txt4) && txt4.length == 4) {
                    this.expireYear.nativeElement.focus();
                }
                break;
            case this.VIEW_EXPIREYEAR:
                var year = this.expireYear.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(year) && year.length == 4) {
                    this.expireMonth.nativeElement.focus();
                }
                break;
            case this.VIEW_EXPIREMONTH:
                var month = this.expireMonth.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(month) && month.length == 2) {
                    this.cvc.nativeElement.focus();
                }
                break;
            case this.VIEW_CVC:
                var cvc = this.cvc.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(cvc) && cvc.length == 3) {
                    this.name.nativeElement.focus();
                }
                break;
            case this.VIEW_BIRTHDAY:
                if (sys_utils_1.SysUtils.isValidDate(this.birthday.nativeElement.text)) {
                    this.creditLimit.nativeElement.focus();
                }
                break;
            case this.VIEW_BILLDAY:
                var billday = this.billDay.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(billday) && billday.length == 2) {
                    this.billDue.nativeElement.focus();
                }
                break;
            case this.VIEW_BILLDUE:
                var billdue = this.billDue.nativeElement.text;
                if (sys_utils_1.SysUtils.isNumber(billdue) && billdue.length == 2) {
                    this.email.nativeElement.focus();
                }
                break;
            case this.VIEW_HOMEPHONE:
                if (sys_utils_1.SysUtils.isValidPhoneNumber(this.homePhone.nativeElement.text)) {
                    this.mobilePhone.nativeElement.focus();
                }
                break;
            case this.VIEW_READYDATE:
                if (sys_utils_1.SysUtils.isValidDate(this.readyDate.nativeElement.text)) {
                    this.readyDate.nativeElement.dismissSoftInput();
                }
                break;
            default:
                break;
        }
    };
    CardComponent.prototype.onDelete = function () {
        var _this = this;
        dialogs.confirm("DELETE? DELETE!?").then(function (result) {
            if (result) {
                _this.cards.deleteCurrentCard();
                var cardsStr = JSON.stringify(_this.cards.cards);
                //console.log("cards json string: " + cardsStr);
                _this.fileUtils.write(cardsStr);
                _this.routerExtensions.navigate(["/list"]);
            }
        });
    };
    CardComponent.prototype.cardStatus_registered = function () {
        this.status.nativeElement.text = "registered";
    };
    CardComponent.prototype.cardStatus_ready = function () {
        this.status.nativeElement.text = "ready";
    };
    CardComponent.prototype.cardStatus_done = function () {
        this.status.nativeElement.text = "done";
    };
    CardComponent.prototype.cardStatus_remove = function () {
        this.status.nativeElement.text = "remove";
    };
    CardComponent.prototype.phone_none = function () {
        this.phone.nativeElement.text = "none";
    };
    CardComponent.prototype.phone_oldest = function () {
        this.phone.nativeElement.text = "oldest";
    };
    CardComponent.prototype.phone_middle = function () {
        this.phone.nativeElement.text = "middle";
    };
    CardComponent.prototype.phone_newest = function () {
        this.phone.nativeElement.text = "newest";
    };
    CardComponent.prototype.phone_S8 = function () {
        this.phone.nativeElement.text = "s8";
    };
    CardComponent.prototype.phone_iPhone6 = function () {
        this.phone.nativeElement.text = "iphone6";
    };
    CardComponent.prototype.phone_iPhone7 = function () {
        this.phone.nativeElement.text = "iphone7";
    };
    CardComponent.prototype.phone_nubia = function () {
        this.phone.nativeElement.text = "nubia";
    };
    CardComponent.prototype.populateCardFromUI = function () {
        var card = new card_1.Card();
        card.inputDate = this.inputDate.nativeElement.text;
        card.validDate = this.validDate.nativeElement.text;
        card.cardNumber = this.card1.nativeElement.text
            + this.card2.nativeElement.text
            + this.card3.nativeElement.text
            + this.card4.nativeElement.text;
        card.expireYear = this.expireYear.nativeElement.text;
        card.expireMonth = this.expireMonth.nativeElement.text;
        card.cvc = this.cvc.nativeElement.text;
        card.status = card_1.CardStatus[this.status.nativeElement.text];
        card.name = this.name.nativeElement.text;
        card.birthday = this.birthday.nativeElement.text;
        card.creditLimit = this.creditLimit.nativeElement.text;
        card.address1 = this.address1.nativeElement.text;
        card.address2 = this.address2.nativeElement.text;
        card.city = this.city.nativeElement.text;
        card.province = this.province.nativeElement.text;
        card.postCode = this.postCode.nativeElement.text;
        card.billDay = this.billDay.nativeElement.text;
        card.billDue = this.billDue.nativeElement.text;
        card.isShared = this.isShared.nativeElement.checked;
        card.isAutoPay = this.isAutoPay.nativeElement.checked;
        card.isUSD = this.isUSD.nativeElement.checked;
        card.isLongTerm = this.isLongTerm.nativeElement.checked;
        card.email = this.email.nativeElement.text;
        card.homePhone = this.homePhone.nativeElement.text;
        card.mobilePhone = this.mobilePhone.nativeElement.text;
        card.businessPhone = this.businessPhone.nativeElement.text;
        card.otherPhone = this.otherPhone.nativeElement.text;
        card.password = this.password.nativeElement.text;
        card.challenge1 = this.challenge1.nativeElement.text;
        card.challenge2 = this.challenge2.nativeElement.text;
        card.challenge3 = this.challenge3.nativeElement.text;
        card.notes = this.notes.nativeElement.text;
        card.whichPhone = card_1.Phones[this.phone.nativeElement.text];
        card.readyDate = this.readyDate.nativeElement.text;
        card.history = new Array();
        card.totalAmount = this.amount.nativeElement.text;
        card.setValidTill();
        return card;
    };
    CardComponent.prototype.populateUIFromCard = function (card) {
        this.inputDate.nativeElement.text = card.inputDate;
        this.validDate.nativeElement.text = card.validDate;
        this.card1.nativeElement.text = card.cardNumber.substring(0, 4);
        this.card2.nativeElement.text = card.cardNumber.substring(4, 8);
        this.card3.nativeElement.text = card.cardNumber.substring(8, 12);
        this.card4.nativeElement.text = card.cardNumber.substring(12, 16);
        this.expireYear.nativeElement.text = card.expireYear;
        this.expireMonth.nativeElement.text = card.expireMonth;
        this.cvc.nativeElement.text = card.cvc;
        this.status.nativeElement.text = card_1.CardStatus[card.status];
        this.name.nativeElement.text = card.name;
        this.birthday.nativeElement.text = card.birthday;
        this.creditLimit.nativeElement.text = card.creditLimit;
        this.address1.nativeElement.text = card.address1;
        this.address2.nativeElement.text = card.address2;
        this.city.nativeElement.text = card.city;
        this.province.nativeElement.text = card.province;
        this.postCode.nativeElement.text = card.postCode;
        this.billDay.nativeElement.text = card.billDay;
        this.billDue.nativeElement.text = card.billDue;
        this.isShared.nativeElement.checked = card.isShared;
        this.isAutoPay.nativeElement.checked = card.isAutoPay;
        this.isUSD.nativeElement.checked = card.isUSD;
        this.email.nativeElement.text = card.email;
        this.homePhone.nativeElement.text = card.homePhone;
        this.mobilePhone.nativeElement.text = card.mobilePhone;
        this.businessPhone.nativeElement.text = card.businessPhone;
        this.otherPhone.nativeElement.text = card.otherPhone;
        this.password.nativeElement.text = card.password;
        this.challenge1.nativeElement.text = card.challenge1;
        this.challenge2.nativeElement.text = card.challenge2;
        this.challenge3.nativeElement.text = card.challenge3;
        this.isLongTerm.nativeElement.checked = card.isLongTerm;
        this.notes.nativeElement.text = card.notes;
        this.readyDate.nativeElement.text = card.readyDate;
        this.phone.nativeElement.text = card_1.Phones[card.whichPhone];
        this.amount.nativeElement.text = card.totalAmount;
    };
    CardComponent.prototype.setUserInteraction = function (enabled) {
        this.inputDate.nativeElement.isEnabled = enabled;
        this.validDate.nativeElement.isEnabled = enabled;
        this.card1.nativeElement.isEnabled = enabled;
        this.card2.nativeElement.isEnabled = enabled;
        this.card3.nativeElement.isEnabled = enabled;
        this.card4.nativeElement.isEnabled = enabled;
        this.expireYear.nativeElement.isEnabled = enabled;
        this.expireMonth.nativeElement.isEnabled = enabled;
        this.cvc.nativeElement.isEnabled = enabled;
        this.name.nativeElement.isEnabled = enabled;
        this.birthday.nativeElement.isEnabled = enabled;
        this.creditLimit.nativeElement.isEnabled = enabled;
        this.address1.nativeElement.isEnabled = enabled;
        this.address2.nativeElement.isEnabled = enabled;
        this.city.nativeElement.isEnabled = enabled;
        this.province.nativeElement.isEnabled = enabled;
        this.postCode.nativeElement.isEnabled = enabled;
        this.billDay.nativeElement.isEnabled = enabled;
        this.billDue.nativeElement.isEnabled = enabled;
        this.isShared.nativeElement.isEnabled = enabled;
        this.isAutoPay.nativeElement.isEnabled = enabled;
        this.isUSD.nativeElement.isEnabled = enabled;
        this.email.nativeElement.isEnabled = enabled;
        this.homePhone.nativeElement.isEnabled = enabled;
        this.mobilePhone.nativeElement.isEnabled = enabled;
        this.businessPhone.nativeElement.isEnabled = enabled;
        this.otherPhone.nativeElement.isEnabled = enabled;
        this.password.nativeElement.isEnabled = enabled;
        this.challenge1.nativeElement.isEnabled = enabled;
        this.challenge2.nativeElement.isEnabled = enabled;
        this.challenge3.nativeElement.isEnabled = enabled;
        this.isLongTerm.nativeElement.isEnabled = enabled;
        this.notes.nativeElement.isEnabled = enabled;
        this.readyDate.nativeElement.isEnabled = enabled;
    };
    __decorate([
        core_1.ViewChild("cardActionBar"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "cardActionBar", void 0);
    __decorate([
        core_1.ViewChild("toSave"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "toSave", void 0);
    __decorate([
        core_1.ViewChild("toEdit"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "toEdit", void 0);
    __decorate([
        core_1.ViewChild("toAddHistory"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "toAddHistory", void 0);
    __decorate([
        core_1.ViewChild("toDelete"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "toDelete", void 0);
    __decorate([
        core_1.ViewChild("toCancel"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "toCancel", void 0);
    __decorate([
        core_1.ViewChild("inputDate"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "inputDate", void 0);
    __decorate([
        core_1.ViewChild("validDate"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "validDate", void 0);
    __decorate([
        core_1.ViewChild("card1"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "card1", void 0);
    __decorate([
        core_1.ViewChild("card2"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "card2", void 0);
    __decorate([
        core_1.ViewChild("card3"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "card3", void 0);
    __decorate([
        core_1.ViewChild("card4"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "card4", void 0);
    __decorate([
        core_1.ViewChild("expireYear"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "expireYear", void 0);
    __decorate([
        core_1.ViewChild("expireMonth"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "expireMonth", void 0);
    __decorate([
        core_1.ViewChild("cvc"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "cvc", void 0);
    __decorate([
        core_1.ViewChild("status"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "status", void 0);
    __decorate([
        core_1.ViewChild("name"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "name", void 0);
    __decorate([
        core_1.ViewChild("birthday"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "birthday", void 0);
    __decorate([
        core_1.ViewChild("creditLimit"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "creditLimit", void 0);
    __decorate([
        core_1.ViewChild("address1"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "address1", void 0);
    __decorate([
        core_1.ViewChild("address2"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "address2", void 0);
    __decorate([
        core_1.ViewChild("city"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "city", void 0);
    __decorate([
        core_1.ViewChild("province"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "province", void 0);
    __decorate([
        core_1.ViewChild("postCode"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "postCode", void 0);
    __decorate([
        core_1.ViewChild("billDay"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "billDay", void 0);
    __decorate([
        core_1.ViewChild("billDue"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "billDue", void 0);
    __decorate([
        core_1.ViewChild("isShared"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "isShared", void 0);
    __decorate([
        core_1.ViewChild("isAutoPay"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "isAutoPay", void 0);
    __decorate([
        core_1.ViewChild("isUSD"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "isUSD", void 0);
    __decorate([
        core_1.ViewChild("isLongTerm"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "isLongTerm", void 0);
    __decorate([
        core_1.ViewChild("email"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "email", void 0);
    __decorate([
        core_1.ViewChild("homePhone"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "homePhone", void 0);
    __decorate([
        core_1.ViewChild("mobilePhone"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "mobilePhone", void 0);
    __decorate([
        core_1.ViewChild("businessPhone"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "businessPhone", void 0);
    __decorate([
        core_1.ViewChild("otherPhone"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "otherPhone", void 0);
    __decorate([
        core_1.ViewChild("password"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "password", void 0);
    __decorate([
        core_1.ViewChild("challenge1"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "challenge1", void 0);
    __decorate([
        core_1.ViewChild("challenge2"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "challenge2", void 0);
    __decorate([
        core_1.ViewChild("challenge3"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "challenge3", void 0);
    __decorate([
        core_1.ViewChild("notes"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "notes", void 0);
    __decorate([
        core_1.ViewChild("readyDate"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "readyDate", void 0);
    __decorate([
        core_1.ViewChild("phone"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "phone", void 0);
    __decorate([
        core_1.ViewChild("amount"),
        __metadata("design:type", core_1.ElementRef)
    ], CardComponent.prototype, "amount", void 0);
    CardComponent = __decorate([
        core_1.Component({
            selector: "app-card",
            moduleId: module.id,
            templateUrl: "./card.component.html",
            styleUrls: ["./card.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            cards_1.Cards,
            common_1.DatePipe])
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;
