import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { ShowListComponent } from './show-list/show-list.component';

const routes: Routes =  [
  { path: '', redirectTo: '/shows', pathMatch: 'full' },
  { path: 'shows', component: ShowListComponent },
  { path: 'references', component: ReferenceListComponent },
  { path: 'guests', component: GuestListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'episodes', component: EpisodeListComponent },
  { path: 'episodes/:id', component: EpisodeDetailComponent },
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
