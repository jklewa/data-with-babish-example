import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.scss']
})
export class ReferenceListComponent implements OnInit {

  items: any[];
  placeholderImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACpAQMAAACruZLpAAAABlBMVEX///////9VfPVsAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABE0lEQVRYhe2TMU4EMQxFv00kUqxQRDVlRMUpIFBtyRE4Ccp2HIuj7BE4AFqts46oPLMVEsV/GkWT5I3HHmcAQgghhBBCyB9zwu0RH36vwA+eI0vRlyy9XyZ3Q+wtDNdqUvjWPTIENdRqHTEuPPiLY61pmhFeUWwsVzQZkdKaZunMLbVJsvzCErpk05psa3Ctqqe/osnUShqa7la03dRyHtreAi6RlqaWytDerNpQQ3dN69DebeFxq1Jprh2wD7XqGr6G1tBfPrc0j2ZaKP1qnhtWNXizvNJq2mbr/btd1bwLdSzEmp9e72mRNa1ZI2zwEzKuFkgqPS84eH2KlCBhrSfcHPE0n4F82y9ICCGEEELIf+cM7hEjlGmX1eoAAAAASUVORK5CYII=';


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
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
        return i;
      }))
    )
    .subscribe(
      (items: any[]) => { this.items = items; },
      (error) => { console.error('Failed to fetch items', error); });
  }

}
