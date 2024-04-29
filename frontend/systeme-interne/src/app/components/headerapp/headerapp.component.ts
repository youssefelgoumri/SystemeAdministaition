import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-headerapp',
  templateUrl: './headerapp.component.html',
  styleUrls: ['./headerapp.component.css']
})
export class HeaderappComponent {

  search = faSearch;
  constructor(private route : ActivatedRoute,private router:Router) {
  }
  @Output() searchItem = new EventEmitter<Event>();
  applyFilter(event: Event) {
    this.searchItem.emit(event);

  }
}
