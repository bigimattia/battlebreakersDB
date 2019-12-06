import { Component, OnInit } from '@angular/core';
import { SaveStateService } from '../savestate.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public savestateservice: SaveStateService) { }
  set savestateservice_searchText(value: string) {
    this.savestateservice.searchText = value;
  }
  set savestateservice_activeFilters(value: boolean[]) {
    this.savestateservice.activeFilters = Object.assign([], value);
  }
  set savestateservice_filter_is_ASC(value: boolean[]) {
    this.savestateservice.filter_is_ASC = Object.assign([], value);
  }
  set savestateservice_filter_init(value: boolean) {
    this.savestateservice.filter_init = value;
  }
  set savestateservice_isClassSelected(value: boolean[]) {
    this.savestateservice.isClassSelected = Object.assign([], value);
  }
  set savestateservice_isColorSelected(value: boolean[]) {
    this.savestateservice.isColorSelected = Object.assign([], value);
  }
  set savestateservice_masterSelected(value: boolean) {
    this.savestateservice.masterSelected = value;
  }
  set savestateservice_masterSelected_color(value: boolean) {
    this.savestateservice.masterSelected_color = value;
  }
  ngOnInit() {
    //reset values for savestate.service
    this.savestateservice_searchText = "";
    this.savestateservice_activeFilters = [true, false, false, false, false, false, false, false];
    this.savestateservice_filter_is_ASC = [true, true, true, true, true, true, true, true];
    this.savestateservice_filter_init = false;
    this.savestateservice_isClassSelected = [true, true];
    this.savestateservice_isColorSelected = [true, true, true, true, true];
    this.savestateservice_masterSelected = true;
    this.savestateservice_masterSelected_color = true;
  }
}
