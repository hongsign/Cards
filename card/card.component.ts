import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";
import { Switch } from "tns-core-modules/ui/switch";
import { ActionBar, ActionItem } from "tns-core-modules/ui/action-bar"
import * as dialogs from "tns-core-modules/ui/dialogs";

import { Card, CardStatus, CardHistory, Phones } from "../model/card";
import { Cards } from "../model/cards";
import { FileUtils } from "../utils/file.utils";
import { SysUtils } from "../utils/sys.utils";

enum CardViewState {
    viewing,
    adding,
    editing
}

@Component({
    selector: "app-card",
    moduleId: module.id,
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.css"]
})

export class CardComponent implements AfterViewInit {
    @ViewChild("cardActionBar") cardActionBar: ElementRef;
    @ViewChild("toSave") toSave: ElementRef;
    @ViewChild("toEdit") toEdit: ElementRef;
    @ViewChild("toAddHistory") toAddHistory: ElementRef;
    @ViewChild("toDelete") toDelete: ElementRef;
    @ViewChild("toCancel") toCancel: ElementRef;

    @ViewChild("inputDate") inputDate: ElementRef;
    @ViewChild("validDate") validDate: ElementRef;
    @ViewChild("card1") card1: ElementRef;
    @ViewChild("card2") card2: ElementRef;
    @ViewChild("card3") card3: ElementRef;
    @ViewChild("card4") card4: ElementRef;
    @ViewChild("expireYear") expireYear: ElementRef;
    @ViewChild("expireMonth") expireMonth: ElementRef;
    @ViewChild("cvc") cvc: ElementRef;
    @ViewChild("status") status: ElementRef;
    @ViewChild("name") name: ElementRef;
    @ViewChild("birthday") birthday: ElementRef;
    @ViewChild("creditLimit") creditLimit: ElementRef;
    @ViewChild("address1") address1: ElementRef;
    @ViewChild("address2") address2: ElementRef;
    @ViewChild("city") city: ElementRef;
    @ViewChild("province") province: ElementRef;
    @ViewChild("postCode") postCode: ElementRef;
    @ViewChild("billDay") billDay: ElementRef;
    @ViewChild("billDue") billDue: ElementRef;
    @ViewChild("isShared") isShared: ElementRef;
    @ViewChild("isAutoPay") isAutoPay: ElementRef;
    @ViewChild("isUSD") isUSD: ElementRef;
    @ViewChild("isLongTerm") isLongTerm: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("homePhone") homePhone: ElementRef;
    @ViewChild("mobilePhone") mobilePhone: ElementRef;
    @ViewChild("businessPhone") businessPhone: ElementRef;
    @ViewChild("otherPhone") otherPhone: ElementRef;
    @ViewChild("password") password: ElementRef;
    @ViewChild("challenge1") challenge1: ElementRef;
    @ViewChild("challenge2") challenge2: ElementRef;
    @ViewChild("challenge3") challenge3: ElementRef;
    @ViewChild("notes") notes: ElementRef;
    @ViewChild("readyDate") readyDate: ElementRef;
    @ViewChild("phone") phone: ElementRef;
    @ViewChild("amount") amount: ElementRef;

    private VIEW_INPUTDATE = 1;
    private VIEW_CARD1 = 2;
    private VIEW_CARD2 = 3;
    private VIEW_CARD3 = 4;
    private VIEW_CARD4 = 5;
    private VIEW_EXPIREYEAR = 6;
    private VIEW_EXPIREMONTH = 7;
    private VIEW_CVC = 8;
    private VIEW_BIRTHDAY = 9;
    private VIEW_BILLDAY = 10;
    private VIEW_BILLDUE = 11;
    private VIEW_HOMEPHONE = 12;
    private VIEW_READYDATE = 13;


    private fileUtils: FileUtils;
    private viewState: CardViewState;

