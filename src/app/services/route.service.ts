import { Injectable } from '@angular/core';
import { ResolveStart, Router } from '@angular/router';
import { filter, Observable , map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { } 
  
  getRouteData(): Observable<any>{
    return this.router.events.pipe(
      filter(event => event instanceof ResolveStart),
      map(event => {
        let data = null;
        let route = event['state'].root;
        while(route) {
          data = route.data || data;
          route = route.firstChild;
        }
        return data;
      }
        ),

    );
  }
}
