import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.module';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @Output('addIngredientParent') addIngredientParent = new EventEmitter<Ingredient>();

  @ViewChild('amountIngredientInput') amountIngredientInput: ElementRef;

  onAddNewIngredient(nameIngredient: HTMLInputElement) {
    if (nameIngredient.value != "") {
      const ingredient = new Ingredient(nameIngredient.value, this.amountIngredientInput.nativeElement.value);
      this.addIngredientParent.emit(ingredient);
    }
  }
}