    public constructor(private routerExtensions: RouterExtensions, 
        private cards: Cards,
        private datePipe: DatePipe) {
        this.fileUtils = new FileUtils(cards);
    }

    ngAfterViewInit() {
        
        if (SysUtils.isNonEmptyString(this.cards.currentCard.cardNumber)) {
            //display only with input disabled
            (<ActionItem>this.toSave.nativeElement).visibility = "collapse";
            (<ActionItem>this.toEdit.nativeElement).visibility = "visible";
            (<ActionItem>this.toAddHistory.nativeElement).visibility = "visible";
            (<ActionItem>this.toCancel.nativeElement).visibility = "visible";
            this.toDelete.nativeElement.visibility = "visible";

            //(<ActionBar>this.cardActionBar.nativeElement).title= "Card Details";

            this.setUserInteraction(false);
            this.populateUIFromCard(this.cards.currentCard);
            this.viewState = CardViewState.viewing;
        }
        else {
            //Adding new card
            (<ActionItem>this.toSave.nativeElement).visibility = "visible";
            (<ActionItem>this.toEdit.nativeElement).visibility = "collapse";
            (<ActionItem>this.toAddHistory.nativeElement).visibility = "collapse";
            (<ActionItem>this.toCancel.nativeElement).visibility = "visible";
            this.toDelete.nativeElement.visibility = "collapse";

            //(<ActionBar>this.cardActionBar.nativeElement).title = "Add New Card";

            this.setUserInteraction(true);
            this.inputDate.nativeElement.focus();
            this.viewState = CardViewState.adding;
        }
    }

    onSave() {
        let card = this.populateCardFromUI();
        if (this.viewState == CardViewState.adding) {
            card.totalAmount = 0;
            this.cards.insertNewCard(card);
        }
        else if (this.viewState == CardViewState.editing) {
            this.cards.currentCard.copyWithoutHistory(card);
            this.cards.updateFromCurrentCard();
        }

        let cardsStr = JSON.stringify(this.cards.cards);
        //console.log("cards json string: " + cardsStr);
        this.fileUtils.write(cardsStr);
        //console.log(card.cardNumber);
        this.routerExtensions.navigate(["/list"]);  
    }

    onCancel() {
        this.routerExtensions.navigate(["/list"]);
    }

    onEdit() {
        this.toEdit.nativeElement.visibility = "collapse";
        this.toAddHistory.nativeElement.visibility = "collapse";
        this.toSave.nativeElement.visibility = "visible";
        this.toCancel.nativeElement.visibility = "visible";
        this.toDelete.nativeElement.visibility = "collapse";

        this.setUserInteraction(true);
        this.viewState = CardViewState.editing;
    }

    onAddHistory() {
        this.routerExtensions.navigate(["/history"]);
    }

