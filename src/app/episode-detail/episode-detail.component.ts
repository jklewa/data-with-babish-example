import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map, single } from 'rxjs/operators';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {

  id: string;
  ep: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.ep = {};
  }

  ngOnInit() {
   this.id = this.route.snapshot.paramMap.get('id');

    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/ibdb.episodes.json';

    this.http.get<any[]>(data_url)
    .pipe(
      map(response => response.filter(ep => ep.episode_id === this.id).map(ep => {
        const parts = ep.name.split(/ inspired by | from /);
        ep.episode_name_pt1 = parts[0];
        ep.episode_name_pt2 = parts.length > 1 ? parts[1] : '';
        return ep;
      })),
      single()
    )
    .subscribe(
      (episodes: any[]) => { this.ep = episodes[0]; },
      (error) => { console.error('Failed to fetch episode', error); });

  }

}
