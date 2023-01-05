
export enum CardStatus {
    registered,
    ready,
    done,
    remove
}

export enum Phones {
    none,
    oldest,
    middle,
    newest,
    s8,
    iphone6,
    iphone7,
    nubia
}

export class CardHistory {
    public date: string;
    public amount: number = 0;
    public notes: string;
}

export class Card {

    public inputDate: string;
    public validDate: string;
    public cardNumber: string;
    public expireYear: string;
    public expireMonth: string;
    public cvc: string;
    public name: string;
    public birthday: string;
    public creditLimit: string;
    public address1: string;
    public address2: string;
    public city: string;
    public province: string;
    public postCode: string;
    public billDay: string;
    public billDue: string;
    public isShared: boolean;
    public isAutoPay: boolean;
    public isUSD: boolean;
    public email: string;
    public homePhone: string;
    public mobilePhone: string;
    public businessPhone: string;
    public otherPhone: string;
    public password: string;
    public challenge1: string;
    public challenge2: string;
    public challenge3: string;
    public isLongTerm: boolean;
    public notes: string;

    public status: CardStatus;
    public whichPhone: Phones;
    public readyDate: string;
    public history: CardHistory[];

    public totalAmount: number = 0;
    public validTill: string; // expireYear+"/"+expireMonth

    //=======================================================

    public setValidTill() {
        this.validTill = this.expireYear + "/" + this.expireMonth;
    }

    public addHistory(history: CardHistory) {
        this.history.push(history);
        this.totalAmount += history.amount;
    }

    public copy(card: Card) {
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
            card.history.forEach(element => {
                this.history.push(element);
            });
        }
    }

    //dedicated for saving on card page
    public copyWithoutHistory(card: Card) {
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
    }
}

//export var cards: Array<Card> = [];