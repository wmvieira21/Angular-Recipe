import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  //@Output('addIngredientParent') addIngredientParent = new EventEmitter<Ingredient>();

  @ViewChild('amountIngredientInput') amountIngredientInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  onAddNewIngredient(nameIngredient: HTMLInputElement) {
    if (nameIngredient.value != "") {
      const ingredient = new Ingredient(nameIngredient.value, this.amountIngredientInput.nativeElement.value);
      this.shoppingListService.addIngredient(ingredient);
    }
  }
}