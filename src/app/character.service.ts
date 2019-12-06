import { Injectable } from '@angular/core';
import { Character } from './Character';
import { CHARACTERS } from './characters-data';

@Injectable()
export class CharacterService {
 
  constructor() { }
 
  getCharacters(): Character[] {
    return CHARACTERS;
  }

  getCharacter(ID_CHARACTER: string): Character {
    return CHARACTERS.find(character => character.ID_CHARACTER === ID_CHARACTER);
  }
 
  getCharactersByID_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => parseInt(a.ID_CHARACTER, 10) - parseInt(b.ID_CHARACTER, 10));
  }

  //DEFAULT DISPLAY
  getCharactersByID_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => parseInt(b.ID_CHARACTER, 10) - parseInt(a.ID_CHARACTER, 10));
  }

  getCharactersByRARITY_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => a.rarity - b.rarity);
  }

  getCharactersByRARITY_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => b.rarity - a.rarity);
  }

  getCharactersByCOLOR_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => a.color - b.color);;
  }
 
  getCharactersByCOLOR_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => b.color - a.color);;
  }

  getCharactersByCLASS_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => a.character_class - b.character_class);;
  }

  getCharactersByCLASS_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => b.character_class - a.character_class);;
  }

  getCharactersByFACTION_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => a.faction - b.faction);;
  }

  getCharactersByFACTION_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => b.faction - a.faction);;
  }

  getCharactersByATK_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => a.character_atk - b.character_atk)
  }

  getCharactersByATK_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => b.character_atk - a.character_atk)
  }

  getCharactersByDEF_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => a.character_defense - b.character_defense)
  }

  getCharactersByDEF_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => b.character_defense - a.character_defense)
  }

  getCharactersByHP_ASC(list: Character[]): Character[] {
    return list.sort((a, b) => a.character_hp - b.character_hp)
  }

  getCharactersByHP_DESC(list: Character[]): Character[] {
    return list.sort((a, b) => b.character_hp - a.character_hp)
  }

  //filter name
  filterName(name: string, list: Character[]): Character[] {
    return list.filter(character => character.name === name);
  }

  //filter class
  filterClass(classToFilter: number, list: Character[]): Character[] {
    return list.filter(character => character.character_class === classToFilter );
  }

  //filter faction
  filterFaction(faction: number, list: Character[]): Character[] {
    return list.filter(character => character.faction === faction);
  }

  //filter ID
  //NOT GOING TO IMPLEMENT THIS
  filterID(ID_CHARACTER: string, list: Character[]): Character[] {
    return list.filter(character => character.ID_CHARACTER === ID_CHARACTER);
  }

  //filter color
  filterColor(color: number, list: Character[]): Character[] {
      return list.filter(character => character.color === color);
  }

  //filter rarity
  filterRarity(rarity: number, list: Character[]): Character[] {
    return list.filter(character => character.rarity === rarity)
  }

  //MULTIPLE SEARCH!

  filterRarity_MULTI(rarityMulti: number[], list: Character[]): Character[] {
      return list.filter (character => rarityMulti.includes(character.rarity));
  }

  filterColor_MULTI(colorMulti: number[], list: Character[]): Character[] {
    return list.filter (character => colorMulti.includes(character.color));
  }

  filterClass_MULTI(classToFilterMulti: number[], list: Character[]): Character[] {
    return list.filter (character => classToFilterMulti.includes(character.character_class));
  }
  filterFaction_MULTI(factionMulti: number[], list: Character[]): Character[] {
    return list.filter (character => factionMulti.includes(character.faction))
  }

}