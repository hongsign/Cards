import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Card, CardStatus } from "../model/card";
import { Cards } from "../model/cards";
import { SysUtils } from "~/utils/sys.utils";

@Component({
    selector: "app-list",
    moduleId: module.id,
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"]
})

export class ListComponent {
    @ViewChild("search") search: ElementRef;

    private searchState: boolean = false;

    public constructor(private routerExtensions: RouterExtensions, private cards: Cards) {
        this.searchState = false;
    }

    public onItemTap(card: Card) {
        //console.log("Item tapped at card: " + card.cardNumber);
        this.cards.currentCard.copy(card);
        this.cards.currentCardNumber = card.cardNumber;
        this.routerExtensions.navigate(["/card"]);
    }

    onSearch() {
        var strForSearch: string = this.search.nativeElement.text;
        if (strForSearch != null && strForSearch.length > 0) {
            this.cards.viewCards = [];
            var parts = strForSearch.split(',');
            let numberOfParts = parts.length;
            var listOfCards: Card[][] = [];
            var i: number = 0;

            parts.forEach(searchStr => {
                listOfCards[i] = [];
                if (SysUtils.isNumber(searchStr)) {
                    //card number
                    //expire year
                    if (i > 0) {
                        listOfCards[i - 1].forEach(card => {
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
                        this.cards.cards.forEach(card => {
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
                else {   //is string
                    //name
                    //status
                    //city
                    //notes
                    //== isUSD
                    //== isLongTerm
                    if (i > 0) {
                        listOfCards[i-1].forEach(card => {
                            var name = card.name.toUpperCase();
                            var status = CardStatus[card.status].toUpperCase();
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
                        this.cards.cards.forEach(card => {
                            var name = card.name.toUpperCase();
                            var status = CardStatus[card.status].toUpperCase();
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
            listOfCards[numberOfParts-1].forEach(card => {
                this.cards.viewCards.push(card);
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
    }

    onAdd() {
        //console.log("adding card...");
        this.cards.currentCard.copy(new Card());
        //console.log("current card...");
        this.cards.currentCardNumber = "";
        this.routerExtensions.navigate(["/card"]);
    }

    onReport() {
        this.routerExtensions.navigate(["/report"]);
    }

    onPhoneReport() {
        this.routerExtensions.navigate(["/phoneReport"]);
    }

}
