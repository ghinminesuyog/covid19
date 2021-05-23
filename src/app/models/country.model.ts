import { Cases } from "./cases.model";

export class Country {
    code;
    longitude;
    latitude;
    name;
    population;
    updatedAt;

    latest: Cases
    today: Cases

    parseFromJSON(data) {
        this.code = data["code"]
        this.longitude = (data["coordinates"])["longitude"];
        this.latitude = (data["coordinates"])["latitude"];
        this.name = data["name"];
        this.population = data["population"];
        this.updatedAt = new Date(data["updated_at"]);

        const latestCases = new Cases();
        latestCases.parseFromJSON(data["latest_data"]);
        this.latest = latestCases

        const todayCases = new Cases();
        todayCases.parseFromJSON(data["today"])
        this.today = todayCases
    }
}
