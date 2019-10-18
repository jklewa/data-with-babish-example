import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgHighlightModule } from 'ngx-text-highlight';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { HighlightIngredientDirective } from './directives/highlight-ingredient.directive';
import { GuestListComponent } from './guest-list/guest-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { LazyLoadDirective } from './directives/lazy-load.directive';


@NgModule({
  declarations: [
    AppComponent,
    EpisodeListComponent,
    IngredientListComponent,
    EpisodeDetailComponent,
    HighlightIngredientDirective,
    GuestListComponent,
    RecipeListComponent,
    ReferenceListComponent,
    LazyLoadDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FilterPipeModule,
    FormsModule,
    NgHighlightModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
