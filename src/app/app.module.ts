import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { HighlightIngredientDirective } from './directives/highlight-ingredient.directive';
import { FilterIngPipe } from './ingredient-list/ingredient-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EpisodeListComponent,
    IngredientListComponent,
    EpisodeDetailComponent,
    HighlightIngredientDirective,
    FilterIngPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
