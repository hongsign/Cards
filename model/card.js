"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardStatus;
(function (CardStatus) {
    CardStatus[CardStatus["registered"] = 0] = "registered";
    CardStatus[CardStatus["ready"] = 1] = "ready";
    CardStatus[CardStatus["done"] = 2] = "done";
    CardStatus[CardStatus["remove"] = 3] = "remove";
})(CardStatus = exports.CardStatus || (exports.CardStatus = {}));
var Phones;
(function (Phones) {
    Phones[Phones["none"] = 0] = "none";
    Phones[Phones["oldest"] = 1] = "oldest";
    Phones[Phones["middle"] = 2] = "middle";
    Phones[Phones["newest"] = 3] = "newest";
    Phones[Phones["s8"] = 4] = "s8";
    Phones[Phones["iphone6"] = 5] = "iphone6";
    Phones[Phones["iphone7"] = 6] = "iphone7";
    Phones[Phones["nubia"] = 7] = "nubia";
})(Phones = exports.Phones || (exports.Phones = {}));
var CardHistory = /** @class */ (function () {
    function CardHistory() {
        this.amount = 0;
    }
    return CardHistory;
}());
exports.CardHistory = CardHistory;
var Card = /** @class */ (function () {
    function Card() {
        this.totalAmount = 0;
    }
    //=======================================================
    Card.prototype.setValidTill = function () {
        this.validTill = this.expireYear + "/" + this.expireMonth;
    };
    Card.prototype.addHistory = function (history) {
        this.history.push(history);
        this.totalAmount += history.amount;
    };
    Card.prototype.copy = function (card) {
        var _this = this;
        this.inputDate = card.inputDate;
        this.validDate = card.validDate;
        this.cardNumber = card.cardNumber;
        this.expireYear = card.expireYear;
        this.expireMonth = card.expireMonth;
        this.cvc = card.cvc;
        this.name = card.name;
        this.birthday = card.birthday;
        this.creditLimit = card.creditLimit;
        this.address1 = card.address1;
        this.address2 = card.address2;
        this.city = card.city;
        this.province = card.province;
        this.postCode = card.postCode;
        this.billDay = card.billDay;
        this.billDue = card.billDue;
        this.isShared = card.isShared;
        this.isAutoPay = card.isAutoPay;
        this.isUSD = card.isUSD;
        this.email = card.email;
        this.homePhone = card.homePhone;
        this.mobilePhone = card.mobilePhone;
        this.businessPhone = card.businessPhone;
        this.otherPhone = card.otherPhone;
        this.password = card.password;
        this.challenge1 = card.challenge1;
        this.challenge2 = card.challenge2;
        this.challenge3 = card.challenge3;
        this.isLongTerm = card.isLongTerm;
        this.notes = card.notes;
        this.status = card.status;
        this.whichPhone = card.whichPhone;
        this.readyDate = card.readyDate;
        this.totalAmount = card.totalAmount;
        this.setValidTill();
        this.history = [];
        if (typeof card.history !== 'undefined' && card.history.length > 0) {
            card.history.forEach(function (element) {
                _this.history.push(element);
            });
        }
    };
    //dedicated for saving on card page
    Card.prototype.copyWithoutHistory = function (card) {
        this.inputDate = card.inputDate;
        this.validDate = card.validDate;
        this.cardNumber = card.cardNumber;
        this.expireYear = card.expireYear;
        this.expireMonth = card.expireMonth;
        this.cvc = card.cvc;
        this.name = card.name;
        this.birthday = card.birthday;
        this.creditLimit = card.creditLimit;
        this.address1 = card.address1;
        this.address2 = card.address2;
        this.city = card.city;
        this.province = card.province;
        this.postCode = card.postCode;
        this.billDay = card.billDay;
        this.billDue = card.billDue;
        this.isShared = card.isShared;
        this.isAutoPay = card.isAutoPay;
        this.isUSD = card.isUSD;
        this.email = card.email;
        this.homePhone = card.homePhone;
        this.mobilePhone = card.mobilePhone;
        this.businessPhone = card.businessPhone;
        this.otherPhone = card.otherPhone;
        this.password = card.password;
        this.challenge1 = card.challenge1;
        this.challenge2 = card.challenge2;
        this.challenge3 = card.challenge3;
        this.isLongTerm = card.isLongTerm;
        this.notes = card.notes;
        this.status = card.status;
        this.whichPhone = card.whichPhone;
        this.readyDate = card.readyDate;
        this.totalAmount = card.totalAmount;
        this.setValidTill();
    };
    return Card;
}());
exports.Card = Card;
//export var cards: Array<Card> = [];
