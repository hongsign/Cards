import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Phones } from "../model/card";
import { Cards } from "../model/cards";
import { PhoneReport } from "~/model/phone.report";

@Component({
    selector: "app-phonereport",
    moduleId: module.id,
    templateUrl: "./phonereport.component.html",
    styleUrls: ["./phonereport.component.css"]
})

export class PhoneReportComponent implements AfterViewInit {
    @ViewChild("oldest") oldest: ElementRef;
    @ViewChild("middle") middle: ElementRef;
    @ViewChild("newest") newest: ElementRef;
    @ViewChild("s8") s8: ElementRef;
    @ViewChild("iphone6") iphone6: ElementRef;
    @ViewChild("iphone7") iphone7: ElementRef;
    @ViewChild("nubia") nubia: ElementRef;
    @ViewChild("total") total: ElementRef;

    private phoneReport: PhoneReport = new PhoneReport();

    public constructor(private routerExtensions: RouterExtensions, 
        private cards: Cards) {
    }

    ngAfterViewInit() {
        this.generateReports();
    }

    onRefresh() {
        this.generateReports();
    }

    onClose() {
        this.routerExtensions.navigate(["/list"]);
    }

    onHelp() {

    }

    private generateReports() {

        this.phoneReport.clear();
        this.cards.cards.forEach(element => {
            //generate phone report
            this.phoneReport.total += element.totalAmount;
            switch (element.whichPhone) {
                case Phones.oldest:
                    this.phoneReport.oldest += element.totalAmount;
                break;
                case Phones.middle:
                    this.phoneReport.middle += element.totalAmount;
                break;
                case Phones.newest:
                    this.phoneReport.newest += element.totalAmount;
                break;
                case Phones.s8:
                    this.phoneReport.s8 += element.totalAmount;
                break;
                case Phones.iphone6:
                    this.phoneReport.iphone6 += element.totalAmount;
                break;
                case Phones.iphone7:
                    this.phoneReport.iphone7 += element.totalAmount;
                break;
                case Phones.nubia:
                    this.phoneReport.nubia += element.totalAmount;
                break;
                case Phones.none:
                break;
                default:
                break;
            }

        });
        //end of foreach
        
        this.oldest.nativeElement.text = this.phoneReport.oldest;
        this.middle.nativeElement.text = this.phoneReport.middle;
        this.newest.nativeElement.text = this.phoneReport.newest;
        this.s8.nativeElement.text = this.phoneReport.s8;
        this.iphone6.nativeElement.text = this.phoneReport.iphone6;
        this.iphone7.nativeElement.text = this.phoneReport.iphone7;
        this.nubia.nativeElement.text = this.phoneReport.nubia;
        this.total.nativeElement.text = this.phoneReport.total;
    }

}