    onTextChangeOfInputDate(who) {
        switch(who) {
            case this.VIEW_INPUTDATE:
            if (SysUtils.isValidDate(this.inputDate.nativeElement.text)) {
                let after15days = SysUtils.getPastOrFutureDate(
                    SysUtils.getDate(this.inputDate.nativeElement.text), 15);
                //console.log("after15: " + after15days.toDateString());
                this.validDate.nativeElement.text = this.datePipe.transform(after15days, "yyyy-MM-dd");
                this.card1.nativeElement.focus();
            }
            break;
            case this.VIEW_CARD1:
            let txt1 = this.card1.nativeElement.text;
            if (SysUtils.isNumber(txt1) && txt1.length == 4) {
                this.card2.nativeElement.focus();
            }
            break;
            case this.VIEW_CARD2:
            let txt2 = this.card2.nativeElement.text;
            if (SysUtils.isNumber(txt2) && txt2.length == 4) {
                this.card3.nativeElement.focus();
            }
            break;
            case this.VIEW_CARD3:
            let txt3 = this.card3.nativeElement.text;
            if (SysUtils.isNumber(txt3) && txt3.length == 4) {
                this.card4.nativeElement.focus();
            }
            break;
            case this.VIEW_CARD4:
            let txt4 = this.card4.nativeElement.text;
            if (SysUtils.isNumber(txt4) && txt4.length == 4) {
                this.expireYear.nativeElement.focus();
            }
            break;
            case this.VIEW_EXPIREYEAR:
            let year = this.expireYear.nativeElement.text;
            if (SysUtils.isNumber(year) && year.length == 4) {
                this.expireMonth.nativeElement.focus();
            }
            break;
            case this.VIEW_EXPIREMONTH:
            let month = this.expireMonth.nativeElement.text;
            if (SysUtils.isNumber(month) && month.length == 2) {
                this.cvc.nativeElement.focus();
            }
            break;
            case this.VIEW_CVC:
            let cvc = this.cvc.nativeElement.text;
            if (SysUtils.isNumber(cvc) && cvc.length == 3) {
                this.name.nativeElement.focus();
            }
            break;
            case this.VIEW_BIRTHDAY:
            if (SysUtils.isValidDate(this.birthday.nativeElement.text)) {
                this.creditLimit.nativeElement.focus();
            }
            break;
            case this.VIEW_BILLDAY:
            let billday = this.billDay.nativeElement.text;
            if (SysUtils.isNumber(billday) && billday.length == 2) {
                this.billDue.nativeElement.focus();
            }
            break;
            case this.VIEW_BILLDUE:
            let billdue = this.billDue.nativeElement.text;
            if (SysUtils.isNumber(billdue) && billdue.length == 2) {
                this.email.nativeElement.focus();
            }
            break;
            case this.VIEW_HOMEPHONE:
            if (SysUtils.isValidPhoneNumber(this.homePhone.nativeElement.text)) {
                this.mobilePhone.nativeElement.focus();
            }
            break;
            case this.VIEW_READYDATE:
            if (SysUtils.isValidDate(this.readyDate.nativeElement.text)) {
                this.readyDate.nativeElement.dismissSoftInput();
            }
            break;
            default:
            break;
        }

    }

    onDelete() {
        dialogs.confirm("DELETE? DELETE!?").then(result => {
            if (result) {
                this.cards.deleteCurrentCard();
                let cardsStr = JSON.stringify(this.cards.cards);
                //console.log("cards json string: " + cardsStr);
                this.fileUtils.write(cardsStr);
                this.routerExtensions.navigate(["/list"]);
            }
        })
    }

    cardStatus_registered() {
        this.status.nativeElement.text = "registered";
    }
    cardStatus_ready() {
        this.status.nativeElement.text = "ready";
    }
    cardStatus_done() {
        this.status.nativeElement.text = "done";
    }
    cardStatus_remove() {
        this.status.nativeElement.text = "remove";
    }
    phone_none() {
        this.phone.nativeElement.text="none";
    }
    phone_oldest() {
        this.phone.nativeElement.text = "oldest";
    }
    phone_middle() {
        this.phone.nativeElement.text = "middle";
    }
    phone_newest() {
        this.phone.nativeElement.text = "newest";
    }
    phone_S8() {
        this.phone.nativeElement.text = "s8";
    }
    phone_iPhone6() {
        this.phone.nativeElement.text = "iphone6";
    }
    phone_iPhone7() {
        this.phone.nativeElement.text = "iphone7";
    }
    phone_nubia() {
        this.phone.nativeElement.text = "nubia";
    }

