import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EpisodeService, Episode } from '../episode.service';


@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  episodes: Episode[];

  constructor(private episodeService: EpisodeService) { }

  ngOnInit() {
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.episodeService.getEpisodes()
    .subscribe(
      (episodes: Episode[]) => { this.episodes = episodes; },
      (error) => { console.error('Failed to fetch episodes', error); });
  }

}
