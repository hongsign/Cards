import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Card, CardStatus, Phones } from "../model/card";
import { Cards } from "../model/cards";
import { Report } from "../model/Report";
import { Reports } from "../model/Reports";
import { SysUtils } from "~/utils/sys.utils";


declare const android: any;

@Component({
    selector: "app-report",
    moduleId: module.id,
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.css"]
})

export class ReportComponent implements AfterViewInit {

    private reports: Reports = new Reports();
    private displayReports: Array<Report> = [];

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
        this.reports.clear();

        this.cards.cards.forEach(element => {
            let readyDate = SysUtils.getDate(element.readyDate);        
            let year = readyDate.getFullYear();
            let month = readyDate.getMonth() + 1;           

            let today = new Date();
            let thisYear = today.getFullYear();
            let thisMonth = today.getMonth() + 1;

            this.putInOverallReport(element.status, element.totalAmount);
            this.putInYearlyReport(year, element.status, element.totalAmount);
            if (thisYear == year ) { 
                this.putInMonthlyReport(thisYear, month, element.status, element.totalAmount); 
            }
            this.reports.thisMonth.year = thisYear;
            this.reports.thisMonth.month = thisMonth;
            if (year == thisYear && month == thisMonth) {
                this.putInThisMonthReport(element.status, element.totalAmount);
            }
        });
        //end of foreach

        this.prepareDisplayReport();
    }

    private putInOverallReport(status: CardStatus, amount: number) {
        this.prepareReport(status, this.reports.overall, amount);
    }

    private putInYearlyReport(year: number, status: CardStatus, amount: number) {

        if (isNaN(year)) {
            return;
        }

        var yearInReport = false;

        this.reports.yearly.forEach(report => {
            if (report.year == year) {
                this.prepareReport(status, report, amount);
                yearInReport = true;
            }
        })

        if (!yearInReport) {
            let report = new Report();
            report.year = year;
            this.prepareReport(status, report, amount);
            this.reports.yearly.push(report);
        }
    }

    private putInMonthlyReport(year: number, month: number, status: CardStatus, amount: number) {
        var monthInReport = false;

        this.reports.monthly.forEach(report => {
            if (report.year == year && report.month == month) {
                this.prepareReport(status, report, amount);
                monthInReport = true;
            }
        })
        
        if (!monthInReport) {
            let report = new Report();
            report.year = year;
            report.month = month;
            this.prepareReport(status, report, amount);
            this.reports.monthly.push(report);
        }
    }

    private putInThisMonthReport(status: CardStatus, amount: number) {
        this.prepareReport(status, this.reports.thisMonth, amount);
    }

    private prepareReport(status: CardStatus, report: Report, amount: number) {
        report.total++;
        if (amount )
        report.spent += amount;
        switch(status) {
            case CardStatus.registered:
            report.registered++;
            break;
            case CardStatus.done:
            report.done++;
            break;
            case CardStatus.ready:
            report.ready++;
            break;
            case CardStatus.remove:
            report.remove++;
            break;
        }
    }

    private prepareDisplayReport() {
        this.displayReports = [];
        this.displayReports.push(this.reports.thisMonth);
        this.displayReports.push(this.reports.overall);
        this.reports.monthly.forEach(report => {
            this.displayReports.push(report);
        })
        this.reports.yearly.forEach(report => {
            this.displayReports.push(report);
        })
    }

}