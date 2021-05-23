import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {
  isSelected = 'home'
  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    this.isSelected = window.location.pathname.replace("/", "");
  }



  navigateToPage(page: string) {
    this.isSelected = page
    this._router.navigate([page])
  }

}
