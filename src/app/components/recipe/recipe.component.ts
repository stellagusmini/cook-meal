import { Component, OnInit } from '@angular/core';
import { faAngleLeft, faBlender, faFlask, faHeart, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from './../../services/localStorage.service';
import { Recipe } from '../../models/Recipe';
import { RecipeService } from '../../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private sanitizer: DomSanitizer, public localStorage: LocalStorageService) { }
  
  recipe: Recipe | undefined;

  private sub = new Subscription();

  faAngleLeft = faAngleLeft;
  faShoppingBasket = faShoppingBasket;
  faBlender = faBlender;
  faHeart = faHeart;
  faFlask = faFlask;
  
  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if(recipeId != null){
      this.getRecipeById(parseInt(recipeId));
    }
  }

  getRecipeById(id: number): void {    
    this.sub = this.recipeService.getRecipeById(id)
        .subscribe(recipe => this.recipe =  recipe);
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from subscription
    this.sub.unsubscribe();
  }

  getIngredients(): string[]{
    let nbr = 1;
    const ingredients: string[] = [];
    //get ingredient and measure with key value and content
    while((this.recipe as any)['strIngredient'+ nbr]){ //use cast because not recognize string as a key of recipe
      const measure = (this.recipe as any)['strMeasure'+ nbr] ? ', '+ (this.recipe as any)['strMeasure'+ nbr] : '';
      ingredients.push((this.recipe as any)['strIngredient'+ nbr] + measure )
      nbr++;
    }
    return ingredients;
  }

  safeVideo(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace("watch?v=", "embed/")); //to use only with safe link
  }

}
