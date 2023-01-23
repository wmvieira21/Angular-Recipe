import { Component, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipeDetails: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  addToShoppingList() {
    this.shoppingListService.ingredientsToShopping(this.recipeDetails);
  }
}
