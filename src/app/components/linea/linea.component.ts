import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';


@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})

@Injectable()
export class LineaComponent {
  private headers: HttpHandler;
  private url: string = 'https://localhost:44302/api/city/Obregon';
  public getDatoUrl: any = [];
  private changeScale:boolean = true;
  constructor(private http: HttpClient) { }
  public lineChartData: Array<any> = [
    { data: [33.5, 30, 32, 34, 33, 31, 28, 28, 31, 30, 30, 25, 24, 29], label: 'Obregon' },
    { data: [28, 39, 30, 30, 31, 32, 33.5, 30.5, 32, 34, 33, 31, 30, 30], label: 'Navojoa' },
    { data: [30, 32, 30, 33.5, 30, 32, 34, 33, 31, 30.5, 31, 33, 30.5, 31], label: 'Hermosillo' },
    { data: [30, 32, 30, 31, 29, 30, 30.5, 29, 33.5, 30, 32, 34, 33, 31], label: 'Nogales' }
  ];

  public lineChartLabels: Array<any> = ['Enero-16', 'Enero-17', 'Enero-18', 'Enero-19', 'Enero-20', 'Enero-21', 'Enero-22', 'Enero-23', 'Enero-24', 'Enero-25', 'Enero-26', 'Enero-27', 'Enero-28', 'Enero-29'];

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  public changeTemp(): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 12) + 25);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public getData(): void {

    this.http.get(this.url).subscribe(data => {
      this.getDatoUrl = data;

      if (this.getDatoUrl != []) {
        this.getDatoUrl;
      }
    });
  }
}
