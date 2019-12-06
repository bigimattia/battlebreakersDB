import { Injectable } from '@angular/core';
import { Color } from './Color';
import { COLORS } from './color-data';

@Injectable()
export class ColorsService {
    constructor() {  }

    getColors(): Color[] {
        return COLORS;
    }
    
    getColor(index: number): Color {
        var result: Color;
        for(let tmpColor of COLORS) {
            if(tmpColor.COLOR_ID == index)
                result = tmpColor;
        }
        return result;
    }
}