
export class Report {
    public total: number = 0;
    public registered: number = 0;
    public done: number = 0;
    public ready: number = 0;
    public remove: number = 0;
    public spent: number = 0;

    public year: number = 0;
    public month: number = 0;

    public clear() {
        this.total = 0;
        this.registered = 0;
        this.done = 0;
        this.ready = 0;
        this.remove = 0;
        this.spent = 0;
        this.year = 0;
        this.month = 0;
    }
}