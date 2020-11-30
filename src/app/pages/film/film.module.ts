import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmRoutingModule } from './film-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [FilmListComponent, FilmDetailsComponent],
  imports: [
    CommonModule,
    FilmRoutingModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    InfiniteScrollModule
  ]
})
export class FilmModule { }
