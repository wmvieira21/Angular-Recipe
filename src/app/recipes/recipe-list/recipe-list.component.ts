import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.module'
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as AppReducer from '../../store/app.reducer';
import * as RecipeAtcions from '../store/recipe.actions';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangedSubs: Subscription;
  getDataStoraged: Subscription;
  storeRecipe: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute,
    private dataStorage: DataStorageService, private store: Store<AppReducer.AppState>) {
  }

  ngOnInit(): void {
    /*this.recipes = this.recipeService.getRecipes();
    this.recipeChangedSubs = this.recipeService.recipeChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });*/

    //NGRX
    this.storeRecipe = this.store.select('recipe').pipe(
      map(recipeState => recipeState.recipes),
    ).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })

  }

  onCreateNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    //this.recipeChangedSubs.unsubscribe();
    if (this.storeRecipe) {
      this.storeRecipe.unsubscribe();
    }
  }
}
