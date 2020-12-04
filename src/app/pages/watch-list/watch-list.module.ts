import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListComponent } from './watch-list.component';
import { WatchListRoutingModule } from './watch-list-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [WatchListComponent],
  imports: [
    CommonModule,
    WatchListRoutingModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class WatchListModule { }
