import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-with-babish';
  data_url = "https://raw.githubusercontent.com/jklewa/data-with-babish/master/babish.json";
  episodes: Observable<any[]>;

  constructor(http: HttpClient) {
    this.episodes = http.get<any[]>(this.data_url);
  }
}
