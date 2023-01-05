import { Report } from "./Report";
import { PhoneReport } from "./phone.report";

export class Reports {
    public overall: Report = new Report();
    public yearly: Array<Report> = [];
    public monthly: Array<Report> = [];
    public thisMonth: Report = new Report();

    public clear() {
        this.overall.clear();
        this.yearly = [];
        this.monthly = [];
        this.thisMonth.clear(); 
    }
}