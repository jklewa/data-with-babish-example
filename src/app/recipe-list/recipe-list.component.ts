import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  searchPlaceholder = 'Search - to get started try "Beef"';
  filters = {searchTerm: ''};

  items: any[];
  placeholderImg = 'assets/placeholder.svg';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/datasets/ibdb.recipes.json';

    this.http.get<any[]>(data_url)
    .pipe(
      map(response => response.map(i => {
        const parts = i.source.name.split(/ inspired by | from /);
        i.source.episode_name_pt1 = parts[0];
        i.source.episode_name_pt2 = parts.length > 1 ? parts[1] : '';
        i.ingredient_list = (i.raw_ingredient_list || '').split('\n').filter(Boolean);
        i.searchTerm = this.recipeSearchTerm(i);
        return i;
      }))
    )
    .subscribe(
      (items: any[]) => { this.items = items; },
      (error) => { console.error('Failed to fetch items', error); });
  }

  recipeSearchTerm = recipe => [
    recipe.name,
    recipe.source.name,
    ...recipe.ingredient_list,
  ].map((t: string) => t.toLowerCase()).join('|')

}
