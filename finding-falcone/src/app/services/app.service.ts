import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHttpService } from './process-http.service';
import { baseURL} from '../shared/baseurl';
import { Planet } from '../shared/planet';
import { Vehicle } from '../shared/vehicle';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers: HttpHeaders;

  constructor(private http: HttpClient , private processHttp: ProcessHttpService) {
    this.headers = new HttpHeaders().append("Accept", "application/json").append("Content-Type", "application/json");
   }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(baseURL + 'planets').pipe(catchError(this.processHttp.handleError));
  }
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(baseURL + 'vehicles').pipe(catchError(this.processHttp.handleError));
  }
  getToken(): Observable<[]> {
    return this.http.post<[]>(baseURL + 'token' , null, {headers: this.headers}).pipe(catchError(this.processHttp.handleError));
  }
  findFalcone(data: any): Observable<[]> {
    return this.http.post<[]>(baseURL + 'find' , data, {headers: this.headers}).pipe(catchError(this.processHttp.handleError));
  }
}
