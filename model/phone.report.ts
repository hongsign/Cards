
export class PhoneReport {
    public total: number = 0;
    public oldest: number = 0;
    public middle: number = 0;
    public newest: number = 0;
    public s8: number = 0;
    public iphone6: number = 0;
    public iphone7: number = 0;
    public nubia: number = 0;

    public clear() {
        this.total = 0;
        this.oldest = 0;
        this.middle = 0;
        this.newest = 0;
        this.s8 = 0;
        this.iphone6 = 0;
        this.iphone7 = 0;
        this.nubia = 0;
    }
}