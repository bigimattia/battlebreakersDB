import { Injectable } from '@angular/core';
import { CharacterClasses } from './CharacterClasses';
import { CLASSES } from './characterclasses-data';

@Injectable()
export class ClassesService {
    constructor() {  }

    getClasses(): CharacterClasses[] {
        return CLASSES;
    }
    
    getClass(index: number): CharacterClasses {
        var result: CharacterClasses;
        for(let tmpClass of CLASSES) {
            if(tmpClass.CLASS_ID == index)
                result = tmpClass;
        }
        return result;
    }
}