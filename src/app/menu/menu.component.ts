import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private location: Location) {}

  ngOnInit() {
    const home = document.getElementById('home');
    const manage = document.getElementById('manage');
    const currentPath = this.location.path();

    console.log("'" + currentPath + "'");

    if (currentPath === '') {
      home?.classList.add('active-btn');
    } else if (currentPath === '/users') {
      manage?.classList.add('active-btn');
    }
  }

  toggle(event: any) {
    const button = event.currentTarget;
    const btns = document.querySelectorAll('.panel button');

    if (!button.classList.contains('active-btn')) {
      btns.forEach((btn) => {
        btn.classList.toggle('active-btn');
      });
    }
  }
}
