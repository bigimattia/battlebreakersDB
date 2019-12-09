import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Character } from '../Character';
import { CharacterService } from '../character.service';
import { ClassesService } from '../characterclasses.service';
import { Constants } from '../Constants';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location,
    private classService: ClassesService
  ) { }

  ngOnInit(): void {
    this.getSelectedCharacter();
  }

  getSelectedCharacter(): void {
    const ID_CHARACTER: string = this.route.snapshot.paramMap.get('ID_CHARACTER');
    this.character = this.characterService.getCharacter(ID_CHARACTER);
  }

  getClassText(): string {
    return this.classService.getClass(this.character.character_class).class_name;
  }

  getTypeText(): string {
    if(this.character.type == 0)
      return "Character";
    else
      return "Pet";
  }
  getFactionText(): string {
    //Will be deprecated in the near future, will be needed a system like classes' one
    if(this.character.faction == 0)
      return "None";
    else
      return "Assault robot";
  }
  getColorText(): string {
    switch (this.character.color) {
      case Constants.PURPLE_CHARACTER_COLOR: {
        return "purple";
      }
      case Constants.RED_CHARACTER_COLOR: {
        return "red";
      }
      case Constants.YELLOW_CHARACTER_COLOR: {
        return "yellow";
      }
      case Constants.GREEN_CHARACTER_COLOR: {
        return "green";
      }
      case Constants.BLUE_CHARACTER_COLOR: {
        return "blue";
      }
      default: {
        return "ERROR_COLOR";
      }
    }
  }
  getRarityText(): string {
    switch (this.character.rarity) {
      case Constants.COMMON_RARITY: {
        return "common";
      }
      case Constants.UNCOMMON_RARITY: {
        return "uncommon";
      }
      case Constants.RARE_RARITY: {
        return "rare";
      }
      case Constants.VERY_RARE_RARITY: {
        return "very rare";
      }
      case Constants.SUPER_RARE_RARITY: {
        return "super rare";
      }
      default: {
        return "ERROR_RARITY";
      }
    }
  }

  getReflexATK(): string {
    if(this.character.reflex_attack_is_combo) {
      var result:string;
      for(var temp in this.character.reflex_attack_combo_desc){
        result += temp;
      }
      return result;
    }
    else
      return this.character.reflex_attack_desc;
  }
  getReflexDEF(): string {
    if(this.character.reflex_defense_is_combo) {
      var result:string;
      for(var temp in this.character.reflex_defense_combo_desc){
        result += temp;
      }
      return result;
    }
    else
      return this.character.reflex_defense_desc;
  }
/*
  goBack(): void {
    console.log(this.location);
    this.location.back();
  }*/
}
