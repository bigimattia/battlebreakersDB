import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../Character';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.css']
})
export class DamageCalculatorComponent implements OnInit {

  filteredCharacters: Character[] = [];
  selectedList: any[];
  searchText: string;
  currentIndex: number = 0;
  amIOccupiedList: boolean[] = [false, false, false, false, false, false]

  constructor(private characterService: CharacterService) { 
    //TO-DO init selectedList in order to be NOT empty when calling addToSelectedPlace!!
   
  }

  ngOnInit() {
    this.selectedList = [0, 0, 0, 0, 0, 0]
  }

  updateAmIOccupiedList(index:number, value: boolean) {
    this.amIOccupiedList[index] = value;
  }

  updateCurrentIndex(){ //changes current selected space to the next free space avaiable. If all spaces are already selected, does nothing
      if(!(this.amIOccupiedList.indexOf(false) === -1)){
        this.currentIndex = this.amIOccupiedList.indexOf(false);
      }
  }

  addToSelectedPlace(character_id: string){
    this.selectedList[this.currentIndex] = this.characterService.getCharacter(character_id); 
    this.updateAmIOccupiedList(this.currentIndex, true);
    this.updateCurrentIndex();
  }

  removeFromSelectedPlace(selected_character_index: number){
    //TO-DO
    //remove selected character from the selectedList without altering other characters position!

    this.selectedList[selected_character_index] = 0;
    this.updateAmIOccupiedList(selected_character_index, false);
    this.updateCurrentIndex();
  }
  
  filterItem(value){
    if(!value){
      this.filteredCharacters = []; //if search text is empty don't display any character
    } else {
    this.filteredCharacters = Object.assign([], this.characterService.getCharacters()).filter(character => character.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
  }
}
