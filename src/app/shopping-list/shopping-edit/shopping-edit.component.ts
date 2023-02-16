import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //@Output('addIngredientParent') addIngredientParent = new EventEmitter<Ingredient>();
  //@ViewChild('amountIngredientInput') amountIngredientInput: ElementRef;
  @ViewChild('refFormShoppingEdit') refFormShoppingEdit: NgForm;

  editMode = false;
  indexIngredientEdit = null;
  ingredientEditSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    this.ingredientEditSubs = this.shoppingListService.ingredientEdit.subscribe((indexParam) => {
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
        //this.shoppingListService.addIngredient(ingredient);

        //Using NGRX.
        this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      } else {
        this.shoppingListService.updateIngredient(this.indexIngredientEdit, ingredient);
      }
      this.editMode = false;
      form.reset();
    }
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.indexIngredientEdit);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.refFormShoppingEdit.reset();
  }

  ngOnDestroy(): void {
    this.ingredientEditSubs.unsubscribe();
  }
}