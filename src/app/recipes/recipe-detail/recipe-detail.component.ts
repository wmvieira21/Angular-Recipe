import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';

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
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeID = params['id'];
      this.recipeDetails = this.recipesService.getRecipeById(this.selectedRecipeID);;
    });
  }

  addToShoppingList() {
    this.shoppingListService.ingredientsToShopping(this.recipeDetails);
  }

  onEditRecipe() {
    //this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.selectedRecipeID, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.selectedRecipeID);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
  }
}
