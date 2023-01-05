"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Permissions = require("nativescript-permissions");
var platform_1 = require("tns-core-modules/platform");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var cards_1 = require("../model/cards");
var file_utils_1 = require("../utils/file.utils");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(routerExtensions, cards, page) {
        this.routerExtensions = routerExtensions;
        this.cards = cards;
        this.page = page;
        this.fileUtils = new file_utils_1.FileUtils(cards);
    }
    LoginComponent.prototype.getPermission = function () {
        Permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE, "Needed for connectivity status").then(function () {
            console.log("Permission granted!");
        }).catch(function () {
            console.log("Permission is not granted (sadface)");
        });
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        console.log("login AfterViewInit called");
        console.log("screen height: " + platform_1.screen.mainScreen.heightPixels);
        this.page.actionBarHidden = true;
        //this.getPermission();
        this.code1.nativeElement.focus();
    };
    LoginComponent.prototype.onLoginTap = function () {
        var _this = this;
        if (!this.authenticate()) {
            this.clearCode();
            this.code1.nativeElement.focus();
            return;
        }
        this.fileUtils.read()
            .then(function (response) {
            //console.log("JSON CONTENT: " + JSON.stringify(response));
            _this.cards.populateCardsFromJsonObject(response);
            //console.log("JSON cardnumber: " + response[0].cardNumber);
            //console.log("JSON cardnumber: " + (<Array<Object>>response).length);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
        this.routerExtensions.navigate(["/list"], { clearHistory: true });
    };
    LoginComponent.prototype.onTextChange = function (args, who) {
        var textField = args.object;
        var number = +textField.text;
        if ((number >= 0) && (number <= 9)) {
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
            switch (who) {
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
    };
    LoginComponent.prototype.authenticate = function () {
        var passcode = 730618;
        var codeStr = this.code1.nativeElement.text
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
    };
    LoginComponent.prototype.clearCode = function () {
        this.code1.nativeElement.text = "";
        this.code2.nativeElement.text = "";
        this.code3.nativeElement.text = "";
        this.code4.nativeElement.text = "";
        this.code5.nativeElement.text = "";
        this.code6.nativeElement.text = "";
    };
    __decorate([
        core_1.ViewChild("code1"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "code1", void 0);
    __decorate([
        core_1.ViewChild("code2"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "code2", void 0);
    __decorate([
        core_1.ViewChild("code3"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "code3", void 0);
    __decorate([
        core_1.ViewChild("code4"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "code4", void 0);
    __decorate([
        core_1.ViewChild("code5"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "code5", void 0);
    __decorate([
        core_1.ViewChild("code6"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "code6", void 0);
    __decorate([
        core_1.ViewChild("login"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "login", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "app-login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            cards_1.Cards,
            page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
