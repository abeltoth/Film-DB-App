import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  isSpinnerVisible = false;

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.isSpinnerVisible$
      .subscribe((isSpinnerVisible) => {
        this.isSpinnerVisible = isSpinnerVisible;
      });
  }

}