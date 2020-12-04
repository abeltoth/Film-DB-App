import { FilmListItem } from 'src/app/types';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  apiKey = '9bebc10691cb106cf78fb1678221fb82';
  imageUrl = 'http://image.tmdb.org/t/p/w342/';
  watchListData: FilmListItem[] = [];
  page = 1;
  loadIsInProgress = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    const watchlistIds = this.getWatchlistIds();
    this.fetchWatchlist(watchlistIds);
  }

  getWatchlistIds(): number[] {
    const storedIds: number[] = JSON.parse(localStorage.getItem('watchlist_ids') || '[]');
    return storedIds;
  }

  fetchWatchlist(watchlistIds: number[]): void {
    this.loadIsInProgress = true;
    this.watchListData = [];
    watchlistIds.forEach((id) => {
      this.apiService.get(`/movie/${id}`,
        {
          api_key: this.apiKey
        })
        .subscribe((response: FilmListItem) => {
          this.watchListData.push(response);
        });
    });
    this.loadIsInProgress = false;
  }

  navigateToDetailsPage(selectedFilm: FilmListItem): void {
    const id = selectedFilm.id;
    this.router.navigate([`/films/${id}`]);
  }

  removeFromWatchlist(selectedFilm: FilmListItem): void {
    let storedIds: number[] = this.getWatchlistIds();
    storedIds = storedIds.filter(id => id !== selectedFilm.id);
    localStorage.setItem('watchlist_ids', JSON.stringify(storedIds));
    this.ngOnInit();
  }

}