    private populateCardFromUI(): Card {
        let card = new Card();
        card.inputDate = (<TextField>this.inputDate.nativeElement).text;
        card.validDate = (<TextField>this.validDate.nativeElement).text;
        card.cardNumber = (<TextField>this.card1.nativeElement).text
            + (<TextField>this.card2.nativeElement).text
            + (<TextField>this.card3.nativeElement).text
            + (<TextField>this.card4.nativeElement).text;
        card.expireYear = (<TextField>this.expireYear.nativeElement).text;
        card.expireMonth = (<TextField>this.expireMonth.nativeElement).text;
        card.cvc = (<TextField>this.cvc.nativeElement).text;
        card.status = (<any>CardStatus)[this.status.nativeElement.text];
        card.name = (<TextField>this.name.nativeElement).text;
        card.birthday = (<TextField>this.birthday.nativeElement).text;
        card.creditLimit = (<TextField>this.creditLimit.nativeElement).text;
        card.address1 = (<TextField>this.address1.nativeElement).text;
        card.address2 = (<TextField>this.address2.nativeElement).text;
        card.city = (<TextField>this.city.nativeElement).text;
        card.province = (<TextField>this.province.nativeElement).text;
        card.postCode = (<TextField>this.postCode.nativeElement).text;
        card.billDay = (<TextField>this.billDay.nativeElement).text;
        card.billDue = (<TextField>this.billDue.nativeElement).text;
        card.isShared = (<Switch>this.isShared.nativeElement).checked;
        card.isAutoPay = (<Switch>this.isAutoPay.nativeElement).checked;
        card.isUSD = (<Switch>this.isUSD.nativeElement).checked;
        card.isLongTerm = (<Switch>this.isLongTerm.nativeElement).checked;
        card.email = (<TextField>this.email.nativeElement).text;
        card.homePhone = (<TextField>this.homePhone.nativeElement).text;
        card.mobilePhone = (<TextField>this.mobilePhone.nativeElement).text;
        card.businessPhone = (<TextField>this.businessPhone.nativeElement).text;
        card.otherPhone = (<TextField>this.otherPhone.nativeElement).text;
        card.password = (<TextField>this.password.nativeElement).text;
        card.challenge1 = (<TextField>this.challenge1.nativeElement).text;
        card.challenge2 = (<TextField>this.challenge2.nativeElement).text;
        card.challenge3 = (<TextField>this.challenge3.nativeElement).text;
        card.notes = (<TextField>this.notes.nativeElement).text;

        card.whichPhone = (<any>Phones)[this.phone.nativeElement.text];
        card.readyDate = this.readyDate.nativeElement.text;
        card.history = new Array<CardHistory>();
        card.totalAmount = this.amount.nativeElement.text;
        card.setValidTill();

        return card;
    }

    private populateUIFromCard(card: Card) {
        (<TextField>this.inputDate.nativeElement).text = card.inputDate;
        (<TextField>this.validDate.nativeElement).text = card.validDate;
        (<TextField>this.card1.nativeElement).text = card.cardNumber.substring(0,4);
        (<TextField>this.card2.nativeElement).text = card.cardNumber.substring(4,8);
        (<TextField>this.card3.nativeElement).text = card.cardNumber.substring(8,12);
        (<TextField>this.card4.nativeElement).text = card.cardNumber.substring(12,16);
        (<TextField>this.expireYear.nativeElement).text = card.expireYear;
        (<TextField>this.expireMonth.nativeElement).text = card.expireMonth;
        (<TextField>this.cvc.nativeElement).text = card.cvc;
        this.status.nativeElement.text = CardStatus[card.status];
        (<TextField>this.name.nativeElement).text = card.name;
        (<TextField>this.birthday.nativeElement).text = card.birthday;
        (<TextField>this.creditLimit.nativeElement).text = card.creditLimit;
        (<TextField>this.address1.nativeElement).text = card.address1;
        (<TextField>this.address2.nativeElement).text = card.address2;
        (<TextField>this.city.nativeElement).text = card.city;
        (<TextField>this.province.nativeElement).text = card.province;
        (<TextField>this.postCode.nativeElement).text = card.postCode;
        (<TextField>this.billDay.nativeElement).text = card.billDay;
        (<TextField>this.billDue.nativeElement).text = card.billDue;
        (<Switch>this.isShared.nativeElement).checked = card.isShared;
        (<Switch>this.isAutoPay.nativeElement).checked = card.isAutoPay;
        (<Switch>this.isUSD.nativeElement).checked = card.isUSD;
        (<TextField>this.email.nativeElement).text = card.email;
        (<TextField>this.homePhone.nativeElement).text = card.homePhone;
        (<TextField>this.mobilePhone.nativeElement).text = card.mobilePhone;
        (<TextField>this.businessPhone.nativeElement).text = card.businessPhone;
        (<TextField>this.otherPhone.nativeElement).text = card.otherPhone;
        (<TextField>this.password.nativeElement).text = card.password;
        (<TextField>this.challenge1.nativeElement).text = card.challenge1;
        (<TextField>this.challenge2.nativeElement).text = card.challenge2;
        (<TextField>this.challenge3.nativeElement).text = card.challenge3;
        (<Switch>this.isLongTerm.nativeElement).checked = card.isLongTerm;
        (<TextField>this.notes.nativeElement).text = card.notes;
        this.readyDate.nativeElement.text = card.readyDate;
        this.phone.nativeElement.text = Phones[card.whichPhone];
        this.amount.nativeElement.text = card.totalAmount;
    }


