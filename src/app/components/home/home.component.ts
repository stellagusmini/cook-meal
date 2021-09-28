import { Component, OnInit } from '@angular/core';

import { Category } from '../../models/Category';
import { Recipe } from '../../models/Recipe';
import { RecipeService } from '../../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  private recipesSub = new Subscription();
  private recipeNameSub = new Subscription();
  private recipeCategorySub = new Subscription();
  private categoriesSub = new Subscription();
  
  recipes: Recipe[] = [];
  categories: Category[] = [];
  initialRecipes: Recipe[] = [];
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
  }

  getRecipes(): void {
    this.recipesSub = this.recipeService.getRecipeByFirstLetter('c')
        .subscribe(recipes => {
          this.recipes =  recipes ? recipes.slice(0, 10) : [];
          this.initialRecipes =  recipes ? recipes.slice(0, 10) : [];
        }); //list of 10 recipes which start by 'c'
  }

  updateRecipesByRecipeName(text: string) {
    if(text != ''){
      this.recipeNameSub = this.recipeService.getRecipeByName(text)
      .subscribe(recipes => this.recipes =  recipes ? recipes.slice(0, 10) : []); //list of 10 recipes 
    }
    else {
      this.recipes = this.initialRecipes;
    }
  }

  updateRecipesByCategoryName(category: string){
    if(category != 'all'){
      this.recipeCategorySub = this.recipeService.getRecipeByCategory(category)
      .subscribe(recipes => this.recipes =  recipes ? recipes.slice(0, 10) : []); //list of 10 recipes 
    }
    else {
      this.recipes = this.initialRecipes;
    }
  }
  
  getCategories():void {
    this.categoriesSub = this.recipeService.getCategories()
      .subscribe(categories => this.categories =  categories); 
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscription
    this.recipesSub.unsubscribe();
    this.recipeNameSub.unsubscribe();
    this.recipeCategorySub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }

}
