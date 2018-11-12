import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EpisodeService, Episode } from '../episode.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {

  ingredients: any[];

  constructor(private episodeService: EpisodeService) { }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients(): void {
    this.episodeService.getEpisodes()
      .subscribe(
        (episodes: Episode[]) => {
          const ingredients = [];

          episodes.map(ep => ep.recipes.map(recipe => {
            ingredients.push(...recipe.ingredients);
          }));

          this.ingredients = ingredients;
        },
        (error) => { console.error('Failed to fetch episodes', error); });
  }

}
