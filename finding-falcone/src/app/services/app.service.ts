import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHttpService } from './process-http.service';
import { baseURL } from '../shared/baseurl';
import { Planet } from '../shared/planet';
import { Vehicle } from '../shared/vehicle';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  allVehicles: Vehicle[] = [];
  allPlanets: Planet[] = [];
  planetSubject: Subject<any>;
  timeReached;
  vehicleSubject: Subject<any>;
  distanceCalculatedSubject: Subject<any>;
  selectedPlanet: Planet[] = [];
  headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private processHttp: ProcessHttpService
  ) {
    this.headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    this.distanceCalculatedSubject = new Subject<any>();

    this.planetSubject = new Subject<any>();

    this.vehicleSubject = new Subject<any>();
  }

  getPlanets(): Observable<Planet[]> {
    return this.http
      .get<Planet[]>(baseURL + 'planets')
      .pipe(catchError(this.processHttp.handleError));
  }
  getVehicles(): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(baseURL + 'vehicles')
      .pipe(catchError(this.processHttp.handleError));
  }
  getToken(): Observable<[]> {
    return this.http
      .post<[]>(baseURL + 'token', null, { headers: this.headers })
      .pipe(catchError(this.processHttp.handleError));
  }
  findFalcone(data: any): Observable<[]> {
    return this.http
      .post<[]>(baseURL + 'find', data, { headers: this.headers })
      .pipe(catchError(this.processHttp.handleError));
  }
  planetChanges(data) {
    this.allPlanets = this.allPlanets.filter((datas) => datas.name !== data);
    this.selectedPlanet = [...this.allPlanets];
    this.planetSubject.next({ value: [...this.selectedPlanet] });
  }
  vehicleChanges(data) {
    this.allVehicles
      .filter((datas) => datas.name === data.name)
      .filter((datas) => (datas.total_no = datas.total_no - 1));
    this.vehicleSubject.next({ value: [...this.allVehicles] });
  }
  onPlanetLogs(): Observable<any> {
    return this.planetSubject.asObservable();
  }
  onVehicleLogs(): Observable<any> {
    return this.vehicleSubject.asObservable();
  }
  distanceChanges(data) {
    this.distanceCalculatedSubject.next({});
  }
  onDistanceChange(): Observable<any> {
    return this.distanceCalculatedSubject.asObservable();
  }
}
