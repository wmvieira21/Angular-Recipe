import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  editRecipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }


  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
      this.editMode = (param['id'] != null);
      this.initForm(this.id);
    });
  }
  initForm(id: number) {
    let name;
    let img;
    let desc;
    let ingredientsFormArray: FormArray;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(id);
      name = recipe.name;
      img = recipe.imagePath;
      desc = recipe.description;

      recipe.ingredients.forEach((ingredient) => {
        ingredientsFormArray.push(new FormGroup({
          'name': new FormControl(ingredient.name),
          'amount': new FormControl(ingredient.amount)
        }));
      })
    };

    this.editRecipeForm = new FormGroup({
      'nameRecipe': new FormControl(name),
      'imgPathRecipe': new FormControl(img),
      'descriptionRecipe': new FormControl(desc),
      'ingredients': ingredientsFormArray
    })
  }
  onSubmit() {
    console.log(this.editRecipeForm);
  }

  getIngredientsControls() {
    return (<FormArray>this.editRecipeForm.get('ingredients')).controls;
  }
}
