import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.scss']
})
export class ReferenceListComponent implements OnInit {

  searchPlaceholder = 'Search - to get started try "Chef"';
  filters = {searchTerm: ''};

  items: any[];
  placeholderImg = 'assets/placeholder.svg';


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    const data_url = 'https://raw.githubusercontent.com/jklewa/data-with-babish/master/datasets/ibdb.references.json';

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
      }))
    )
    .subscribe(
      (items: any[]) => {
        this.items = items;
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          setTimeout(() => this.viewportScroller.scrollToAnchor(fragment));
        }
      },
      (error) => { console.error('Failed to fetch items', error); });
  }

  refSearchTerm = ref => [
    ref.name,
    ...ref.episodes_inspired.map(i => i.name),
    (ref.type || '').replace('_', ' '),
  ].map((t: string) => t.toLowerCase()).join('|')

}
