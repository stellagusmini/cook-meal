import { Categories, Category } from '../models/Category';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meals } from '../models/Meals';
import { Observable } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://www.themealdb.com/api/json/v1/1/";
  
  getRecipeByName(name: string): Observable<Recipe[]> {
    return this.http.get<Meals>(`${this.baseUrl}search.php?s=${name}`).pipe(
      map( item => {  
          return item.meals; // we need only list of recipe
      })
   );
  }

  getRecipeByFirstLetter(letter: string): Observable<Recipe[]> {
    return this.http.get<Meals>(`${this.baseUrl}search.php?f=${letter}`).pipe(
      map( item => {  
          return item.meals; // we need only list of recipe
      })
   );
  }

  getRecipeById(id: number): Observable<Recipe|undefined> {
    return this.http.get<Meals>(`${this.baseUrl}lookup.php?i=${id}`).pipe(
      map( item => {  
          return item.meals && item.meals.length  ? item.meals[0] : undefined; // we need only a recipe
      })
   );
  }

  getRecipeByCategory(categoryName: string): Observable<Recipe[]> {
    return this.http.get<Meals>(`${this.baseUrl}filter.php?c=${categoryName}`).pipe(
      map( item => {  
          return item.meals; // we need only list of recipe
      })
   );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Categories>(`${this.baseUrl}categories.php`).pipe(
      map( item => {  
          return item.categories; 
      })
   );
  }

}