import { RecipesService } from './../recipes.service';
import { Recipe } from './../recipe.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-recipe',
    templateUrl: './AddRecipe.component.html',
    styleUrls: ['./AddRecipe.component.css']
})

export class AddRecipeComponent {
    constructor(public recipeService: RecipesService) { }
    submitRecipe = (recipeForm: NgForm) => {
        if (recipeForm.invalid)
            return;
        const recipe: Recipe = {
            id: null,
            name: recipeForm.value.name,
            descripition: recipeForm.value.descripition,
            imageURL: recipeForm.value.imageURL
        }
        this.recipeService.addRecipe(recipe);
    }
}