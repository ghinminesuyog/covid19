import { Component, OnInit, Input } from '@angular/core';
import { Cases } from 'src/app/models/cases.model';
import { Country } from 'src/app/models/country.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() searchTerm;
  countries;
  searchedCountries;
  selectedCountry;

  confirmed; deceased; recovered;

  deathChartData = [];
  confirmedChartData = [];
  // activeChartData = []
  recoveredChartData = [];

  noCountrySelected = true;

  constructor(
    private _statisticsService: StatisticsService
  ) { }

  ngOnInit() {

    this.fetchGlobalData();


  }
  deselectCountry(){
    this.selectedCountry = null;
    this.searchedCountries = null;
    this.noCountrySelected = true;

    this.fetchGlobalData()
  }

  hideSearchCountryList() {
    console.log('hiding')
    this.searchTerm = ""
  }

  displaySearchCountryList() {
    if (this.searchTerm == null || this.searchTerm == "") {
      return false
    }
    return true
  }

  fetchGlobalData() {
    this._statisticsService.getListOfCountries().subscribe(
      (response: any) => {
        console.log(response);

        this.countries = response.data.map(
          (value) => {
            const country = new Country()
            country.parseFromJSON(value);
            return country
          }
        );
      },
      (error) => {
        console.error(error)
      }
    );


    this._statisticsService.getGlobalTimeLine().subscribe(
      (response: any) => {
        console.log(response)

        this.deathChartData = [];
        this.confirmedChartData = [];
        // this.activeChartData = [];
        this.recoveredChartData = [];


        for (var i = 100; i > 0; i--) {
          const value = response.data[i];
          const cases = new Cases()
          cases.parseFromJSON(value);

          const displayDate = this.constructDisplayDate(cases.date)
          this.deathChartData.push({
            date: displayDate, parameter: cases.deceased
          });
          // this.activeChartData.push({
          //   date: displayDate, parameter: cases.active
          // });
          this.confirmedChartData.push({
            date: displayDate, parameter: cases.confirmed
          });
          this.recoveredChartData.push({
            date: displayDate, parameter: cases.recovered
          });
        }
        this.confirmed = this.confirmedChartData[this.confirmedChartData.length - 1].parameter;
        this.deceased = this.deathChartData[this.deathChartData.length - 1].parameter;
        // this.active = this.activeChartData[this.activeChartData.length - 1].parameter;
        this.recovered = this.recoveredChartData[this.recoveredChartData.length - 1].parameter;
      },
      (error) => {
        console.error(error)
      }
    )
  }

  constructDisplayDate(date: Date) {
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    return date.getDate() + " " + months[date.getMonth()]
  }

  searchTermUpdate(newTerm) {
    this.searchedCountries = this.countries.filter(
      (country) => {
        const term = country.name.toLowerCase();
        if (term.includes(newTerm.toLowerCase())) {
          return country
        }
      }
    )

    if (newTerm == "" || newTerm == null) {
      this.searchedCountries = this.countries;
      this.noCountrySelected = true
    }
  }

  selectCountry(code) {

    this.noCountrySelected = false;

    console.log(this.searchedCountries)


    this.searchedCountries = this.countries.filter(
      (country) => {
        if (country.code == code) {

          return country
        }
      }
    );
    console.log(this.searchedCountries);
    this.selectedCountry =this.searchedCountries[0];
    console.log(this.selectedCountry);
    this.searchTerm = this.selectedCountry.name;

    this._statisticsService.getCountrySpecificData(code).subscribe(
      (response: any) => {
        console.log(response);


        response.data;

        this.confirmed = response.data.latest_data.confirmed;
        this.deceased = response.data.latest_data.deceased;
        // this.active =response.data.latest_data.;
        this.recovered = response.data.latest_data.recovered;


        this.deathChartData = [];
        this.confirmedChartData = [];
        // this.activeChartData = [];
        this.recoveredChartData = [];


        for (var i = 100; i > 0; i--) {
          const value = response.data.timeline[i];

          const cases = new Cases()
          cases.parseFromJSON(value);



          const displayDate = this.constructDisplayDate(cases.date)
          this.deathChartData.push({
            date: displayDate, parameter: cases.deceased
          });
          // this.activeChartData.push({
          //   date: displayDate, parameter: cases.active
          // });
          this.confirmedChartData.push({
            date: displayDate, parameter: cases.confirmed
          });
          this.recoveredChartData.push({
            date: displayDate, parameter: cases.recovered
          });
        }
      },
      (error) => {
        console.error(error)
      }
    );

  }
}
