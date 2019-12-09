import { Injectable } from '@angular/core';
import { AbilitySys } from './AbilitySys';
import { ABILITIES } from './abilitysys-data';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable()
export class AbilitySysService {
    constructor() {}

    getAbilities(): AbilitySys[] {
        console.log(ABILITIES);
        return Object.assign([], ABILITIES);
    }

    getAbilityByID(ABILITY_ID :number): AbilitySys{
        return ABILITIES[ABILITY_ID];
    }
}