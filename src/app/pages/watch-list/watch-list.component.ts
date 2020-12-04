import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { FilmListItem } from 'src/app/types';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  page = 1;
  subs = new SubSink();
  loadIsInProgress = false;
  watchListIds: number[] = [];
  watchListData: FilmListItem[] = [];
  imageUrl = 'http://image.tmdb.org/t/p/w342/';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.watchListIds = this.getWatchListIds();
    this.fetchWatchList(this.watchListIds);
  }

  getWatchListIds(): number[] {
    const storedIds: number[] = JSON.parse(localStorage.getItem('watch_list_ids') || '[]');
    return storedIds;
  }

  fetchWatchList(watchListIds: number[]): void {
    this.loadIsInProgress = true;
    this.spinnerService.showSpinner();
    this.watchListData = [];

    watchListIds.forEach((id, index) => {
      this.subs.add(
        this.apiService.get(`/movie/${id}`)
          .subscribe((response: FilmListItem) => {
            this.watchListData.push(response);
            if (index === watchListIds.length - 1) {
              this.spinnerService.hideSpinner();
              this.loadIsInProgress = false;
            }
          })
      );
    });
  }

  navigateToDetailsPage(selectedFilm: FilmListItem): void {
    const id = selectedFilm.id;
    this.router.navigate([`/films/${id}`]);
  }

  removeFromWatchList(selectedFilm: FilmListItem): void {
    let storedIds: number[] = this.getWatchListIds();
    storedIds = storedIds.filter(id => id !== selectedFilm.id);
    localStorage.setItem('watch_list_ids', JSON.stringify(storedIds));
    this.ngOnInit();
  }

}
