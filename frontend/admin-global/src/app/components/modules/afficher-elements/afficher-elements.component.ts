import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Module } from '../modules-home/modules-home.component';

export interface Element{
  id: number;
  partieCours: string;
  partieTPs: string;
  coefficientCours: number;
  coefficientTPs: number;
  controbution: number;
}

@Component({
  selector: 'app-afficher-elements',
  templateUrl: './afficher-elements.component.html',
  styleUrl: './afficher-elements.component.css'
})
export class AfficherElementsComponent implements AfterViewInit {
  elements: Element[] = []
  displayedColumns: string[] = ['partie cours', 'partie TP', 'coefficient cours', 'coefficient TP']; //, 'contribution'
  ElementsSource!: MatTableDataSource<Element>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;
  module!: Module;
  element!: Element | undefined;

  constructor(private route: Router, private http: HttpClient) {
    const moduleId = this.route.url.split('/')[2];
    http.get<Element[]>(`http://localhost:2222/SERVICE-MODULE/modules/${moduleId}/elements`).subscribe(
      (elements) => {
        this.elements = elements;
        this.ElementsSource.data =this.elements;
        http.get<Module>(`http://localhost:2222/SERVICE-MODULE/modules/${moduleId}`).subscribe((module)=> {
          this.module = module;
          this.element = module.elementsModule.at(0);
        });
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des elements :', error);
      }
    );
    this.ElementsSource = new MatTableDataSource(this.elements);
  }

  ngAfterViewInit() {
    this.ElementsSource.paginator = this.paginator;
    this.ElementsSource.sort = this.sort;
  }

  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }

  applyFilter(event: Event) {
    this.search = event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.ElementsSource.filter = filterValue.trim().toLowerCase();

    if (this.ElementsSource.paginator) {
      this.ElementsSource.paginator.firstPage();
    }
  }

  return(){
    this.route.navigateByUrl("modules");
  }
}