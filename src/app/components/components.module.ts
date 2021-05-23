import { NgModule } from "@angular/core";
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NationalStatisticsComponent } from 'src/app/components/national-statistics/national-statistics.component';

import { CountryListComponent } from 'src/app/components/country-list/country-list.component';
import { SideBarComponent } from 'src/app/components/sidebar/sidebar.component';
import { GlobalChartComponent } from 'src/app/components/graphs/global-chart/global-chart.component';
import { GlobalMapGraphComponent } from 'src/app/components/graphs/global-map-graph/global-map-graph.component';

import { HighchartsChartModule } from "highcharts-angular";
import { IgxGeographicMapModule } from 'igniteui-angular-maps';
import { IgxDataChartInteractivityModule } from 'igniteui-angular-charts';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        HeaderComponent,
        NationalStatisticsComponent,
        CountryListComponent,
        SideBarComponent,
        GlobalChartComponent,
        GlobalMapGraphComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HighchartsChartModule,
        IgxGeographicMapModule,
        IgxDataChartInteractivityModule,
    ],
    exports: [
        HeaderComponent,
        NationalStatisticsComponent,
        CountryListComponent,
        SideBarComponent,
        GlobalChartComponent,
        GlobalMapGraphComponent
    ]
})
export class ComponentsModule { }