import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FilmListItem, FilmListResult } from 'src/app/types';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  page = 1;
  subs = new SubSink();
  loadIsInProgress = false;
  watchListIds: number[] = [];
  filmList: FilmListItem[] = [];
  imageUrl = 'http://image.tmdb.org/t/p/w342/';
  today = new Date().toISOString().substring(0, 10);

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
    this.subs.add(
      this.apiService.get('/discover/movie',
        {
          'primary_release_date.lte': this.today,
          page: this.page,
          sort_by: 'primary_release_date.desc'
        })
        .subscribe((response: FilmListResult) => {
          this.filmList.push(...response.results);
          this.page++;
          this.spinnerService.hideSpinner();
          this.loadIsInProgress = false;
        })
    );
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
    return JSON.parse(localStorage.getItem('watch_list_ids') || '[]');
  }

  addToWatchList(selectedFilm: FilmListItem): void {
    const storedIds: number[] = this.getWatchListIds();
    storedIds.push(selectedFilm.id);
    localStorage.setItem('watch_list_ids', JSON.stringify(storedIds));
    this.watchListIds = this.getWatchListIds();
  }

  removeFromWatchList(selectedFilm: FilmListItem): void {
    let storedIds: number[] = this.getWatchListIds();
    storedIds = storedIds.filter(id => id !== selectedFilm.id);
    localStorage.setItem('watch_list_ids', JSON.stringify(storedIds));
    this.watchListIds = this.getWatchListIds();
  }

}
