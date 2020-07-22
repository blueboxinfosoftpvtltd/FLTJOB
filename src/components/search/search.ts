import { Component, Input } from '@angular/core';

/**
 * Generated class for the SearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {

  // get search data and display in component from tabpage
  @Input('searchres') searchdata: any;
  text: string;

  constructor() {
    console.log('Hello SearchComponent Component');
    this.text = 'Hello World';
    //console.log(this.searchdata);
  }

  ngAfterViewInit() {
    console.log(this.searchdata);
  }

  ionViewWillEnter() {
    console.log('page open');
  }

}
