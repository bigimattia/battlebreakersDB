import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterService } from './character.service';
import { HomeComponent } from './home/home.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ListAllCharactersComponent } from './list-all-characters/list-all-characters.component';
import { SaveStateService } from './savestate.service';
import { ClassesService } from './characterclasses.service';
import { ColorsService } from './color.service';
import { AbilitySysService } from './abilitysys.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterDetailComponent,
    ListAllCharactersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [CharacterService, SaveStateService, ClassesService, ColorsService, AbilitySysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
