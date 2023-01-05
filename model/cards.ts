import { Injectable } from '@angular/core';
import { Card, CardHistory } from "./card";

@Injectable()
export class Cards {

    public cards: Array<Card> = [];
    public viewCards: Array<Card> = [];

    public currentCard: Card = new Card();

    public currentCardNumber: string = "";

    public constructor() { }

    public restoreFullListInView() {
        this.viewCards = [];
        this.cards.forEach(card => {
            this.viewCards.push(card);
        });
    }

    public updateFromCurrentCard() {
        var found = false;
        this.cards.forEach(element => {
            if (this.currentCardNumber == element.cardNumber) {
                element.copy(this.currentCard);
                found = true;
            }
        });
        if (!found) {
            console.log("ERROR: cound not find card to update " + this.currentCardNumber);
        }
    }

    public insertNewCard(card: Card) {
        var found = false;
        this.cards.forEach(element =>{
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
    }

    public deleteCurrentCard() {
        var i = 0;
        this.cards.forEach(element =>{
            if (this.currentCard.cardNumber == element.cardNumber) {
                this.cards.splice(i, 1);
                return;
            }
            i++;
        });
        i = 0;
        this.viewCards.forEach(element =>{
            if (this.currentCard.cardNumber == element.cardNumber) {
                this.viewCards.splice(i, 1);
                return;
            }
            i++;
        });
    }

    public populateCardsFromJsonObject(array) {
        array.forEach(obj => {
            let card = new Card();
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
            obj.history.forEach(record => {
                let historyRecord = new CardHistory();
                historyRecord.date = record.date;
                historyRecord.amount = record.amount;
                historyRecord.notes = record.notes;
                card.addHistory(historyRecord);
            });

            this.cards.push(card);
            this.viewCards.push(card);
        });
    } 

}