import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as AppReducer from '../../store/app.reducer';
import * as RecipeAtcions from '../store/recipe.actions';
import { map } from 'rxjs/operators'
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  editRecipeForm: FormGroup;
  ingredientsFormArray = new FormArray([]);
  storeSubcription: Subscription;

  //propriety get
  get getIngredientsControls() {
    return (this.editRecipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router,
    private store: Store<AppReducer.AppState>) { }


  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = (param['id'] != null);
      this.initForm(this.id);
    });
  }

  initForm(id: number) {
    let name;
    let img;
    let desc;

    if (this.editMode) {
      //const recipe = this.recipeService.getRecipeById(id);

      //NGRX
      this.storeSubcription = this.store.select('recipe').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            console.log(typeof (index));
            console.log(typeof (this.id));
            return (index === this.id);
          })
        })).subscribe((recipe) => {
          name = recipe.name;
          img = recipe.imagePath;
          desc = recipe.description;

          if (recipe['ingredients']) {
            recipe.ingredients.forEach((ingredient) => {
              this.ingredientsFormArray.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
            })
          }
        });
    }

    this.editRecipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(img, Validators.required),
      'description': new FormControl(desc, Validators.required),
      'ingredients': this.ingredientsFormArray
    })
  }

  onSubmit() {
    console.log(this.editRecipeForm.value);
    /*It's possible to pass directily this.editRecipeForm.value,
    since the controlers have the same format and name as the recipe module
    
    public name : String;
    public description : String;
    public imagePath : String;
    public ingredients: Ingredient[];
    */

    if (this.editMode) {
      //this.recipeService.updateRecipe(this.id, this.editRecipeForm.value);
      this.store.dispatch(new RecipeAtcions.UpdateRecipe({ index: this.id, recipe: this.editRecipeForm.value }));
    } else {
      //this.recipeService.addRecipe(this.editRecipeForm.value);
      this.store.dispatch(new RecipeAtcions.AddRecipe(this.editRecipeForm.value));
    }

    this.onCancelEdit();
  }

  onAddIngredient() {
    (<FormArray>this.editRecipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  onCancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editRecipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.storeSubcription) {
      this.storeSubcription.unsubscribe();
    }
  }
}
