import { Injectable, Component, OnInit } from '@angular/core';
//import { HttpClient, HttpHandler } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { DataWeather } from '../entities/DataWeather';
import { Logs } from 'selenium-webdriver';
import { City } from '../entities/City';

@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})

@Injectable()
export class LineaComponent {
  row: number = 0;
  fahr: number = 0;
  show: Boolean = false;
  citySelected: string = 'Obregon';
  public listDataWeather: Array<DataWeather> = [];
  dataWeather: DataWeather;
  listCities: Array<City> = [];
  
  public urlNetCore: string = 'https://localhost:44302/api/city';
  public urlWeatherbit: string = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=27.4833&lon=-109.9333&key=2e65064e0bda4ad3b54fa6ff0b96aeb5';
  public getDatoUrl: any = [];
  private changeScale: boolean = true;

  constructor(private http: Http) { }

  ngOnInit() {
    this.dataWeather = new DataWeather();
    this.getDataNetCore();
  }

  public lineChartData: Array<any> = [{}];

  public lineChartDatasCelcius: number[] = [];
  public lineChartDatasFahrenheit: number[] = [];
  public lineChartLabelsDate: string[] = [];
  public lineChartLabels: Array<string> = ['Enero-16', 'Enero-17', 'Enero-18', 'Enero-19', 'Enero-20', 'Enero-21', 'Enero-22', 'Enero-23', 'Enero-24', 'Enero-25', 'Enero-26', 'Enero-27', 'Enero-28', 'Enero-29', 'Enero-30', 'Enero-31'];

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
    },
    { // red
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#eee',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

 //events by change Temperature
  public selectChangeTemperature(event: any): void {
    this.changeTemperature(event.target.value);
  }

  //events by change city
  public selectChangeCity(event: any): void {
    this.citySelected = event.target.value;
    this.getCityLatLong(this.citySelected);
  }

  //method .NET CORE
  public getDataNetCore(): void {
    this.http.get(this.urlNetCore).subscribe((res: Response) => {
      const result = res.json();
      this.listCities = result;
      if (this.listCities != []) {
      this.getCityLatLong(this.citySelected);
      }
    });
  }

  public getCityLatLong(city:string){
    this.listCities.forEach(element => {
      if (element.name == city) {
        this.getDataWeatherBit(element.latitude, element.length);        
      }
    });
  }

  //method http WeatherBit
  public getDataWeatherBit(latitude:String, lenght:String): void {
    this.http.get('https://api.weatherbit.io/v2.0/forecast/daily?lat='+ latitude + '&lon='+ lenght +'&key=2e65064e0bda4ad3b54fa6ff0b96aeb5').subscribe((res: Response) => {
      const result = res.json();
      this.getDatoUrl = result;
      if (this.getDatoUrl != []) {
        this.search();
      }
    });
  }

  public search(): void {
    this.getDatoUrl.data.forEach(element => {
      this.dataWeather = new DataWeather();
      this.dataWeather.tempCelcius = element.temp;

      this.fahr = (element.temp * 18 / 10 + 32);
      this.dataWeather.tempFahrenheit = this.fahr.toString();

      this.lineChartDatasFahrenheit[this.row] = this.fahr;
      this.lineChartDatasCelcius[this.row] = element.temp;
      this.lineChartLabelsDate[this.row] = element.datetime;

      this.dataWeather.registerDate = element.datetime;

      this.listDataWeather[this.row] = this.dataWeather;
      this.row++;
    });
    this.row = 0;
    this.changelinea();
  }

  public changelinea(): void {
    this.lineChartData = [{ data: this.lineChartDatasCelcius, label: this.citySelected }];
    this.lineChartLabels = this.lineChartLabelsDate;
    this.show = true;
  }

  public changeTemperature(temperature: any): void {
    if (temperature == "Celsius")
      this.lineChartData = [{ data: this.lineChartDatasCelcius, label: this.citySelected }];
    else
      this.lineChartData = [{ data: this.lineChartDatasFahrenheit, label: this.citySelected }];
  }
}
