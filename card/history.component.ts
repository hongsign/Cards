import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Card, CardStatus, CardHistory, Phones } from "../model/card";
import { Cards } from "../model/cards";
import { FileUtils } from "../utils/file.utils";
import { SysUtils } from "../utils/sys.utils";

@Component({
    selector: "app-history",
    moduleId: module.id,
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.css"]
})

export class HistoryComponent implements AfterViewInit {
    @ViewChild("date1") date1: ElementRef;
    @ViewChild("amount1") amount1: ElementRef;
    @ViewChild("notes1") notes1: ElementRef;
    @ViewChild("date2") date2: ElementRef;
    @ViewChild("amount2") amount2: ElementRef;
    @ViewChild("notes2") notes2: ElementRef;
    @ViewChild("date3") date3: ElementRef;
    @ViewChild("amount3") amount3: ElementRef;
    @ViewChild("notes3") notes3: ElementRef;
    @ViewChild("date4") date4: ElementRef;
    @ViewChild("amount4") amount4: ElementRef;
    @ViewChild("notes4") notes4: ElementRef;
    @ViewChild("date5") date5: ElementRef;
    @ViewChild("amount5") amount5: ElementRef;
    @ViewChild("notes5") notes5: ElementRef;
    @ViewChild("date6") date6: ElementRef;
    @ViewChild("amount6") amount6: ElementRef;
    @ViewChild("notes6") notes6: ElementRef;
    @ViewChild("date7") date7: ElementRef;
    @ViewChild("amount7") amount7: ElementRef;
    @ViewChild("notes7") notes7: ElementRef;
    @ViewChild("date8") date8: ElementRef;
    @ViewChild("amount8") amount8: ElementRef;
    @ViewChild("notes8") notes8: ElementRef;
    @ViewChild("date9") date9: ElementRef;
    @ViewChild("amount9") amount9: ElementRef;
    @ViewChild("notes9") notes9: ElementRef;
    @ViewChild("date10") date10: ElementRef;
    @ViewChild("amount10") amount10: ElementRef;
    @ViewChild("notes10") notes10: ElementRef;
    @ViewChild("date11") date11: ElementRef;
    @ViewChild("amount11") amount11: ElementRef;
    @ViewChild("notes11") notes11: ElementRef;

    private fileUtils: FileUtils;

    public constructor(private routerExtensions: RouterExtensions, private cards: Cards) {
        this.fileUtils = new FileUtils(cards);
    }

    ngAfterViewInit() {
        this.populateHistoryToUI();
    }

    onSave() {
        this.populateUIToHistory();
        this.cards.updateFromCurrentCard();
        let cardsStr = JSON.stringify(this.cards.cards);
        console.log("cards json string: " + cardsStr);
        this.fileUtils.write(cardsStr);
        this.routerExtensions.navigate(["/card"]);
    }

    onCancel() {
        this.routerExtensions.navigate(["/card"]);
    }

    onTextChangeOfDate(num) {

    }

    onTextChangeOfAmount(num) {

    }

    onTextChangeOfNotes(num) {

    }

    private populateHistoryToUI() {
        var i = 1;
        this.cards.currentCard.history.forEach(element => {
            switch (i) { 
                case 1:
                this.date1.nativeElement.text = element.date;
                this.amount1.nativeElement.text = element.amount;
                this.notes1.nativeElement.text = element.notes;
                break;
                case 2:
                this.date2.nativeElement.text = element.date;
                this.amount2.nativeElement.text = element.amount;
                this.notes2.nativeElement.text = element.notes;
                break;
                case 3:
                this.date3.nativeElement.text = element.date;
                this.amount3.nativeElement.text = element.amount;
                this.notes3.nativeElement.text = element.notes;
                break;
                case 4:
                this.date4.nativeElement.text = element.date;
                this.amount4.nativeElement.text = element.amount;
                this.notes4.nativeElement.text = element.notes;
                break;
                case 5:
                this.date5.nativeElement.text = element.date;
                this.amount5.nativeElement.text = element.amount;
                this.notes5.nativeElement.text = element.notes;
                break;
                case 6:
                this.date6.nativeElement.text = element.date;
                this.amount6.nativeElement.text = element.amount;
                this.notes6.nativeElement.text = element.notes;
                break;
                case 7:
                this.date7.nativeElement.text = element.date;
                this.amount7.nativeElement.text = element.amount;
                this.notes7.nativeElement.text = element.notes;
                break;
                case 8:
                this.date8.nativeElement.text = element.date;
                this.amount8.nativeElement.text = element.amount;
                this.notes8.nativeElement.text = element.notes;
                break;
                case 9:
                this.date9.nativeElement.text = element.date;
                this.amount9.nativeElement.text = element.amount;
                this.notes9.nativeElement.text = element.notes;
                break;
                case 10:
                this.date10.nativeElement.text = element.date;
                this.amount10.nativeElement.text = element.amount;
                this.notes10.nativeElement.text = element.notes;
                break;
                case 11:
                this.date11.nativeElement.text = element.date;
                this.amount11.nativeElement.text = element.amount;
                this.notes11.nativeElement.text = element.notes;
                break;
                default:
                break;
            }
            i++;
        });
    }

    private populateUIToHistory() {
        this.cards.currentCard.totalAmount = 0;
        this.cards.currentCard.history = [];
        if (this.date1.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date1.nativeElement.text;
            history.amount = +this.amount1.nativeElement.text;
            history.notes = this.notes1.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date2.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date2.nativeElement.text;
            history.amount = +this.amount2.nativeElement.text;
            history.notes = this.notes2.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date3.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date3.nativeElement.text;
            history.amount = +this.amount3.nativeElement.text;
            history.notes = this.notes3.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date4.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date4.nativeElement.text;
            history.amount = +this.amount4.nativeElement.text;
            history.notes = this.notes4.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date5.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date5.nativeElement.text;
            history.amount = +this.amount5.nativeElement.text;
            history.notes = this.notes5.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date6.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date6.nativeElement.text;
            history.amount = +this.amount6.nativeElement.text;
            history.notes = this.notes6.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date7.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date7.nativeElement.text;
            history.amount = +this.amount7.nativeElement.text;
            history.notes = this.notes7.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date8.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date8.nativeElement.text;
            history.amount = +this.amount8.nativeElement.text;
            history.notes = this.notes8.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date9.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date9.nativeElement.text;
            history.amount = +this.amount9.nativeElement.text;
            history.notes = this.notes9.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date10.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date10.nativeElement.text;
            history.amount = +this.amount10.nativeElement.text;
            history.notes = this.notes10.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
        if (this.date11.nativeElement.text.length > 0) {
            let history = new CardHistory();
            history.date = this.date11.nativeElement.text;
            history.amount = +this.amount11.nativeElement.text;
            history.notes = this.notes11.nativeElement.text;
            this.cards.currentCard.addHistory(history);
        }
    }

}