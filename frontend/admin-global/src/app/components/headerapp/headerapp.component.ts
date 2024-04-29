import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faSearch,faHome} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-headerapp',
  templateUrl: './headerapp.component.html',
  styleUrls: ['./headerapp.component.css']
})
export class HeaderappComponent {//implements OnInit{
  search = faSearch;
  constructor(private route : ActivatedRoute,private router:Router) {
  }
  @Output() searchItem = new EventEmitter<Event>();
  applyFilter(event: Event) {
    this.searchItem.emit(event);

  }

}
