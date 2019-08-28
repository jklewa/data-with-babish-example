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
import { GuestListComponent } from './guest-list/guest-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { LazyLoadDirective } from './directives/lazy-load.directive';


@NgModule({
  declarations: [
    AppComponent,
    EpisodeListComponent,
    IngredientListComponent,
    EpisodeDetailComponent,
    HighlightIngredientDirective,
    FilterIngPipe,
    GuestListComponent,
    RecipeListComponent,
    ReferenceListComponent,
    ShowListComponent,
    LazyLoadDirective,
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
