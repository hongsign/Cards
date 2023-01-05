"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SysUtils = /** @class */ (function () {
    function SysUtils() {
    }
    SysUtils.isNonEmptyString = function (str) {
        return str && str.length > 0;
    };
    SysUtils.isValidDate = function (str) {
        if (str.length != 10) {
            return false;
        }
        return true;
    };
    SysUtils.getPastOrFutureDate = function (from, variant) {
        return new Date(from.setDate(from.getDate() + variant));
    };
    SysUtils.startOfWeek = function (date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };
    SysUtils.getLastDayOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    };
    SysUtils.getFirstDayOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };
    SysUtils.getDate = function (dateStr) {
        var parts = dateStr.split("-");
        return new Date(parts[0], parts[1] - 1, parts[2]);
    };
    SysUtils.getFirstDayOfYear = function (year) {
        return new Date(year, 0, 1);
    };
    SysUtils.getLastDayOfYear = function (year) {
        return new Date(year, 11, 31);
    };
    SysUtils.isNumber = function (value) {
        return ((value != null) && !isNaN(Number(value.toString())));
    };
    SysUtils.isValidPhoneNumber = function (value) {
        return (value != null) && (value.length == 12)
            && (value.substr(3, 1) == "-") && (value.substr(7, 1) == "-");
    };
    return SysUtils;
}());
exports.SysUtils = SysUtils;
