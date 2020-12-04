import { SpinnerService } from './../../../services/spinner.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FilmListItem, FilmListResult } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  apiKey = '9bebc10691cb106cf78fb1678221fb82';
  imageUrl = 'http://image.tmdb.org/t/p/w342/';
  filmList: FilmListItem[] = [];
  page = 1;
  today = new Date().toISOString().substring(0, 10);
  loadIsInProgress = false;
  watchListIds: number[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.fetchFilmList();
    this.watchListIds = this.getWatchListIds();
  }

  fetchFilmList(): void {
    this.loadIsInProgress = true;
    this.spinnerService.showSpinner();
    this.apiService.get('/discover/movie',
      {
        api_key: this.apiKey,
        'primary_release_date.lte': this.today,
        page: this.page,
        sort_by: 'primary_release_date.desc'
      })
      .subscribe((response: FilmListResult) => {
        this.filmList.push(...response.results);
        this.page++;
        this.spinnerService.hideSpinner();
        this.loadIsInProgress = false;
      });
  }

  onScroll(): void {
    if (!this.loadIsInProgress) {
      this.fetchFilmList();
    }
  }

  navigateToDetailsPage(selectedFilm: FilmListItem): void {
    const id = selectedFilm.id;
    this.router.navigate([`/films/${id}`]);
  }

  getWatchListIds(): number[] {
    return JSON.parse(localStorage.getItem('watchlist_ids') || '[]');
  }

  addToWatchlist(selectedFilm: FilmListItem): void {
    const storedIds: number[] = this.getWatchListIds();
    storedIds.push(selectedFilm.id);
    localStorage.setItem('watchlist_ids', JSON.stringify(storedIds));
    this.ngOnInit();
  }

  removeFromWatchlist(selectedFilm: FilmListItem): void {
    let storedIds: number[] = this.getWatchListIds();
    storedIds = storedIds.filter(id => id !== selectedFilm.id);
    localStorage.setItem('watchlist_ids', JSON.stringify(storedIds));
    this.ngOnInit();
  }

}
