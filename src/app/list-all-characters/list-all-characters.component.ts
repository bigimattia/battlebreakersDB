import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SaveStateService } from '../savestate.service';

import { Character } from '../Character';
import { CharacterService } from '../character.service';
import { CharacterClasses } from '../CharacterClasses';
import { ClassesService } from '../characterclasses.service';
import { ColorsService } from '../color.service';
import { isNgTemplate } from '@angular/compiler';
import { filter } from 'minimatch';
import { Color } from '../Color';
import { AbilitySys } from '../AbilitySys';
import { AbilitySysService } from '../abilitysys.service';


@Component({
  selector: 'app-list-all-characters',
  templateUrl: './list-all-characters.component.html',
  styleUrls: ['./list-all-characters.component.css']
})


export class ListAllCharactersComponent implements OnInit {
  DISPLAY_FILTERS_TEXT: string = "Show filters";
  HIDE_FILTERS_TEXT: string = "Remove filters";

  charactersList: Character[] = [];
  filteredCharacters: Character[] = [];
  local_activeFilters: boolean[] = [];
  local_filterASC: boolean[] = [];
  selected_filter: number;
  show_hide_button: string = this.DISPLAY_FILTERS_TEXT;

  classesList: CharacterClasses[] = [];
  colorList: Color[] = [];

  abilityList: AbilitySys[]=[];
  /*
  commanderAbilityList: AbilitySys[] = [];
  passsiveAbilityList: AbilitySys[] = [];
  specialAbilityList: AbilitySys[] = [];
  */
  checklist:any;
  checkedList:any;
  local_isClassSelected: boolean[] = [];

  get savestateservice_searchText(): string { 
    return this.savestateservice.searchText; 
  } 
  get savestateservice_activeFilters(): boolean[] { 
    return Object.assign([], this.savestateservice.activeFilters); 
  } 
  get savestateservice_filter_is_ASC(): boolean[] { 
    return Object.assign([], this.savestateservice.filter_is_ASC); 
  }
  get savestateservice_filter_init(): boolean {
    return this.savestateservice.filter_init;
  }
  get savestateservice_isClassSelected(): boolean[] {
    return Object.assign([], this.savestateservice.isClassSelected);
  }
  get savestateservice_masterSelected(): boolean{
    return this.savestateservice.masterSelected;
  }
  get savestateservice_isColorSelected(): boolean[]{
    return Object.assign([], this.savestateservice.isColorSelected);
  }
  get savestateservice_masterSelected_color(): boolean{
    return this.savestateservice.masterSelected_color;
  }
  get savestateservice_masterSelected_commanderAbility(): boolean {
    return this.savestateservice.masterSelected_commanderAbility;
  }
  get savestateservice_isCommanderAbilitySelected(): boolean[] {
    return Object.assign([], this.savestateservice.isCommanderAbilitySelected);
  }
  get savestateservice_masterSelected_passiveAbility(): boolean {
    return this.savestateservice.masterSelected_passiveAbility;
  }
  get savestateservice_isPassiveAbilitySelected(): boolean[]{
    return Object.assign([], this.savestateservice.isPassiveAbilitySelected);
  }
  get savestateservice_masterSelected_specialAbility(): boolean {
    return this.savestateservice.masterSelected_specialAbility;
  }
  get savestateservice_isSpecialAbilitySelected(): boolean [] {
    return Object.assign([], this.savestateservice.isSpecialAbilitySelected);
  }
  set savestateservice_searchText (value: string) { 
    this.savestateservice.searchText = value; 
  } 
  set savestateservice_activeFilters (value: boolean[]) { 
    this.savestateservice.activeFilters =  Object.assign([], value); 
  } 
  set savestateservice_filter_is_ASC (value: boolean[]) { 
    this.savestateservice.filter_is_ASC =  Object.assign([], value); 
  } 
  set savestateservice_filter_init(value: boolean) {
    this.savestateservice.filter_init = value;
  }
  set savestateservice_isClassSelected(value: boolean[]) {
    this.savestateservice.isClassSelected = Object.assign([], value);
  }
  set savestateservice_masterSelected(value: boolean) {
    this.savestateservice.masterSelected = value;
  }
  set savestateservice_isColorSelected(value: boolean[]) {
    this.savestateservice.isColorSelected = Object.assign([], value);
  }
  set savestateservice_masterSelected_color(value: boolean) {
    this.savestateservice.masterSelected_color = value;
  }
  set savestateservice_masterSelected_commanderAbility(value:boolean) {
    this.savestateservice.masterSelected_commanderAbility = value;
  }
  set savestateservice_isCommanderAbilitySelected(value: boolean[]){
    this.savestateservice.isCommanderAbilitySelected = Object.assign([], value);
  }
  set savestateservice_masterSelected_passiveAbility(value: boolean) {
    this.savestateservice.masterSelected_passiveAbility = value;
  }
  set savestateservice_isPassiveAbilitySelected(value: boolean[]){
    this.savestateservice.isPassiveAbilitySelected = Object.assign([], value);
  }
  set savestateservice_masterSelected_specialAbility(value: boolean) {
    this.savestateservice.masterSelected_specialAbility = value;
  }
  set savestateservice_isSpecialAbilitySelected(value: boolean[]){
    this.savestateservice.isSpecialAbilitySelected = Object.assign([], value);
  }


