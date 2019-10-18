import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  searchPlaceholder = 'Search - to get started try "Chicken"';
  filters = {searchTerm: ''};

  episodes: any[];
  references: any[];
  guests: any[];
  placeholderImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACpAQMAAACruZLpAAAABlBMVEX///////9VfPVsAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABE0lEQVRYhe2TMU4EMQxFv00kUqxQRDVlRMUpIFBtyRE4Ccp2HIuj7BE4AFqts46oPLMVEsV/GkWT5I3HHmcAQgghhBBCyB9zwu0RH36vwA+eI0vRlyy9XyZ3Q+wtDNdqUvjWPTIENdRqHTEuPPiLY61pmhFeUWwsVzQZkdKaZunMLbVJsvzCErpk05psa3Ctqqe/osnUShqa7la03dRyHtreAi6RlqaWytDerNpQQ3dN69DebeFxq1Jprh2wD7XqGr6G1tBfPrc0j2ZaKP1qnhtWNXizvNJq2mbr/btd1bwLdSzEmp9e72mRNa1ZI2zwEzKuFkgqPS84eH2KlCBhrSfcHPE0n4F82y9ICCGEEELIf+cM7hEjlGmX1eoAAAAASUVORK5CYII=';

  constructor(private http: HttpClient, private filter: FilterPipe) { }

  ngOnInit() {
    this.getEpisodes();
    this.getReferences();
    this.getGuests();
  }

  getEpisodes(): void {
    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/ibdb.episodes.json';

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



  getReferences(): void {
    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/ibdb.references.json';

    this.http.get<any[]>(data_url)
    .pipe(
      map(response => response.map(i => {
        i.episodes_inspired.map(ep => {
            const parts = ep.name.split(/ inspired by | from /);
            ep.episode_name_pt1 = parts[0];
            ep.episode_name_pt2 = parts.length > 1 ? parts[1] : '';
            return ep;
        });
        i.searchTerm = this.refSearchTerm(i);
        return i;
      }).sort((a, b) => {
        return b.episodes_inspired.length - a.episodes_inspired.length;
      }))
    )
    .subscribe(
      (items: any[]) => { this.references = items; },
      (error) => { console.error('Failed to fetch references', error); });
  }

  refSearchTerm = ref => [
    ref.name,
    ...ref.episodes_inspired.map(i => i.name),
    ref.type.replace('_', ' '),
  ].map((t: string) => t.toLowerCase()).join('|')




  getGuests(): void {
    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/ibdb.guests.json';

    this.http.get<any[]>(data_url)
    .pipe(
      map(response => response.map(i => {
        i.appearances.map(ep => {
            const parts = ep.name.split(/ inspired by | from /);
            ep.episode_name_pt1 = parts[0];
            ep.episode_name_pt2 = parts.length > 1 ? parts[1] : '';
            return ep;
        });
        i.searchTerm = this.guestSearchTerm(i);
        return i;
      }).sort((a, b) => {
        return b.appearances.length - a.appearances.length;
      })),
    )
    .subscribe(
      (items: any[]) => { this.guests = items; },
      (error) => { console.error('Failed to fetch guests', error); });
  }

  guestSearchTerm = guest => [
    guest.name,
    ...guest.appearances.map(i => i.name),
  ].map((t: string) => t.toLowerCase()).join('|')
}
