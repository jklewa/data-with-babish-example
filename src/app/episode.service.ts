import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, single, first, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isVeganIngredientList } from 'is-vegan';

export class Episode {
  id = '';
  episode_name = '';
  episode_link = '';
  youtube_link = '';
  published = '';
  recipes: Recipe[] = [];

  constructor(data) {
    Object.keys(data).forEach(key => {
      if (key == 'recipes') {
        this[key] = data[key].map(r => new Recipe(r['method'], r['ingredients']))
      } else {
        this[key] = data[key];
      }
    });

    this.id = this.episode_link.split('/').slice(-1)[0];
  }

  isVegan() {
    return this.recipes.every(r => r.isVegan());
  }
}


export class Recipe {
  constructor(
    public method: string,
    public ingredients: any[4][]) {}

  isVegan() {
    return this.ingredients.every(i => isVeganIngredientList(i[2].split(' ')));
  }
}


@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/babish.json';

  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<Episode[]> {
    return this.http.get<Object[]>(this.data_url)
      .pipe(
        map(response => response.map(data => new Episode(data)))
      );
  }

  getEpisode(id: string) {
    return this.getEpisodes()
      .pipe(
        map(episodes => episodes.filter(ep => ep.id === id)),
        single()
      );
  }

}
