import { Component, OnInit, SimpleChange, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  searchPlaceholder = 'Search - to get started try "Butter"';
  // filters = {searchTerm: ''};

  ingredients: any[];
  groupedIngredients: object;
  ingredientsByName: any[];
  ingredientsByUses: any[];
  currentSort: any[] = null;

  searchValueSubject: Subject<string> = new Subject<string>();
  searchValue: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getIngredients();
    this.searchValueSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(newVal => this.searchValue = newVal);
  }

  onSearchChange(seachValue: string) {
    this.searchValueSubject.next(seachValue);
  }

  getIngredients(): void {
    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/ibdb.episodes.json';

    this.http.get<any[]>(data_url)
    .pipe(
      map(response => response.map(ep => {
        const parts = ep.name.split(/ inspired by | from /);
        ep.episode_name_pt1 = parts[0];
        ep.episode_name_pt2 = parts.length > 1 ? parts[1] : '';
        return ep;
      }))
    )
      .subscribe(
        (episodes: any[]) => {
          // Pull ingredients out of every episode with meta data about their recipe and episode
          const ingredients: Ingredient[] = [];

          episodes.map(ep =>
            ep.related.recipes.map((recipe, recipeIdx) =>
              recipe.ingredient_list.map(i =>
                ingredients.push(
                  new Ingredient(i[0], i[1], i[2], i[3], ep.episode_id, ep.name, recipe.recipe_id, recipe.name)
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
          this.ingredientsByName = Object.keys(groupedIngredients).sort((a, b) => {
            const A = a.toLowerCase().replace(/[^a-z]/g, '');
            const B = b.toLowerCase().replace(/[^a-z]/g, '');
            return A.localeCompare(B);
          })

          this.ingredientsByUses = this.ingredientsByName.slice()
            .sort((a, b) => groupedIngredients[b].length - groupedIngredients[a].length); // sort again by num of uses, desc

          this.currentSort = this.ingredientsByUses;
        },
        (error) => { console.error('Failed to fetch episodes', error); });
  }

}