  setClasses(){
    this.classesList = this.classesService.getClasses();
  }
  getClass(id: number): CharacterClasses {
    return this.classesService.getClass(id);
  }
  setColors(){
    this.colorList = this.colorService.getColors();
  }
  getColor(index: number): Color{
    return this.colorService.getColor(index);
  }
  setAbilities(){/*       // DEPRECATED
    this.abilitySysService.getAbilities().forEach( (ability) => {
      if(ability.is_commander)
        this.commanderAbilityList.push(ability);
      if(ability.is_passive)
        this.passsiveAbilityList.push(ability);
      if(ability.is_special)
        this.specialAbilityList.push(ability);
    });*/

    this.abilityList = this.abilitySysService.getAbilities();
    console.log(this.abilityList);
  }
  getAbility(index: number):AbilitySys{
    return this.abilitySysService.getAbilityByID(index);
  }



  constructor(private characterService: CharacterService, private classesService: ClassesService, private colorService: ColorsService, private abilitySysService: AbilitySysService, public savestateservice: SaveStateService) { 
      this.setClasses();
      this.setColors();
      this.setAbilities();
  }

  ngOnInit() {    
    this.initializeFilter();
    this.initCollection();
    this.additionalFiltersApply();
    this.filterHandler();
  }


  additionalFiltersApply(){ //CHECKS ON INIT IF SOME FILTERS WERE PREVIOUSLY ACTIVE
    if(!this.savestateservice_masterSelected) {
        var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isClassSelected.length; i++) {
          if(this.savestateservice_isClassSelected[i]){
            temp.push(i);
          }
        } 
        
        this.updateFilteredCharacters(this.characterService.filterClass_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
    }
    if(!this.savestateservice_masterSelected_color) {
      var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isColorSelected.length; i++) {
          if(this.savestateservice_isColorSelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterColor_MULTI(temp, this.filteredCharacters));
    }
    if(!this.savestateservice_masterSelected_commanderAbility) {
      var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isCommanderAbilitySelected.length; i++) {
          if(this.savestateservice_isCommanderAbilitySelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterCommander_MULTI(temp, this.filteredCharacters));
    }  
    if(!this.savestateservice_masterSelected_passiveAbility) {
      var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isPassiveAbilitySelected.length; i++) {
          if(this.savestateservice_isPassiveAbilitySelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterPassive_MULTI(temp, this.filteredCharacters));
    }  
    if(!this.savestateservice_masterSelected_specialAbility) {
      var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isSpecialAbilitySelected.length; i++) {
          if(this.savestateservice_isSpecialAbilitySelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterSpecial_MULTI(temp, this.filteredCharacters));
    }     
  }

  filterHandler() {
    this.updateFilteredCharacters(this.filteredCharacters);
    
    if(this.savestateservice_searchText) {    //ON STARTUP CHECKS IF SEARCHTEXT WAS NULL OR NOT
      this.filterItem(this.savestateservice_searchText);
    }
  }

  setCharactersByID_ASC(): void {
    this.filteredCharacters = this.characterService.getCharactersByID_ASC(this.filteredCharacters);
  }
  setCharactersByID_DESC(): void {
    this.filteredCharacters = this.characterService.getCharactersByID_DESC(this.filteredCharacters);
  }

