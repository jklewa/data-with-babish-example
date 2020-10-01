import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  searchPlaceholder = 'Search - to get started try "Chicken"';
  filters = {searchTerm: ''};

  episodes: any[];
  placeholderImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACpAQMAAACruZLpAAAABlBMVEX///////9VfPVsAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABE0lEQVRYhe2TMU4EMQxFv00kUqxQRDVlRMUpIFBtyRE4Ccp2HIuj7BE4AFqts46oPLMVEsV/GkWT5I3HHmcAQgghhBBCyB9zwu0RH36vwA+eI0vRlyy9XyZ3Q+wtDNdqUvjWPTIENdRqHTEuPPiLY61pmhFeUWwsVzQZkdKaZunMLbVJsvzCErpk05psa3Ctqqe/osnUShqa7la03dRyHtreAi6RlqaWytDerNpQQ3dN69DebeFxq1Jprh2wD7XqGr6G1tBfPrc0j2ZaKP1qnhtWNXizvNJq2mbr/btd1bwLdSzEmp9e72mRNa1ZI2zwEzKuFkgqPS84eH2KlCBhrSfcHPE0n4F82y9ICCGEEELIf+cM7hEjlGmX1eoAAAAASUVORK5CYII=';

  constructor(private http: HttpClient, private filter: FilterPipe) { }

  ngOnInit() {
    this.getEpisodes();
  }

  getEpisodes(): void {
    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/datasets/ibdb.episodes.json';

    this.http.get<any[]>(data_url)
    .pipe(
      map(response => response.map(ep => {
        const parts = ep.name.split(/ inspired by | from /);
        ep.episode_name_pt1 = parts[0];
        ep.episode_name_pt2 = parts.length > 1 ? parts[1] : '';

        ep.searchTerm = this.epSearchTerm(ep);

        return ep;
      }))
    )
    .subscribe(
      (episodes: any[]) => { this.episodes = episodes; },
      (error) => { console.error('Failed to fetch episodes', error); });
  }

  epSearchTerm = ep => [
    ep.name,
    ...ep.related.recipes.map(i => i.name),
    ...ep.related.guests.map(i => i.name),
    ...ep.related.inspired_by.map(i => i.name),
    ep.related.show.name,
  ].map((t: string) => t.toLowerCase()).join('|')

  matchedRecipes = ep => this.filters.searchTerm ? this.filter.transform(ep.related.recipes, {name: this.filters.searchTerm}) : [];
  matchedGuests = ep => this.filters.searchTerm ? this.filter.transform(ep.related.guests, {name: this.filters.searchTerm}) : [];
  matchedInspiredBy = ep => this.filters.searchTerm ? this.filter.transform(ep.related.inspired_by, {name: this.filters.searchTerm}) : [];

}
