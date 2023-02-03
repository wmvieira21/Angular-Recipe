import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.module';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    /*No longer neded since we're using routing now
    this.recipeService.selectedRecipeService.subscribe((recipe: Recipe) => {
      this.recipe = recipe;
    })*/
  }
}
