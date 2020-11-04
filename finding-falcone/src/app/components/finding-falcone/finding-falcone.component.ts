import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { AppService } from '../../services/app.service';
import { Planet } from '../../shared/planet';
import { Vehicle } from '../../shared/vehicle';

@Component({
  selector: 'app-finding-falcone',
  templateUrl: './finding-falcone.component.html',
  styleUrls: ['./finding-falcone.component.scss'],
})
export class FindingFalconeComponent implements OnInit, OnDestroy {
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  planets: Planet[] = [];
  planeterrMessage;
  vehicles: Vehicle[] = [];
  allVehicles: Vehicle[] = [];
  vehicleerrMessage;
  subscriptionArray = [];
  token;
  isFirstPlanetOpen = false;
  isSecondPlanetOpen = false;
  isThirdPlanetOpen = false;
  isFourthPlanetOpen = false;
  responseRecieved = false;
  firstCtrl = new FormControl();
  secondCtrl = new FormControl();
  thirdCtrl = new FormControl();
  fourthCtrl = new FormControl();
  filteredFirstCtrl: Observable<Planet[]>;
  filteredSecondCtrl: Observable<Planet[]>;
  filteredThirdCtrl: Observable<Planet[]>;
  filteredFourthCtrl: Observable<Planet[]>;
  distanceCovered;
  constructor(private appService: AppService, private router: Router) {
    this.filteredFirstCtrl = this.firstCtrl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map((data) => this._filterFirstPlanet(data))
    );
    this.filteredSecondCtrl = this.secondCtrl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map((data) => this._filterSecondPlanet(data))
    );

    this.filteredThirdCtrl = this.thirdCtrl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map((data) => this._filterThirdPlanet(data))
    );

    this.filteredFourthCtrl = this.fourthCtrl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map((data) => this._filterFourthPlanet(data))
    );
  }

  ngOnInit(): void {
    this.subscriptionArray[
      'revisedVehicle'
    ] = this.appService.onVehicleLogs().subscribe((data) => {
      this.vehicles = [...data.value];
    });
    this.subscriptionArray[
      'distanceCalculated'
    ] = this.appService.onDistanceChange().subscribe((data) => {
      this.distanceCovered = [...data.value];
    });

    this.subscriptionArray[
      'revisedPlanet'
    ] = this.appService.onPlanetLogs().subscribe((data) => {
      this.planets = [...data.value];
    });
    this.subscriptionArray[
      'getPlanet'
    ] = this.appService.getPlanets().subscribe(
      (data) => {
        this.planets = [...data];
        this.appService.allPlanets = [...data];
      },
      (errMsg) => (this.planeterrMessage = errMsg)
    );

    this.subscriptionArray[
      'getVehicle'
    ] = this.appService.getVehicles().subscribe(
      (data) => {
        this.vehicles = [...data];
        this.allVehicles = [...data];
        this.appService.allVehicles = [...data];
        this.responseRecieved = true;
      },
      (errMsg) => {
        this.planeterrMessage = errMsg;
        this.responseRecieved = true;
      }
    );
  }

  displayFn(planet: Planet): string {
    return planet && planet.name ? planet.name : '';
  }
  updatePlanet(data) {
    this.appService.planetChanges(data);
  }

  private _filterFirstPlanet(value: string): Planet[] {
    this.isFirstPlanetOpen = false;
    if (this.planets.find((data) => data.name === value)) {
      this.isFirstPlanetOpen = true;
      //
    }
    const filterValue = value.toLowerCase();
    const data = this.planets.filter(
      (datas) =>
        datas.name !== this.secondCtrl.value &&
        datas.name !== this.thirdCtrl.value &&
        datas.name !== this.fourthCtrl.value
    );
    if (data && data.length < this.planets.length) {
      return data.filter(
        (datas) => datas.name.toLowerCase().indexOf(filterValue) === 0
      );
    } else {
      return this.planets.filter(
        (datas) => datas.name.toLowerCase().indexOf(filterValue) === 0
      );
    }
  }

  private _filterSecondPlanet(value: string): Planet[] {
    this.isSecondPlanetOpen = false;
    if (this.planets.find((data) => data.name === value)) {
      this.isSecondPlanetOpen = true;
      // this.appService.planetChanges(value);
    }
    const filterValue = value.toLowerCase();
    const data = this.planets.filter(
      (datas) =>
        datas.name !== this.firstCtrl.value &&
        datas.name !== this.thirdCtrl.value &&
        datas.name !== this.fourthCtrl.value
    );
    if (data && data.length < this.planets.length) {
      return data.filter(
        (datas) => datas.name.toLowerCase().indexOf(filterValue) === 0
      );
    } else {
      return this.planets.filter(
        (datas) => datas.name.toLowerCase().indexOf(filterValue) === 0
      );
    }
  }

  private _filterThirdPlanet(value: string): Planet[] {
    this.isThirdPlanetOpen = false;

    if (this.planets.find((data) => data.name === value)) {
      this.isThirdPlanetOpen = true;
      // this.appService.planetChanges(value);
    }
    const filterValue = value.toLowerCase();
    const data = this.planets.filter(
      (datas) =>
        datas.name !== this.firstCtrl.value &&
        datas.name !== this.secondCtrl.value &&
        datas.name !== this.fourthCtrl.value
    );
    if (data && data.length < this.planets.length) {
      return data.filter(
        (datas) => datas.name.toLowerCase().indexOf(filterValue) === 0
      );
    } else {
      return this.planets.filter(
        (datas) => datas.name.toLowerCase().indexOf(filterValue) === 0
      );
    }
  }
  private _filterFourthPlanet(value: string): Planet[] {
    this.isFourthPlanetOpen = false;
    if (this.planets.find((data) => data.name === value)) {
      this.isFourthPlanetOpen = true;
      // this.appService.planetChanges(value);
    }
    const filterValue = value.toLowerCase();
    const data = this.planets.filter(
      (datas) =>
        datas.name !== this.firstCtrl.value &&
        datas.name !== this.secondCtrl.value &&
        datas.name !== this.thirdCtrl.value
    );
    if (data && data.length < this.planets.length) {
      return data.filter(
        (datas) => datas.name.toLowerCase().indexOf(filterValue) === 0
      );
    } else {
      return this.planets.filter(
        (data) => data.name.toLowerCase().indexOf(filterValue) === 0
      );
    }
  }
  onFirstSelection(event: MatSelectionListChange) {
    console.log('Event', event.option.value);
    const data = this.planets.find(
      (data) => data.name === this.firstCtrl.value
    );
    this.appService.vehicleChanges(event.option.value);
    this.distanceCalculated(data, event.option.value);
  }
  onSecondSelection(event: MatSelectionListChange) {
    console.log('Event', event.option.value);
    const data = this.planets.find(
      (data) => data.name === this.secondCtrl.value
    );
    this.appService.vehicleChanges(event.option.value);
  }
  onThirdSelection(event: MatSelectionListChange) {
    console.log('Event', event.option.value);
    const data = this.planets.find(
      (data) => data.name === this.thirdCtrl.value
    );
    this.appService.vehicleChanges(event.option.value);
  }
  onFourthSelection(event: MatSelectionListChange) {
    console.log('Event', event.option.value);
    const data = this.planets.find(
      (data) => data.name === this.fourthCtrl.value
    );
    this.appService.vehicleChanges(event.option.value);
  }
  checkDisable(vehicle, fetchFrom) {
    if (fetchFrom === 'first') {
      const data = this.planets.find(
        (data) => data.name === this.firstCtrl.value
      );
      if (
        (data && vehicle.max_distance < data.distance) ||
        vehicle.total_no === 0
      ) {
        return true;
      } else {
        return false;
      }
    } else if (fetchFrom === 'second') {
      const data = this.planets.find(
        (data) => data.name === this.secondCtrl.value
      );

      if (
        (data && vehicle.max_distance < data.distance) ||
        vehicle.total_no === 0
      ) {
        return true;
      } else {
        return false;
      }
    } else if (fetchFrom === 'third') {
      const data = this.planets.find(
        (data) => data.name === this.thirdCtrl.value
      );
      if (
        (data && vehicle.max_distance < data.distance) ||
        vehicle.total_no === 0
      ) {
        return true;
      } else {
        return false;
      }
    } else if (fetchFrom === 'fourth') {
      const data = this.planets.find(
        (data) => data.name === this.fourthCtrl.value
      );
      if (
        (data && vehicle.max_distance < data.distance) ||
        vehicle.total_no === 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  resetGame() {
    this.router.navigate(['../home']);
  }

  distanceCalculated(planet, vehicles) {}
  ngOnDestroy(): void {
    if (this.subscriptionArray && this.subscriptionArray.length > 0) {
      this.subscriptionArray.forEach((item) => item.unsubscribe());
      this.appService.allPlanets = [];
      this.appService.allVehicles = [];
      this.appService.selectedPlanet = [];
    }
  }
}
