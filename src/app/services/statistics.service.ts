import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ 'providedIn': 'root' })
export class StatisticsService {

    constructor(
        private _httpClient: HttpClient
    ) { }
    getAll() {
        const url = "https://corona-api.com/"
        return this._httpClient.get(url)
    }

    getListOfCountries() {
        const url = "https://corona-api.com/countries"
        return this._httpClient.get(url)
    }

    getGlobalTimeLine() {
        const url = "https://corona-api.com/timeline"
        return this._httpClient.get(url)
    }

    getCountrySpecificData(code) {
        const url = "https://corona-api.com/countries/" + String(code);
        return this._httpClient.get(url)
    }
}