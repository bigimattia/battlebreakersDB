import { Injectable } from '@angular/core';
import { Character } from './Character';

@Injectable() 
export class SaveStateService {
  searchText: string = "";

  /* INDEX filters
  0 - ID
  1 - RARITY
  2 - COLOR
  3 - CLASS
  4 - FACTION
  5 - ATK
  6 - DEF
  7 - HP
  */
  activeFilters: boolean[] = [ //true if filter is selected, false otherwise
                                  //by default, only filter by ID is active

    false,  //ID 
    false, //RARITY
    false, //COLOR
    false, //CLASS
    false, //FACTION
    false, //ATK
    false, //DEF
    false  //HP
  ];

  
  filter_is_ASC: boolean[] = [ // true if filter is set ASC, false otherwise
                                                        //true by deafult

    true, //ID
    true, //RARITY
    true, //COLOR
    true, //CLASS
    true, //FACTION
    true, //ATK
    true, //DEF
    true  //HP
  ];

  isClassSelected: boolean[] = [ // lenght = number of classes
    true,
    true
  ];
  masterSelected: boolean = true;

  isColorSelected: boolean[] = [ // lenght = 5
    true,
    true,
    true,
    true,
    true
  ];
  masterSelected_color: boolean = true;

  filter_init: boolean = false;


  masterSelected_commanderAbility: boolean = true;
  isCommanderAbilitySelected: boolean[] = [ //lenght same as abilitysys-data.ts
    true,
    true
  ];


  masterSelected_passiveAbility: boolean = true;
  isPassiveAbilitySelected: boolean[] = [ //lenght same as abilitysys-data.ts
    true,
    true
  ];

  masterSelected_specialAbility: boolean = true;
  isSpecialAbilitySelected: boolean[] = [ //lenght same as abilitysys-data.ts
    true,
    true
  ];

}