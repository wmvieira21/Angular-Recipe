import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';
import * as FromShoppingListActions from '../store/shopping-list.actions';
import * as FromAppReducer from '../../store/app.reducer';

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
    private store: Store<FromAppReducer.AppState>) { }

  ngOnInit(): void {
    /*this.ingredientEditSubs = this.shoppingListService.ingredientEdit.subscribe((indexParam) => {
      const ingredient = this.shoppingListService.getIngredient(indexParam);
      this.editMode = true;
      this.indexIngredientEdit = indexParam;

      this.refFormShoppingEdit.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
    });*/

    //NGRX
    this.ingredientEditSubs = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.indexIngredientEdit = stateData.editedIngredientIndex;
        const ingredient = stateData.editedingredient;

        this.refFormShoppingEdit.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      } else {
        this.editMode = false;
      }
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
        this.store.dispatch(new FromShoppingListActions.AddIngredient(ingredient));
      } else {
        //this.shoppingListService.updateIngredient(this.indexIngredientEdit, ingredient);
        //Using NGRX.
        this.store.dispatch(new FromShoppingListActions.UpdateIngredient(ingredient));
      }
      this.editMode = false;
      form.reset();
    }
  }

  onDelete() {
    //this.shoppingListService.deleteIngredient(this.indexIngredientEdit);
    //Using NGRX.
    this.store.dispatch(new FromShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.refFormShoppingEdit.reset();
    this.store.dispatch(new FromShoppingListActions.StopEditing());
  }

  ngOnDestroy(): void {
    if (this.ingredientEditSubs) {
      this.ingredientEditSubs.unsubscribe();
    }
    this.store.dispatch(new FromShoppingListActions.StopEditing());
  }
}