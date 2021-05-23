import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Cases } from 'src/app/models/cases.model';

@Component({
  selector: 'global-chart',
  templateUrl: './global-chart.component.html',
  styleUrls: ['./global-chart.component.scss']
})
export class GlobalChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() graphName;
  @Input() graphNumber;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options

  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defa;

  hueColor = '#333'
  constructor() {

  }

  ngOnChanges() {

    if (this.graphName == 'active') {
      this.hueColor = '#007bff'
    } else if (this.graphName == 'deceased') {
      this.hueColor = '#6e777f'
    } else if (this.graphName == 'confirmed') {
      this.hueColor = '#ff073a'
    } else if (this.graphName == 'recovered') {
      this.hueColor = '#2ba848'
    }

    this.chartOptions = {
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 100000
            },
          }
        ]
      },
      chart: {
        type: 'line',
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories:
          this.data.map(
            (value) => {
              return value.date
            })
        ,
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        labels: {
          enabled: false,
          step: 48,
          style: {
            fontFamily: 'Lato',
            fontSize: '14',
            fontWeight: '500',
            color: this.hueColor
          }
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        gridLineColor: 'transparent',

        labels: {
          enabled: false,
          step: 2
        }
      },
      tooltip: {
        valueSuffix: ''
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillOpacity: 0,
          color: this.hueColor
        }
      },
      series: [
        {
          type: 'area',
          name: this.graphName,
          data:
            this.data.map(
              (value) => {
                return value?.parameter
              }
            )

          ,
          pointInterval: null,
          pointStart: null
        }
      ]
    }
  }

  ngOnInit() {

  }


}
