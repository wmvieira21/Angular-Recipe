import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  //@Output('addIngredientParent') addIngredientParent = new EventEmitter<Ingredient>();
  //@ViewChild('amountIngredientInput') amountIngredientInput: ElementRef;
  @ViewChild('refFormShoppingEdit') refFormShoppingEdit: NgForm;

  editMode = false;
  indexIngredientEdit: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.ingredientEdit.subscribe((indexParam) => {
      const ingredient = this.shoppingListService.getIngredient(indexParam);
      this.editMode = true;
      this.indexIngredientEdit = indexParam;

      this.refFormShoppingEdit.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
    });
  }

  onAddNewIngredient(form: NgForm) {
    console.log(form);
    const valueControlers = form.value;
    if (valueControlers.name != "") {
      const ingredient = new Ingredient(valueControlers.name, valueControlers.amount);

      if (!this.editMode) {
        this.shoppingListService.addIngredient(ingredient);
      } else {
        this.shoppingListService.updateIngredient(this.indexIngredientEdit, ingredient);
      }
      form.reset();
      this.editMode = false;
    }
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.indexIngredientEdit);
    this.indexIngredientEdit = null;
  }
}