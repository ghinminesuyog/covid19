import { Component, OnInit, ViewChild, TemplateRef, Input, OnChanges } from '@angular/core';
import { IgxSizeScaleComponent } from "igniteui-angular-charts";
import { IgxValueBrushScaleComponent } from "igniteui-angular-charts";
import { MarkerType } from "igniteui-angular-charts";
import { IgxGeographicMapComponent } from 'igniteui-angular-maps';
import { IgxDataContext } from "igniteui-angular-core";
import { IgxShapeDataSource } from "igniteui-angular-core";
import { IgxGeographicProportionalSymbolSeriesComponent } from "igniteui-angular-maps";
import { StatisticsService } from 'src/app/services/statistics.service';
import { Country } from 'src/app/models/country.model';


@Component({
  selector: 'global-map-graph',
  templateUrl: './global-map-graph.component.html',
  styleUrls: ['./global-map-graph.component.scss']
})
export class GlobalMapGraphComponent implements OnInit, OnChanges {

  @Input() graphName;
  @ViewChild("map", { static: true })
  public map: IgxGeographicMapComponent;
  @ViewChild("template", { static: true })
  public tooltipTemplate: TemplateRef<object>;

  maxValue;
  minValue;

  hueColor = "#2ba848";

  isLoading = true;

  constructor(private _statisticsService: StatisticsService) { }

  ngOnInit(): void {
    if (this.graphName == 'active') {
      this.hueColor = '#007bff'
    } else if (this.graphName == 'deceased') {
      this.hueColor = '#6e777f'
    } else if (this.graphName == 'confirmed') {
      this.hueColor = '#ff073a'
    } else if (this.graphName == 'recovered') {
      this.hueColor = '#2ba848'
    }
  }

  ngOnChanges() {

    this._statisticsService.getListOfCountries().subscribe(
      (response: any) => {
        this.isLoading = true;
        try {
          this.map.series.clear();
          this.maxValue = null;
          this.minValue = null;
          // console.log('Set null')
        } catch (err) {
          console.error(err)
        }

        console.log(response);

        const mappedData = response.data.map(
          (value) => {
            const country = new Country()
            country.parseFromJSON(value);


            const alteredData = {
              "cap": true,
              "pop": 1,
              "lat": country.latitude,
              "lon": country.longitude,
              "country": country.name,
              "name": country.name,
              "value": country.latest[this.graphName]
            }

            if (this.maxValue == null) {
              this.maxValue = country.latest[this.graphName]
            }
            if (this.minValue == null) {
              this.minValue = country.latest[this.graphName]
            }
            if (country.latest[this.graphName] > 0 && country.latest[this.graphName] < this.minValue) {
              this.minValue == country.latest[this.graphName]
            }
            if (country.latest[this.graphName] > 0 && country.latest[this.graphName] > this.maxValue) {
              this.maxValue = country.latest[this.graphName]
            }

            this.addSeriesWith([alteredData]);

            return country
          }
        )
        // data = mappedData.map((value) => {
        //   const alteredData = {
        //     "cap": true,
        //     "pop": 1,
        //     "lat": value.latitude,
        //     "lon": value.longitude,
        //     "country": value.name,
        //     "name": value.name,
        //     "value": value.latest.recovered
        //   }
        //   return alteredData
        // });
        // console.log(data)

        this.isLoading = false;
      },
      (err) => {
        console.error(err)
      }
    )

  }



  public addSeriesWith(locations: any[]) {
    if (this.graphName == 'active') {
      this.hueColor = '#007bff'
    } else if (this.graphName == 'deceased') {
      this.hueColor = '#6e777f'
    } else if (this.graphName == 'confirmed') {
      this.hueColor = '#ff073a'
    } else if (this.graphName == 'recovered') {
      this.hueColor = '#2ba848'
    }
    const sizeScale = new IgxSizeScaleComponent();
    sizeScale.minimumValue = locations[0].value / (5 * this.minValue);
    sizeScale.maximumValue = locations[0].value / this.maxValue;

    const brushes = [
      `${this.hueColor}66`,
    ];

    const brushScale = new IgxValueBrushScaleComponent();
    brushScale.brushes = brushes;
    brushScale.minimumValue = 1;
    brushScale.maximumValue = 30;

    const symbolSeries = new IgxGeographicProportionalSymbolSeriesComponent();
    symbolSeries.dataSource = locations;
    symbolSeries.markerType = MarkerType.Circle;
    symbolSeries.radiusScale = sizeScale;
    symbolSeries.fillScale = brushScale;
    symbolSeries.fillMemberPath = "pop";
    symbolSeries.radiusMemberPath = "pop";
    symbolSeries.latitudeMemberPath = "lat";
    symbolSeries.longitudeMemberPath = "lon";
    symbolSeries.markerOutline = this.hueColor;
    symbolSeries.tooltipTemplate = this.tooltipTemplate;
    // symbolSeries.radiusScale = new IgxSizeScaleComponent()

    this.map.series.add(symbolSeries);
  }


}
