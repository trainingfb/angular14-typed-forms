import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-demo2b',
  template: `
    <input
      [formControl]="input"
      type="text" class="form-control" placeholder="Search City"
    >
    <div *ngIf="meteo$ | async as meteo">
      {{meteo.main.temp}}°
      <img [src]="'http://openweathermap.org/img/w/' + meteo.weather[0].icon + '.png'" alt="">
    </div>
  `,
})
export class Demo2bComponent {
  input = new FormControl('');

  meteo$: Observable<Meteo | null> =  this.input.valueChanges
    .pipe(
      filter(text => text!.length > 2),
      // with predicate
      // filter((text):text is string => text !== undefined && text !== null),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(
        text => this.http.get<Meteo>(`http://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534`)
          .pipe(
            catchError(() => of(null))
          )
      )
    );

  constructor(private http: HttpClient) {}
}


// meteo

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Meteo {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
