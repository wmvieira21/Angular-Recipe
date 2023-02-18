import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from "../shared/ingredient.module";
import { ShoppingListService } from './shopping-list.service';
import * as  FromShoppingListActions from './store/shopping-list.actions';
import * as FromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  //ingredientsChanged: Subscription;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<FromAppReducer.AppState>) { }

  ngOnInit(): void {
    /*NGRX, As we dispatch new data from edti-component, it'll be displyed here automaticly, 
    since this.store.select('shoppingList') is and Observable and the ngrx itself will handle and subscribe.*/
    this.ingredients = this.store.select('shoppingList');

    /*No longer necessary since we're using NGRX
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientsChanged = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });*/
  }

  onEditIngredient(index: number) {
    //this.shoppingListService.ingredientEdit.next(index);
    this.store.dispatch(new FromShoppingListActions.StarEditing(index));
  }

  ngOnDestroy(): void {
    //this.ingredientsChanged.unsubscribe();
  }
}
