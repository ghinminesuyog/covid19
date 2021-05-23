import { Component, OnInit } from '@angular/core';
import { Cases } from 'src/app/models/cases.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  graphName;
  confirmed; deceased; recovered; active;

  deathChartData = [];
  confirmedChartData = [];
  activeChartData = []
  recoveredChartData = [];
  constructor(
    private _statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {

    this.graphName = 'recovered'

    this._statisticsService.getGlobalTimeLine().subscribe(
      (response: any) => {


        this.deathChartData = [];
        this.confirmedChartData = [];
        this.activeChartData = [];
        this.recoveredChartData = [];


        for (var i = 100; i > 0; i--) {
          const value = response.data[i];
          const cases = new Cases()
          cases.parseFromJSON(value);

          const displayDate = this.constructDisplayDate(cases.date)
          this.deathChartData.push({
            date: displayDate, parameter: cases.deceased
          });
          this.activeChartData.push({
            date: displayDate, parameter: cases.active
          });
          this.confirmedChartData.push({
            date: displayDate, parameter: cases.confirmed
          });
          this.recoveredChartData.push({
            date: displayDate, parameter: cases.recovered
          });
        }
        this.confirmed = this.confirmedChartData[this.confirmedChartData.length - 1].parameter;
        this.deceased = this.deathChartData[this.deathChartData.length - 1].parameter;
        this.active = this.activeChartData[this.activeChartData.length - 1].parameter;
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

  selectMatrix(matrix) {
    this.graphName = matrix
  }
}
