import { Component } from '@angular/core';
import { Ingredient } from "../shared/ingredient.module";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Potato',5),
    new Ingredient('tomatos',15)];
}