  setCharactersByRARITY_ASC(): void{
    this.filteredCharacters = this.characterService.getCharactersByRARITY_ASC(this.filteredCharacters);
  }

  setCharactersByRARITY_DESC(): void {
    this.filteredCharacters = this.characterService.getCharactersByRARITY_DESC(this.filteredCharacters);
  }


  //////////////////////////
  initCollection(){
    //init list
    this.charactersList = this.characterService.getCharacters();
    this.filteredCharacters = Object.assign([], this.charactersList);
    //at least one filter is always active
    if(this.savestateservice_filter_init) {
    this.local_activeFilters.forEach((item, index) => {
      if(item){
        //show filters if previously active
        document.getElementById("collapsingFilter").style.display = "block";
        //switch index looking for filter to active, then look if it is ASC or DESC
        //check savestate.service for info regarding indexes.
        switch(index){
          case 0: { 
            if(this.local_filterASC[index])
              this.setCharactersByID_ASC();
            else
              this.setCharactersByID_DESC();
            break;
          }
          case 1: {
            if(this.local_filterASC[index])
              this.setCharactersByRARITY_ASC();
            else
              this.setCharactersByRARITY_DESC();
            break;
          }
          case 2: {
            if(this.local_filterASC[index])
              this.setCharactersByCOLOR_ASC();
            else
              this.setCharactersByCOLOR_DESSC();
          break;
          }
          case 3: {
            if(this.local_filterASC[index])
              this.setCharactersByCLASS_ASC();
            else
              this.setCharactersByCLASS_DESC();
            break;
          }
          case 4: {
            if(this.local_filterASC[index])
              this.setCharactersByFACTION_ASC();
            else
              this.setCharactersByFACTION_DESC();
            break;
          }
          case 5: {
            if(this.local_filterASC[index])
              this.setCharactersByATK_ASC();
            else
              this.setCharactersByATK_DESC();
            break;
          }
          case 6: {
            if(this.local_filterASC[index])
              this.setCharactersByDEF_ASC();
            else
              this.setCharactersByDEF_DESC();
            break;
          }
          case 7: {
            if(this.local_filterASC[index])
              this.setCharactersByHP_ASC();
            else
              this.setCharactersByHP_DESC();
            break;
          }
        };
        //set selected filter to previous selected filter
        this.selected_filter = index;
      }else {
          //filter not active, doing nothing
      }
      
    });
   }else { //filter not init, taking default route
      this.setCharactersByID_ASC();
      this.local_activeFilters[0] = true;
      this.selected_filter = 0;
      this.savestateservice_activeFilters = this.local_activeFilters;
      }
  }
  //////////////////////////////


  updateFilter(){
    this.filteredCharacters = Object.assign([], this.charactersList);
  }


  initializeFilter(): void{
    this.local_activeFilters = Object.assign([], this.savestateservice_activeFilters);
    this.local_filterASC = Object.assign([], this.savestateservice_filter_is_ASC); //initialize array, this is needed for 
                                                                                    //updating savestate's values later on -> ex: filterByID_button_clickEvent() 
  }
 
  filterItem(value){
    if(!value){
        this.initializeFilter();
        this.initCollection();
        this.additionalFiltersApply();
    } // when nothing has typed
    this.filteredCharacters = Object.assign([], this.filteredCharacters).filter(character => character.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    
    this.savestateservice_searchText = value; //Update filter value and store it.
  }

  updateFilter_is_ASC(value: boolean, index: number){
    this.local_filterASC[index] = !value; //updates value at given index (check savestate for more info regarding indexes)
    this.savestateservice_filter_is_ASC = this.local_filterASC; //updates actual savestate value
  }

  /*
  Filters - EDIT INITCOLLECION ACCORDINGLY
  */

  //ID
  filterByID_button_clickEvent() {
    this.swapFilter(0); //0 -> ID
    if(this.local_filterASC[0]){
      this.setCharactersByID_DESC();
      this.updateFilter_is_ASC(this.local_filterASC[0], 0); //0 -> filterByID

    }  else {
      this.setCharactersByID_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[0], 0); //0 -> filterByID
    }
    this.filterHandler();
  }

