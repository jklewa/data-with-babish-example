import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EpisodeService, Episode } from '../episode.service';

class Ingredient {
  constructor(
    public qty: string,
    public unit: string,
    public name: string,
    public raw: string,
    public episodeId: string,
    public episodeName: string,
    public recipeIdx: number,
    public recipeName: string) {}
}

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {

  ingredients: any[];
  groupedIngredients: any;

  constructor(private episodeService: EpisodeService) { }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients(): void {
    this.episodeService.getEpisodes()
      .subscribe(
        (episodes: Episode[]) => {
          const ingredients: Ingredient[] = [];

          episodes.map(ep =>
            ep.recipes.map((recipe, recipeIdx) =>
              recipe.ingredients.map(i =>
                ingredients.push(
                  new Ingredient(i[0], i[1], i[2], i[3], ep.id, ep.episode_name, recipeIdx, recipe.method)
                )
              )
            )
          );

          this.ingredients = ingredients;

          const groupedIngredients = {};

          ingredients.reduce(
            (acc, ing, idx, arr) => {
              if (!acc[ing.name]) {
                acc[ing.name] = [];
              }
              acc[ing.name].push(ing);
              return acc;
            },
            groupedIngredients);

          this.groupedIngredients = groupedIngredients;
        },
        (error) => { console.error('Failed to fetch episodes', error); });
  }

}
