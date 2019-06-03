import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, single, first, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class Episode {
  id = '';
  episode_name = '';
  episode_link = '';
  youtube_link = '';
  published = '';
  recipes: Recipe[] = [];

  episode_name_pt1 = '';
  episode_name_pt2 = '';

  constructor(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });

    this.id = this.episode_link.split('/').slice(-1)[0];

    const parts = this.episode_name.split(/ inspired by | from /);
    this.episode_name_pt1 = parts[0];
    this.episode_name_pt2 = parts.length > 1 ? parts[1] : '';
  }
}


export interface Recipe {
  method: string;
  ingredients: any[4][];
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
