import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CountryListComponent implements OnInit, OnChanges {

  @Input() countries: Country[];
  displayCountries: Country[] = [];

  @Input() searchTerm;

  isSortedAscendingByConfirmed;
  isSortedAscendingByDeceased;
  isSortedAscendingByName;
  isSortedAscendingByRecovered;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.displayCountries = this.countries;
    // this.isSortedAscendingByConfirmed = null
    // this.sortByConfirmed();

    if (this.displayCountries) {
      this.isSortedAscendingByConfirmed = null
      this.sortByConfirmed();
    }
  }

  searchFor() {
    console.log(this.searchTerm);

    this.displayCountries = this.countries.filter(
      (value) => {
        const name = value.name.toLowerCase();
        const searchFor = this.searchTerm.toLowerCase();
        if (name.includes(searchFor)) {
          return value
        } else { return }
      }
    )
  }

  sortByName() {
    this.isSortedAscendingByDeceased = null;
    this.isSortedAscendingByConfirmed = null
    this.isSortedAscendingByRecovered = null;

    if (this.isSortedAscendingByName) {
      this.displayCountries.sort(
        (a, b) =>
          (a.name > b.name) ? 1 : -1
      )
    } else {
      this.displayCountries.sort(
        (a, b) =>
          (a.name > b.name) ? -1 : 1
      )
    }
    this.isSortedAscendingByName = !this.isSortedAscendingByName
  }

  sortByDeceased() {
    this.isSortedAscendingByName = null;
    this.isSortedAscendingByConfirmed = null
    this.isSortedAscendingByRecovered = null

    if (this.isSortedAscendingByDeceased) {
      this.displayCountries.sort(
        (a, b) =>
          (a.latest.deceased > b.latest.deceased) ? 1 : -1
      )
    } else {
      this.displayCountries.sort(
        (a, b) =>
          (a.latest.deceased > b.latest.deceased) ? -1 : 1
      )
    }
    this.isSortedAscendingByDeceased = !this.isSortedAscendingByDeceased

  }


  sortByConfirmed() {
    this.isSortedAscendingByName = null;
    this.isSortedAscendingByDeceased = null;
    this.isSortedAscendingByRecovered = null;

    if (this.isSortedAscendingByConfirmed) {
      this.displayCountries.sort(
        (a, b) =>
          (a.latest.confirmed > b.latest.confirmed) ? 1 : -1
      )
    } else {
      this.displayCountries.sort(
        (a, b) =>
          (a.latest.confirmed > b.latest.confirmed) ? -1 : 1
      )
    }

    this.isSortedAscendingByConfirmed = !this.isSortedAscendingByConfirmed;
  }

  sortByRecovered() {
    this.isSortedAscendingByName = null;
    this.isSortedAscendingByDeceased = null;
    this.isSortedAscendingByConfirmed = null;

    if (this.isSortedAscendingByRecovered) {
      this.displayCountries.sort(
        (a, b) =>
          (a.latest.recovered > b.latest.recovered) ? 1 : -1
      )
    } else {
      this.displayCountries.sort(
        (a, b) =>
          (a.latest.recovered > b.latest.recovered) ? -1 : 1
      )
    }

    this.isSortedAscendingByRecovered = !this.isSortedAscendingByRecovered;


  }

}
