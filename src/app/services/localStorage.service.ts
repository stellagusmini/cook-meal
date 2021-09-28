import { Injectable, OnInit } from '@angular/core';

//locale storage service 
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  toTestLocalStorageLabel = 'toTest';
  toTestLocalStorage: number[] = [];
  
  favoriteLocalStorageLabel = 'favorite';
  favoriteLocalStorage: number[] = [];

  constructor() {
    //get list of favorites recipes in the local storage
    this.favoriteLocalStorage = this.getSavedState(this.favoriteLocalStorageLabel).length ? this.getSavedState(this.favoriteLocalStorageLabel).split(',') : [];
    this.toTestLocalStorage = this.getSavedState(this.toTestLocalStorageLabel).length ? this.getSavedState(this.toTestLocalStorageLabel).split(',') : [];
  }
  
  addRemoveToTest(idRecipe: number): void {
    //add recipe to the 'to test' if it is not present in the list otherwise remove it
    if(!this.isToTest(idRecipe)) {
      this.toTestLocalStorage.push(idRecipe);
    }
    else {
      const index = this.toTestLocalStorage.indexOf(idRecipe);
      if (index > -1) {
        this.toTestLocalStorage.splice(index, 1);
      }
    }
    this.setSavedState(this.toTestLocalStorageLabel, this.toTestLocalStorage.join());
  }

  isToTest(idRecipe: number): boolean { 
    return this.toTestLocalStorage.indexOf(idRecipe) !== -1;
  }

  addRemoveToFavorite(idRecipe: number): void {
    //add recipe to the favorites if it is not present in the list otherwise remove it
    if(!this.isFavorite(idRecipe)) {
      this.favoriteLocalStorage.push(idRecipe);
    }
    else {
      const index = this.favoriteLocalStorage.indexOf(idRecipe);
      if (index > -1) {
        this.favoriteLocalStorage.splice(index, 1);
      }
    }
    this.setSavedState(this.favoriteLocalStorageLabel, this.favoriteLocalStorage.join());
  }

  isFavorite(idRecipe: number): boolean { 
    return this.favoriteLocalStorage.indexOf(idRecipe) !== -1;
  }

  setSavedState(localStorageKey: string, state: any) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): any {
    return JSON.parse(localStorage.getItem(localStorageKey) ?? '[]');
  }
}