  //rarity
  filterByRARITY_button_clickEvent() {
    this.swapFilter(1); //1->rarity
    if(this.local_filterASC[1]){
        this.setCharactersByRARITY_DESC();
        this.updateFilter_is_ASC(this.local_filterASC[1], 1);
    } else {
      this.setCharactersByRARITY_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[1], 1);
    }
    this.filterHandler();
  }


  setCharactersByCOLOR_ASC(): void {
    this.filteredCharacters = this.characterService.getCharactersByCOLOR_ASC(this.filteredCharacters);
  }
  setCharactersByCOLOR_DESSC(): void {
    this.filteredCharacters = this.characterService.getCharactersByCOLOR_DESC(this.filteredCharacters);
  }

  filterByColor_button_clickEvent() {
      this.swapFilter(2); //2->color
      if(this.local_filterASC[2]){
        this.setCharactersByCOLOR_DESSC();
        this.updateFilter_is_ASC(this.local_filterASC[2], 2);
    } else {
      this.setCharactersByCOLOR_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[2], 2);
    }
    this.filterHandler();
  }

  setCharactersByCLASS_ASC(): void {
    this.filteredCharacters = this.characterService.getCharactersByCLASS_ASC(this.filteredCharacters);
  }
  setCharactersByCLASS_DESC(): void {
    this.filteredCharacters = this.characterService.getCharactersByCLASS_DESC(this.filteredCharacters);
  }

  filterByClass_button_clickEvent() {
    this.swapFilter(3); //3->class
      if(this.local_filterASC[3]){
        this.setCharactersByCLASS_DESC();
        this.updateFilter_is_ASC(this.local_filterASC[3], 3);
    } else {
      this.setCharactersByCLASS_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[3], 3);
    }
    this.filterHandler();
  }

  setCharactersByFACTION_ASC(): void {
    this.filteredCharacters = this.characterService.getCharactersByFACTION_ASC(this.filteredCharacters);
  }
  setCharactersByFACTION_DESC(): void {
    this.filteredCharacters = this.characterService.getCharactersByFACTION_DESC(this.filteredCharacters);
  }
 
  filterByFaction_button_clickEvent() {
    this.swapFilter(4); //4->faction
      if(this.local_filterASC[4]){
        this.setCharactersByFACTION_DESC();
        this.updateFilter_is_ASC(this.local_filterASC[4], 4);
    } else {
      this.setCharactersByFACTION_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[4], 4);
    }
    this.filterHandler();
  }

  setCharactersByATK_ASC(): void {
    this.filteredCharacters = this.characterService.getCharactersByATK_ASC(this.filteredCharacters);
  }
  setCharactersByATK_DESC(): void {
    this.filteredCharacters = this.characterService.getCharactersByATK_DESC(this.filteredCharacters);
  }
  
  filterByATK_button_clickEvent() {
    this.swapFilter(5); //5->ATK
      if(this.local_filterASC[5]){
        this.setCharactersByATK_DESC();
        this.updateFilter_is_ASC(this.local_filterASC[5], 5);
    } else {
      this.setCharactersByATK_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[5], 5);
    }
    this.filterHandler();
  }

  setCharactersByDEF_ASC(): void {
    this.filteredCharacters = this.characterService.getCharactersByDEF_ASC(this.filteredCharacters);
  }
  setCharactersByDEF_DESC(): void {
    this.filteredCharacters = this.characterService.getCharactersByDEF_DESC(this.filteredCharacters);
  }

  filterByDEF_button_clickEvent() {
    this.swapFilter(6); //6->DEF
      if(this.local_filterASC[6]){
        this.setCharactersByDEF_DESC();
        this.updateFilter_is_ASC(this.local_filterASC[6], 6);
    } else {
      this.setCharactersByDEF_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[6], 6);
    }
    this.filterHandler();
  }

  setCharactersByHP_ASC(): void {
    this.filteredCharacters = this.characterService.getCharactersByHP_ASC(this.filteredCharacters);
  }
  setCharactersByHP_DESC(): void {
    this.filteredCharacters = this.characterService.getCharactersByHP_DESC(this.filteredCharacters);
  }

  filterByHP_button_clickEvent() {
    this.swapFilter(7); //7->HP
    if(this.local_filterASC[7]) {
        this.setCharactersByHP_DESC();
        this.updateFilter_is_ASC(this.local_filterASC[7], 7);
    } else {
      this.setCharactersByHP_ASC();
      this.updateFilter_is_ASC(this.local_filterASC[7], 7);
    }
    this.filterHandler();
  }

  swapFilter(filter_index: number) { //given filter index, sets all other filters as false
    if(this.selected_filter != filter_index){
      this.local_activeFilters.forEach((item, index) => {
        if(index == filter_index){
          this.local_activeFilters[index] = true;
          this.updateFilter_is_ASC(this.local_filterASC[index], index); // sets the current selected ASC filter as ASC 
        } else {
          this.local_activeFilters[index] = false;
          this.updateFilter_is_ASC(false, index); // sets all others to ASC
        }
        this.savestateservice_activeFilters = this.local_activeFilters;
      });

      this.selected_filter = filter_index;
    } this.savestateservice_filter_init = true;
  }

  hardResetFilters(){ // RESET ALL FILTERS -- WARNING
    //this.savestateservice_searchText = "";      //RESET SEARCH TEXT
    this.savestateservice_activeFilters = [true, false, false ,false, false, false, false, false];
    this.savestateservice_filter_is_ASC = [true, true, true, true, true, true, true, true];
    this.savestateservice_filter_init = false;
    this.savestateservice_isClassSelected = [true, true];
    this.savestateservice_isColorSelected = [true, true, true, true, true];
    this.savestateservice_masterSelected = true;
    this.savestateservice_masterSelected_color = true;
    this.savestateservice_masterSelected_commanderAbility = true;
    this.savestateservice_isCommanderAbilitySelected = [true, true];
    this.savestateservice_masterSelected_passiveAbility = true;
    this.savestateservice_isPassiveAbilitySelected = [true, true];
    this.savestateservice_masterSelected_specialAbility = true;
    this.savestateservice_isSpecialAbilitySelected = [true, true];
  }

  show_hide_filters_clickEvent(){
    var display_status: string = document.getElementById("collapsingFilter").style.display;
    if(document.getElementById("collapsingFilter").style.display === "none"){
      this.show_hide_button = this.HIDE_FILTERS_TEXT;
      document.getElementById("collapsingFilter").style.display = "block";
    } else {
      this.show_hide_button = this.DISPLAY_FILTERS_TEXT;
      document.getElementById("collapsingFilter").style.display = "none";
      //reset values for savestate.service
      this.hardResetFilters();
      

      this.initializeFilter();
      this.initCollection();

      this.filterHandler();
    }
  }



  updateFilteredCharacters(list: Character[]){
    this.filteredCharacters = Object.assign([], list);
  }


  //CLASS CHECKLIST METHODS

  classFilterHandler(imCalled: boolean){
    //TO-DO
    if(!imCalled){
      if(this.savestateservice_masterSelected) {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        this.colorFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.passiveAbilityHandler(true);
        this.specialAbilityHandler(true);

      } else {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        

        var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isClassSelected.length; i++) {
          if(this.savestateservice_isClassSelected[i]){
            temp.push(i);
          }
        } 

        this.updateFilteredCharacters(this.characterService.filterClass_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
        

        this.colorFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.passiveAbilityHandler(true);
        this.specialAbilityHandler(true);
      }
    } else {
      if(!this.savestateservice_masterSelected) {
        var temp: number[] = [];

        for (var i = 0; i < this.savestateservice_isClassSelected.length; i++) {
          if(this.savestateservice_isClassSelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterClass_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
      }
    }

  }

  checkUncheckAll() {
    var tmp: boolean[] = Object.assign([], this.savestateservice_isClassSelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    for (var i = 0; i < this.savestateservice_isClassSelected.length; i++) {
      tmp[i] = this.savestateservice_masterSelected;
    }
    this.savestateservice_isClassSelected = tmp; //since it's binded to html it will auto-update the checkbox status as well.
    
    //handle filteringByClass
    this.classFilterHandler(false);
  }

  isAllSelected(class_id: string) {
    var tmp: boolean[] = Object.assign([], this.savestateservice_isClassSelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    tmp[class_id] = !tmp[class_id];
    this.savestateservice_isClassSelected = tmp;

    

    this.savestateservice_masterSelected = this.savestateservice_isClassSelected.every(function(item:boolean) {
        return item == true;
      })
      //handle filteringByClass
    this.classFilterHandler(false);
  }
  /////////////////////////////////////
  //FACTION CHECKLIST METHODS
  
  //not going to implement this right now, there's only 1 faction in game

  /////////////////////////////////////
  //COLOR


  colorFilterHandler(imCalled: boolean){
    if(!imCalled){
      if(this.savestateservice_masterSelected_color) {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        this.classFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.passiveAbilityHandler(true);
        this.specialAbilityHandler(true);

      } else {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();

        //apply filter
        var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isColorSelected.length; i++) {
          if(this.savestateservice_isColorSelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterColor_MULTI(temp, this.filteredCharacters));
      
        this.classFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.passiveAbilityHandler(true);
        this.specialAbilityHandler(true);
      }
    } else {
      if(!this.savestateservice_masterSelected_color) {
        var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isColorSelected.length; i++) {
          if(this.savestateservice_isColorSelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterColor_MULTI(temp, this.filteredCharacters));
      }
    }

  }

  checkUncheckAll_color() {
    var tmp: boolean[] = Object.assign([], this.savestateservice_isColorSelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    for (var i = 0; i < this.savestateservice_isColorSelected.length; i++) {
      tmp[i] = this.savestateservice_masterSelected_color;
    }
    this.savestateservice_isColorSelected = tmp; //since it's binded to html it will auto-update the checkbox status as well.
    //handle filteringByColor
    this.colorFilterHandler(false);
  }

  isAllSelected_color(color_id: string) {
    var tmp: boolean[] = Object.assign([], this.savestateservice_isColorSelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    tmp[color_id] = !tmp[color_id];
    this.savestateservice_isColorSelected = tmp;
    
    this.savestateservice_masterSelected_color = this.savestateservice_isColorSelected.every(function(item:boolean) {
        return item == true;
      })
    
      //handle filteringByColor
    this.colorFilterHandler(false);
  }
  /////////////////////////////////////
  //RARITY
  
  //not going to implement this right now, it's already possible to sort by rarity.

  /////////////////////////////////////


  commanderAbilityFilterHandler(imCalled: boolean){
    if(!imCalled){
      if(this.savestateservice_masterSelected_commanderAbility) {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        this.colorFilterHandler(true);
        this.classFilterHandler(true);
        this.passiveAbilityHandler(true);
        this.specialAbilityHandler(true);

      } else {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        

        var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isCommanderAbilitySelected.length; i++) {
          if(this.savestateservice_isCommanderAbilitySelected[i]){
            temp.push(i);
          }
        } 

        this.updateFilteredCharacters(this.characterService.filterCommander_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
        

        this.colorFilterHandler(true);
        this.classFilterHandler(true);
        this.passiveAbilityHandler(true);
        this.specialAbilityHandler(true);
      }
    } else {
      if(!this.savestateservice_masterSelected_commanderAbility) {
        var temp: number[] = [];

        for (var i = 0; i < this.savestateservice_isCommanderAbilitySelected.length; i++) {
          if(this.savestateservice_isCommanderAbilitySelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterCommander_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
      }
    }
  }

  passiveAbilityHandler(imCalled: boolean) {
    if(!imCalled){
      if(this.savestateservice_masterSelected_passiveAbility) {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        this.colorFilterHandler(true);
        this.classFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.specialAbilityHandler(true);

      } else {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        

        var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isPassiveAbilitySelected.length; i++) {
          if(this.savestateservice_isPassiveAbilitySelected[i]){
            temp.push(i);
          }
        } 

        this.updateFilteredCharacters(this.characterService.filterPassive_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
        

        this.colorFilterHandler(true);
        this.classFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.specialAbilityHandler(true);
      }
    } else {
      if(!this.savestateservice_masterSelected_commanderAbility) {
        var temp: number[] = [];

        for (var i = 0; i < this.savestateservice_isCommanderAbilitySelected.length; i++) {
          if(this.savestateservice_isCommanderAbilitySelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterPassive_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
      }
    }
  }


  specialAbilityHandler(imCalled: boolean){
    if(!imCalled){
      if(this.savestateservice_masterSelected_specialAbility) {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        this.colorFilterHandler(true);
        this.classFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.passiveAbilityHandler(true);

      } else {
        this.initCollection(); //reset characterList before doing anything
        //restore eventual other filters active -> COLOR, FACTION, ETC..
        this.filterHandler();
        

        var temp: number[] = [];
        for (var i = 0; i < this.savestateservice_isSpecialAbilitySelected.length; i++) {
          if(this.savestateservice_isSpecialAbilitySelected[i]){
            temp.push(i);
          }
        } 

        this.updateFilteredCharacters(this.characterService.filterSpecial_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
        

        this.colorFilterHandler(true);
        this.classFilterHandler(true);
        this.commanderAbilityFilterHandler(true);
        this.passiveAbilityHandler(true);
      }
    } else {
      if(!this.savestateservice_masterSelected_specialAbility) {
        var temp: number[] = [];

        for (var i = 0; i < this.savestateservice_isSpecialAbilitySelected.length; i++) {
          if(this.savestateservice_isSpecialAbilitySelected[i]){
            temp.push(i);
          }
        } 
        this.updateFilteredCharacters(this.characterService.filterSpecial_MULTI(temp, this.filteredCharacters)); //does not modify characterList, only the displayed one
      }
    }
  }


  //TO-DO ABILITY SYS ON CLICK FILTER
  
  checkUncheckAll_commanderAbility() {
    var tmp: boolean[] = Object.assign([], this.savestateservice_isCommanderAbilitySelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    for (var i = 0; i < this.savestateservice_isCommanderAbilitySelected.length; i++) {
      tmp[i] = this.savestateservice_masterSelected_commanderAbility;
    }
    this.savestateservice_isCommanderAbilitySelected = tmp; //since it's binded to html it will auto-update the checkbox status as well.
    //handle filteringByColor
    this.commanderAbilityFilterHandler(false);
  }




  
  isAllSelected_commanderAbility(commander_ability_id: string){
    var tmp: boolean[] = Object.assign([], this.savestateservice_isCommanderAbilitySelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    tmp[commander_ability_id] = !tmp[commander_ability_id];
    this.savestateservice_isCommanderAbilitySelected = tmp;
    
    this.savestateservice_masterSelected_commanderAbility = this.savestateservice_isCommanderAbilitySelected.every(function(item:boolean) {
        return item == true;
      })
    
      //handle filteringByColor
    this.commanderAbilityFilterHandler(false);
  }

  

  
  checkUncheckAll_passiveAbility(){
    var tmp: boolean[] = Object.assign([], this.savestateservice_isPassiveAbilitySelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    for (var i = 0; i < this.savestateservice_isPassiveAbilitySelected.length; i++) {
      tmp[i] = this.savestateservice_masterSelected_passiveAbility;
    }
    this.savestateservice_isPassiveAbilitySelected = tmp; //since it's binded to html it will auto-update the checkbox status as well.
    //handle filteringByColor
    this.passiveAbilityHandler(false);
  }
  isAllSelected_passiveAbility(passive_ability_id: string){
    var tmp: boolean[] = Object.assign([], this.savestateservice_isPassiveAbilitySelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    tmp[passive_ability_id] = !tmp[passive_ability_id];
    this.savestateservice_isPassiveAbilitySelected = tmp;
    
    this.savestateservice_masterSelected_passiveAbility = this.savestateservice_isPassiveAbilitySelected.every(function(item:boolean) {
        return item == true;
      })
    
      //handle filteringByColor
    this.passiveAbilityHandler(false);
  }
  
  checkUncheckAll_specialAbility (){
    var tmp: boolean[] = Object.assign([], this.savestateservice_isSpecialAbilitySelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    for (var i = 0; i < this.savestateservice_isSpecialAbilitySelected.length; i++) {
      tmp[i] = this.savestateservice_masterSelected_specialAbility;
    }
    this.savestateservice_isSpecialAbilitySelected = tmp; //since it's binded to html it will auto-update the checkbox status as well.
    //handle filteringByColor
    this.specialAbilityHandler(false);
  }
  isAllSelected_specialAbility (spacial_ability_id: string){
    var tmp: boolean[] = Object.assign([], this.savestateservice_isSpecialAbilitySelected);

    this.savestateservice_filter_init = true; //filter has changed, save it
    tmp[spacial_ability_id] = !tmp[spacial_ability_id];
    this.savestateservice_isSpecialAbilitySelected = tmp;
    
    this.savestateservice_masterSelected_specialAbility = this.savestateservice_isSpecialAbilitySelected.every(function(item:boolean) {
        return item == true;
      })
    
      //handle filteringByColor
    this.specialAbilityHandler(false);
  }
  


}
