import { Component, HostListener, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)'}),
        animate('500ms', style({ transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)'}),
        animate('500ms', style({ transform: 'translateY(-100%)'}))
      ])
    ]
    )
  ],
})
export class MenuComponent implements OnInit {

  isMenuItemsVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth > 768) {
      this.isMenuItemsVisible = false;
    }
  }

}
