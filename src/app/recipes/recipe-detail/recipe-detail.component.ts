import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as AppReducer from '../../store/app.reducer';
import * as RecipeAtcions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  /*There is no use anymore, since we're using routing.
  @Input() recipeDetails: Recipe;*/

  recipeDetails: Recipe;
  selectedRecipeID: number;

  constructor(private shoppingListService: ShoppingListService, private recipesService: RecipeService, private route: ActivatedRoute,
    private router: Router, private store: Store<AppReducer.AppState>) { }

  ngOnInit(): void {
    /*this.route.params.subscribe((params: Params) => {
      this.selectedRecipeID = params['id'];
      this.recipeDetails = this.recipesService.getRecipeById(this.selectedRecipeID);;
    });*/

    this.route.params.pipe(map(params => {
      return +params['id'];
    }),
      switchMap(id => {
        this.selectedRecipeID = id;
        return this.store.select('recipe')
      })).pipe(map(store => {
        return store.recipes.find((recipe, index) => {
          return index === this.selectedRecipeID;
        })
      })).subscribe({
        next: (recipe) => this.recipeDetails = recipe
      })
  }

  addToShoppingList() {
    //this.shoppingListService.ingredientsToShopping(this.recipeDetails);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetails.ingredients));
  }

  onEditRecipe() {
    //this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.selectedRecipeID, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    //this.recipesService.deleteRecipe(this.selectedRecipeID);
    this.store.dispatch(new RecipeAtcions.DeleteRecipe(this.selectedRecipeID));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
  }
}
