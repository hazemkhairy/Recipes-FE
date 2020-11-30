import { RecipesService } from './../recipes.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-display-recipes',
    templateUrl: './DisplayRecipes.component.html',
    styleUrls: ['./DisplayRecipes.component.css']
})
export class DisplayRecipesComponent implements OnInit, OnDestroy {
    constructor(public recipeService: RecipesService) { }
    recipes: Recipe[] = [];
    private recipesSub: Subscription;
    ngOnInit () {
        console.log('init')
        this.recipeService.getRecipes();
        this.recipesSub=this.recipeService.getRecipeUpdateListener().subscribe(
            (recipes) => {
                this.recipes = recipes
            }
        )
    }
    ngOnDestroy () {
        this.recipesSub.unsubscribe();
    }
}