import {Component, OnInit} from '@angular/core';
import {RouteService} from "../../services/route.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = '';

  constructor(private routerService: RouteService) {
  }

  ngOnInit(): void {
    this.routerService.getRouteData()
      .subscribe(data => this.title = data.title);
  }

}