    private setUserInteraction(enabled: boolean) {
        (<TextField>this.inputDate.nativeElement).isEnabled = enabled;
        (<TextField>this.validDate.nativeElement).isEnabled = enabled;
        (<TextField>this.card1.nativeElement).isEnabled = enabled;
        (<TextField>this.card2.nativeElement).isEnabled = enabled;
        (<TextField>this.card3.nativeElement).isEnabled = enabled;
        (<TextField>this.card4.nativeElement).isEnabled = enabled;
        (<TextField>this.expireYear.nativeElement).isEnabled = enabled;
        (<TextField>this.expireMonth.nativeElement).isEnabled = enabled;
        (<TextField>this.cvc.nativeElement).isEnabled = enabled;
        (<TextField>this.name.nativeElement).isEnabled = enabled;
        (<TextField>this.birthday.nativeElement).isEnabled = enabled;
        (<TextField>this.creditLimit.nativeElement).isEnabled = enabled;
        (<TextField>this.address1.nativeElement).isEnabled = enabled;
        (<TextField>this.address2.nativeElement).isEnabled = enabled;
        (<TextField>this.city.nativeElement).isEnabled = enabled;
        (<TextField>this.province.nativeElement).isEnabled = enabled;
        (<TextField>this.postCode.nativeElement).isEnabled = enabled;
        (<TextField>this.billDay.nativeElement).isEnabled = enabled;
        (<TextField>this.billDue.nativeElement).isEnabled = enabled;
        (<Switch>this.isShared.nativeElement).isEnabled = enabled;
        (<Switch>this.isAutoPay.nativeElement).isEnabled = enabled;
        (<Switch>this.isUSD.nativeElement).isEnabled = enabled;
        (<TextField>this.email.nativeElement).isEnabled = enabled;
        (<TextField>this.homePhone.nativeElement).isEnabled = enabled;
        (<TextField>this.mobilePhone.nativeElement).isEnabled = enabled;
        (<TextField>this.businessPhone.nativeElement).isEnabled = enabled;
        (<TextField>this.otherPhone.nativeElement).isEnabled = enabled;
        (<TextField>this.password.nativeElement).isEnabled = enabled;
        (<TextField>this.challenge1.nativeElement).isEnabled = enabled;
        (<TextField>this.challenge2.nativeElement).isEnabled = enabled;
        (<TextField>this.challenge3.nativeElement).isEnabled = enabled;
        (<Switch>this.isLongTerm.nativeElement).isEnabled = enabled;
        (<TextField>this.notes.nativeElement).isEnabled = enabled;
        this.readyDate.nativeElement.isEnabled = enabled;
    }

}