import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import * as Permissions from "nativescript-permissions";
import { screen } from "tns-core-modules/platform"
import { RouterEvent, NavigationEnd } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";

import { Cards } from "../model/cards";
import { FileUtils } from "../utils/file.utils";

declare const android: any;

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements AfterViewInit {

    @ViewChild("code1") code1: ElementRef;
    @ViewChild("code2") code2: ElementRef;
    @ViewChild("code3") code3: ElementRef;
    @ViewChild("code4") code4: ElementRef;
    @ViewChild("code5") code5: ElementRef;
    @ViewChild("code6") code6: ElementRef;
    @ViewChild("login") login: ElementRef;

    private fileUtils: FileUtils;

    public constructor(private routerExtensions: RouterExtensions, 
        private cards: Cards,
        private page: Page) {
        this.fileUtils = new FileUtils(cards);
    }

    public getPermission() {
        Permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE, "Needed for connectivity status").then(() => {
            console.log("Permission granted!");
        }).catch(() => {
            console.log("Permission is not granted (sadface)");
        });
      }

    ngAfterViewInit() {
        console.log("login AfterViewInit called");
        console.log("screen height: " + screen.mainScreen.heightPixels);
        this.page.actionBarHidden = true;
        //this.getPermission();
        this.code1.nativeElement.focus();

    }

    onLoginTap() {

        if (!this.authenticate()) {
            this.clearCode();
            this.code1.nativeElement.focus();
            return;
        }
        
        this.fileUtils.read()
        .then((response) => {
            //console.log("JSON CONTENT: " + JSON.stringify(response));
            this.cards.populateCardsFromJsonObject(response);
            //console.log("JSON cardnumber: " + response[0].cardNumber);
            //console.log("JSON cardnumber: " + (<Array<Object>>response).length);
        }, 
        function(error){
            console.log(JSON.stringify(error));
        });
        this.routerExtensions.navigate(["/list"], { clearHistory: true });
    }

    onTextChange(args, who) {
        let textField = <TextField>args.object;

        var number = +textField.text;
        if ((number>=0) && (number<=9)) {
            switch (who) {
                case 1:
                this.code2.nativeElement.focus();
                break;
                case 2:
                this.code3.nativeElement.focus();
                break;
                case 3:
                this.code4.nativeElement.focus();
                break;
                case 4:
                this.code5.nativeElement.focus();
                break;
                case 5:
                this.code6.nativeElement.focus();
                break;
                case 6:
                this.login.nativeElement.focus();
                break;
            }
        }
        else {
            switch(who) {
                case 1:
                this.code1.nativeElement.text = "";
                this.code1.nativeElement.focus();
                break;
                case 2:
                this.code2.nativeElement.text = "";
                this.code2.nativeElement.focus();
                break;
                case 3:
                this.code3.nativeElement.text = "";
                this.code3.nativeElement.focus();
                break;
                case 4:
                this.code4.nativeElement.text = "";
                this.code4.nativeElement.focus();
                break;
                case 5:
                this.code5.nativeElement.text = "";
                this.code5.nativeElement.focus();
                break;
                case 6:
                this.code6.nativeElement.text = "";
                this.code6.nativeElement.focus();
                break;
            }
            
        }
    }

    private authenticate(): boolean {
        var passcode = 730618;
        var codeStr: string = this.code1.nativeElement.text
            + this.code2.nativeElement.text
            + this.code3.nativeElement.text
            + this.code4.nativeElement.text
            + this.code5.nativeElement.text
            + this.code6.nativeElement.text;
        var code = +codeStr;
        
        if (passcode == code) {
            return true;
        }
        return false;
    }

    private clearCode() {
        this.code1.nativeElement.text = "";
        this.code2.nativeElement.text = "";
        this.code3.nativeElement.text = "";
        this.code4.nativeElement.text = "";
        this.code5.nativeElement.text = "";
        this.code6.nativeElement.text = "";
    }

}