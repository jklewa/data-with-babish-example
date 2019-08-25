import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  episodes: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEpisodes();
  }

  getEpisodes(): void {
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
      (episodes: any[]) => { this.episodes = episodes; },
      (error) => { console.error('Failed to fetch episodes', error); });
  }

}
