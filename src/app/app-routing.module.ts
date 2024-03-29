import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const routes: Routes =  [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewPageComponent },
  { path: 'episodes', component: EpisodeListComponent },
  { path: 'episodes/:id', component: EpisodeDetailComponent },
  { path: 'references', component: ReferenceListComponent },
  { path: 'guests', component: GuestListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'ingredients', component: IngredientListComponent },
];

const routerOptions: ExtraOptions = {
    useHash: false,
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
