import { stringify } from "@angular/core/src/render3/util";



export class SysUtils {
    
    static isNonEmptyString(str: string): boolean {
        return str && str.length > 0;
    }

    static isValidDate(str: string): boolean {
        if (str.length != 10) {
            return false;
        }
        return true;
    }

    static getPastOrFutureDate(from: Date, variant: number): Date {
        return new Date(from.setDate(from.getDate() + variant));
    }
    static startOfWeek(date: Date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0? -6 : 1);
        return new Date(date.setDate(diff));
    }
    static getLastDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    static getFirstDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    static getDate(dateStr): Date {  //yyyy-mm-dd
        var parts = dateStr.split("-");
        return new Date(parts[0], parts[1]-1, parts[2]);
    }
    static getFirstDayOfYear(year: number): Date {
        return new Date(year, 0, 1);
    }
    static getLastDayOfYear(year: number): Date {
        return new Date(year, 11, 31);
    }

    static isNumber(value: string | number): boolean {
       return ((value != null) && !isNaN(Number(value.toString())));
    }

    static isValidPhoneNumber(value: string): boolean {
        return (value != null) && (value.length == 12) 
            && (value.substr(3,1) == "-") && (value.substr(7,1) == "-");
    }
}