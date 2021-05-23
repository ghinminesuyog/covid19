
export class Cases {
    date;
    confirmed;
    critical;
    deceased;
    recovered;
    active;

    parseFromJSON(data) {
        this.date = new Date(data["date"])
        this.confirmed = data["confirmed"] ? data["confirmed"] : 0
        this.critical = data["critical"] ? data["critical"] : 0;
        this.deceased = data["deaths"] ? data["deaths"] : 0;
        this.recovered = data["recovered"] ? data["recovered"] : 0;
        this.active = data["active"] ? data["active"] : 0;
    }
}