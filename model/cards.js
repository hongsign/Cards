"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var card_1 = require("./card");
var Cards = /** @class */ (function () {
    function Cards() {
        this.cards = [];
        this.viewCards = [];
        this.currentCard = new card_1.Card();
        this.currentCardNumber = "";
    }
    Cards.prototype.restoreFullListInView = function () {
        var _this = this;
        this.viewCards = [];
        this.cards.forEach(function (card) {
            _this.viewCards.push(card);
        });
    };
    Cards.prototype.updateFromCurrentCard = function () {
        var _this = this;
        var found = false;
        this.cards.forEach(function (element) {
            if (_this.currentCardNumber == element.cardNumber) {
                element.copy(_this.currentCard);
                found = true;
            }
        });
        if (!found) {
            console.log("ERROR: cound not find card to update " + this.currentCardNumber);
        }
    };
    Cards.prototype.insertNewCard = function (card) {
        var found = false;
        this.cards.forEach(function (element) {
            if (card.cardNumber == element.cardNumber) {
                found = true;
            }
        });
        if (found) {
            console.log("ERROR: card already existed " + card.cardNumber);
        }
        else {
            this.cards.push(card);
            this.viewCards.push(card);
        }
    };
    Cards.prototype.deleteCurrentCard = function () {
        var _this = this;
        var i = 0;
        this.cards.forEach(function (element) {
            if (_this.currentCard.cardNumber == element.cardNumber) {
                _this.cards.splice(i, 1);
                return;
            }
            i++;
        });
        i = 0;
        this.viewCards.forEach(function (element) {
            if (_this.currentCard.cardNumber == element.cardNumber) {
                _this.viewCards.splice(i, 1);
                return;
            }
            i++;
        });
    };
    Cards.prototype.populateCardsFromJsonObject = function (array) {
        var _this = this;
        array.forEach(function (obj) {
            var card = new card_1.Card();
            card.inputDate = obj.inputDate;
            card.validDate = obj.validDate;
            card.cardNumber = obj.cardNumber;
            card.expireYear = obj.expireYear;
            card.expireMonth = obj.expireMonth;
            card.cvc = obj.cvc;
            card.name = obj.name;
            card.birthday = obj.birthday;
            card.creditLimit = obj.creditLimit;
            card.address1 = obj.address1;
            card.address2 = obj.address2;
            card.city = obj.city;
            card.province = obj.province;
            card.postCode = obj.postCode;
            card.billDay = obj.billDay;
            card.billDue = obj.billDue;
            card.isShared = obj.isShared;
            card.isAutoPay = obj.isAutoPay;
            card.isUSD = obj.isUSD;
            card.email = obj.email;
            card.homePhone = obj.homePhone;
            card.mobilePhone = obj.mobilePhone;
            card.businessPhone = obj.businessPhone;
            card.otherPhone = obj.otherPhone;
            card.password = obj.password;
            card.challenge1 = obj.challenge1;
            card.challenge2 = obj.challenge2;
            card.challenge3 = obj.challenge3;
            card.isLongTerm = obj.isLongTerm;
            card.notes = obj.notes;
            card.status = obj.status;
            card.whichPhone = obj.whichPhone;
            card.readyDate = obj.readyDate;
            //card.totalAmount = obj.totalAmount;
            card.validTill = obj.validTill;
            card.history = [];
            obj.history.forEach(function (record) {
                var historyRecord = new card_1.CardHistory();
                historyRecord.date = record.date;
                historyRecord.amount = record.amount;
                historyRecord.notes = record.notes;
                card.addHistory(historyRecord);
            });
            _this.cards.push(card);
            _this.viewCards.push(card);
        });
    };
    Cards = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Cards);
    return Cards;
}());
exports.Cards = Cards;
