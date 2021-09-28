import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { faBook, faSearch, faUtensils } from '@fortawesome/free-solid-svg-icons';

import { Category } from '../../models/Category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  
  @Input() categories: Category[] = [];

  @Output() searchFilterChanged = new EventEmitter<string>();
  @Output() categoryChanged = new EventEmitter<string>();
  
  constructor() { }

  faSearch = faSearch; 
  faUtensils = faUtensils;
  faBook = faBook;

  searchForm = new FormGroup({
    searchText: new FormControl(''),
    category: new FormControl('all')
  });
  
  private sub1 = new Subscription();
  
  ngOnInit(): void {
    this.sub1 = this.searchForm.get("searchText")?.valueChanges
    .pipe(
      debounceTime(500),// Time in milliseconds between key events
      distinctUntilChanged(),// If previous query is diffent from current   
      tap(searchText => {
        this.searchFilterChanged.emit(searchText); 
        this.searchForm.patchValue({ category: 'all' }, {emitEvent: false});//emitEvent false for not do multiple update 
      })
    )
    .subscribe() ?? this.sub1;
  }

  updateCategory(category: string): void{
    this.categoryChanged.emit(category);
    this.searchForm.patchValue({ searchText: '' }, {emitEvent: false});//emitEvent false for not do multiple update 
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscription
    this.sub1.unsubscribe();
  }


}
