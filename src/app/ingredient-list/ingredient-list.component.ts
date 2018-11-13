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
  groupedIngredients: object;
  ingredientsByName: string[];
  ingredientsByUses: string[];
  currentSort: string[] = null;

  constructor(private episodeService: EpisodeService) { }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients(): void {
    this.episodeService.getEpisodes()
      .subscribe(
        (episodes: Episode[]) => {
          // Pull ingredients out of every episode with meta data about their recipe and episode
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

          // Group ingredients by name
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

          // Sorted lists
          this.ingredientsByName = Object.keys(groupedIngredients).sort(); // sort keys alpha, asc

          this.ingredientsByUses = this.ingredientsByName.slice()
            .sort((a, b) => groupedIngredients[b].length - groupedIngredients[a].length); // sort again by num of uses, desc

          this.currentSort = this.ingredientsByUses;
        },
        (error) => { console.error('Failed to fetch episodes', error); });
  }

}
