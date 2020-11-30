import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';


@Injectable({ providedIn: 'root' })
export class RecipesService {
    private recipes: Recipe[] = [];
    private recipesUpdated = new Subject<Recipe[]>();

    constructor(private http: HttpClient) { }

    getRecipes = () => {
        this.http.get<{ message: string, recipes: Recipe[] }>('http://localhost:3000/api/recipes')
            .subscribe((data) => {
                this.recipes = data.recipes;
                console.log('got new recipes', data.recipes)
                this.recipesUpdated.next([...this.recipes])
            }
            )
    }

    getRecipeUpdateListener = () => {
        return this.recipesUpdated.asObservable();
    }
    addRecipe = (recipe: Recipe) => {
        this.http.post<{ message: string }>('http://localhost:3000/api/addRecipe', recipe)
            .subscribe((data) => {
                this.recipes.push(recipe);
                this.recipesUpdated.next([...this.recipes])
            }
            )
    }
}