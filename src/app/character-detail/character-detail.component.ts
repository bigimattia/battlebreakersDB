import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Character } from '../Character';
import { CharacterService } from '../character.service';

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
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSelectedCharacter();
  }

  getSelectedCharacter(): void {
    const ID_CHARACTER: string = this.route.snapshot.paramMap.get('ID_CHARACTER');
    this.character = this.characterService.getCharacter(ID_CHARACTER);
  }

  goBack(): void {
    this.location.back();
  }
}
