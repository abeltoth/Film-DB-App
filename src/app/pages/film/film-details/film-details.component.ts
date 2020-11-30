import { FilmDetails } from './../../../types';
import { Component, OnInit, QueryList, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {

  @ViewChild('actorContainer') actorContainer: ElementRef;
  @ViewChildren('reviewContainer') reviewContainers: QueryList<ElementRef>;

  apiKey = '9bebc10691cb106cf78fb1678221fb82';
  imageUrl = 'http://image.tmdb.org/t/p/original/';
  details: FilmDetails;

  constructor(
    private apiService: ApiService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.get(`/movie/${id}`,
      {
        api_key: this.apiKey,
        append_to_response: 'reviews,credits'
      })
      .subscribe((response: FilmDetails) => {
        this.details = response;
        this.spinnerService.hideSpinner();
      });
  }

  toggleActors(): void {
    if (this.actorContainer.nativeElement.style['max-height'] === 'initial') {
      this.actorContainer.nativeElement.style['max-height'] = '295px';
    } else {
      this.actorContainer.nativeElement.style['max-height'] = 'initial';
    }
  }

  toggleReview(reviewIndex: number): void {
    const reviewContainer = this.reviewContainers.toArray()[reviewIndex];

    if (reviewContainer.nativeElement.style['max-height'] === 'initial') {
      reviewContainer.nativeElement.style['max-height'] = '100px';
    } else {
      reviewContainer.nativeElement.style['max-height'] = 'initial';
    }
  }

}
