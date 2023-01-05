"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var card_1 = require("../model/card");
var cards_1 = require("../model/cards");
var sys_utils_1 = require("~/utils/sys.utils");
var ListComponent = /** @class */ (function () {
    function ListComponent(routerExtensions, cards) {
        this.routerExtensions = routerExtensions;
        this.cards = cards;
        this.searchState = false;
        this.searchState = false;
    }
    ListComponent.prototype.onItemTap = function (card) {
        //console.log("Item tapped at card: " + card.cardNumber);
        this.cards.currentCard.copy(card);
        this.cards.currentCardNumber = card.cardNumber;
        this.routerExtensions.navigate(["/card"]);
    };
    ListComponent.prototype.onSearch = function () {
        var _this = this;
        var strForSearch = this.search.nativeElement.text;
        if (strForSearch != null && strForSearch.length > 0) {
            this.cards.viewCards = [];
            var parts = strForSearch.split(',');
            var numberOfParts = parts.length;
            var listOfCards = [];
            var i = 0;
            parts.forEach(function (searchStr) {
                listOfCards[i] = [];
                if (sys_utils_1.SysUtils.isNumber(searchStr)) {
                    //card number
                    //expire year
                    if (i > 0) {
                        listOfCards[i - 1].forEach(function (card) {
                            if (card.cardNumber.includes(searchStr)) {
                                //this.cards.viewCards.push(card);
                                listOfCards[i].push(card);
                            }
                            if (card.expireYear.includes(searchStr)) {
                                listOfCards[i].push(card);
                            }
                        });
                    }
                    else {
                        _this.cards.cards.forEach(function (card) {
                            if (card.cardNumber.includes(searchStr)) {
                                //this.cards.viewCards.push(card);
                                listOfCards[i].push(card);
                            }
                            if (card.expireYear.includes(searchStr)) {
                                listOfCards[i].push(card);
                            }
                        });
                    }
                }
                else { //is string
                    //name
                    //status
                    //city
                    //notes
                    //== isUSD
                    //== isLongTerm
                    if (i > 0) {
                        listOfCards[i - 1].forEach(function (card) {
                            var name = card.name.toUpperCase();
                            var status = card_1.CardStatus[card.status].toUpperCase();
                            var city = card.city.toUpperCase();
                            var notes = card.notes.toUpperCase();
                            var what = searchStr.toUpperCase();
                            if (what == "ISUSD") {
                                if (card.isUSD) {
                                    //this.cards.viewCards.push(card);
                                    listOfCards[i].push(card);
                                }
                            }
                            else if (what == "ISLONGTERM") {
                                if (card.isLongTerm) {
                                    listOfCards[i].push(card);
                                }
                            }
                            else if (name.includes(what)
                                || status.includes(what)
                                || city.includes(what)
                                || notes.includes(what)) {
                                listOfCards[i].push(card);
                            }
                            else {
                                //nothing to do so far
                            }
                        });
                    }
                    else {
                        _this.cards.cards.forEach(function (card) {
                            var name = card.name.toUpperCase();
                            var status = card_1.CardStatus[card.status].toUpperCase();
                            var city = card.city.toUpperCase();
                            var notes = card.notes.toUpperCase();
                            var what = searchStr.toUpperCase();
                            if (what == "ISUSD") {
                                if (card.isUSD) {
                                    listOfCards[i].push(card);
                                }
                            }
                            else if (what == "ISLONGTERM") {
                                if (card.isLongTerm) {
                                    listOfCards[i].push(card);
                                }
                            }
                            else if (name.includes(what)
                                || status.includes(what)
                                || city.includes(what)
                                || notes.includes(what)) {
                                listOfCards[i].push(card);
                            }
                            else {
                                //nothing to do so far
                            }
                        });
                    }
                }
                i++;
            });
            listOfCards[numberOfParts - 1].forEach(function (card) {
                _this.cards.viewCards.push(card);
            });
            this.searchState = true;
        }
        else {
            if (this.searchState) {
                //recover to full list
                this.cards.restoreFullListInView();
                this.searchState = false;
            }
        }
    };
    ListComponent.prototype.onAdd = function () {
        //console.log("adding card...");
        this.cards.currentCard.copy(new card_1.Card());
        //console.log("current card...");
        this.cards.currentCardNumber = "";
        this.routerExtensions.navigate(["/card"]);
    };
    ListComponent.prototype.onReport = function () {
        this.routerExtensions.navigate(["/report"]);
    };
    ListComponent.prototype.onPhoneReport = function () {
        this.routerExtensions.navigate(["/phoneReport"]);
    };
    __decorate([
        core_1.ViewChild("search"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "search", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: "app-list",
            moduleId: module.id,
            templateUrl: "./list.component.html",
            styleUrls: ["./list.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, cards_1.Cards])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
