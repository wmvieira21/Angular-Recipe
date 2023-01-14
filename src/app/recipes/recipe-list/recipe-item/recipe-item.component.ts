import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.module';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe1: Recipe;
  @Output() selectedRecipeItem = new EventEmitter<void>();

  onSelected() {
    this.selectedRecipeItem.emit();
  }
}
