import { Component, Input, OnInit } from '@angular/core';
import { faAngleRight, faFlask, faHeart } from '@fortawesome/free-solid-svg-icons';

import { LocalStorageService } from '../../services/localStorage.service';
import { Recipe } from '../../models/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {
  constructor(public localStorage: LocalStorageService) { }
  
  faHeart = faHeart;
  faAngleRight = faAngleRight;
  faFlask = faFlask;

  @Input() recipes: Recipe[] = [];

  ngOnInit(): void {  
  }

  getIngredientsNumber(recipe: Recipe): number {
    let nbr = 1;
    //count number of ingredient with key value and content
    while((recipe as any)['strIngredient'+ nbr]){ //use cast because not recognize string as a key of recipe
      nbr++;
    }
    return nbr-1;
  }

}
