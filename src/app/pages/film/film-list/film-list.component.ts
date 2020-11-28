import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FilmListItem, FilmListResult } from 'src/app/types';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  apiKey = '9bebc10691cb106cf78fb1678221fb82';
  imageUrl = 'http://image.tmdb.org/t/p/w342/';
  filmList: FilmListItem[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.get('/discover/movie', { api_key: this.apiKey, sort_by: 'release_date.desc' })
      .subscribe((response: FilmListResult) => {
        this.filmList = response.results;
      });
  }

}
