import { SubSink } from 'subsink';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  subs = new SubSink();
  isSpinnerVisible = false;

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.subs.add(
      this.spinnerService.isSpinnerVisible$
        .subscribe((isSpinnerVisible) => {
          this.isSpinnerVisible = isSpinnerVisible;
        })
    );
  }

}
