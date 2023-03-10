import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.module';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe1: Recipe;
  @Input() index;
  
  constructor(private recipeService: RecipeService) { }
  
  /*No longer neded since we're using routing now
  onSelected() {
    this.recipeService.selectedRecipeService.emit(this.recipe1);
  }*/
}
