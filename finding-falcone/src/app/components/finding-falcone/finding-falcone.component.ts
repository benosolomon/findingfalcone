import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';
import { Planet } from '../../shared/planet';
import { Vehicle } from '../../shared/vehicle';

@Component({
  selector: 'app-finding-falcone',
  templateUrl: './finding-falcone.component.html',
  styleUrls: ['./finding-falcone.component.scss']
})
export class FindingFalconeComponent implements OnInit , OnDestroy {
  planets: Planet[] = [];
  planeterrMessage;
  vehicles: Vehicle[] = [];
  vehicleerrMessage;
  subscriptionArray =  [];
  token;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.subscriptionArray['getPlanet'] = this.appService.getPlanets().subscribe((data) => {
      this.planets = [...data];
    }, errMsg => this.planeterrMessage = errMsg);

    this.subscriptionArray['getVehicle'] = this.appService.getVehicles().subscribe((data) => {
      this.vehicles = [...data];
    }, errMsg => this.planeterrMessage = errMsg);

    this.subscriptionArray['getToken'] = this.appService.getToken().subscribe((data) => {
      this.token = {...data};
    }, errMsg => this.planeterrMessage = errMsg);


  }

  ngOnDestroy(): void {
    if (this.subscriptionArray && this.subscriptionArray.length > 0) {
      this.subscriptionArray.forEach((item) => item.unsubscribe());
    }
  }


}
