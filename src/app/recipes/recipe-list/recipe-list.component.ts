import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.module'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() selectItemDetailsList = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A teste recipe', 'this is simply a teste',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    ),
    new Recipe('A teste recipe1', 'this ',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    )
  ];

  constructor() {

  }

  onSelectedRecipe(recipe: Recipe) {
    this.selectItemDetailsList.emit(recipe);
  }
}
