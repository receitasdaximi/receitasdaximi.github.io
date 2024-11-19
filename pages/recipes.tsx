import { Recipe } from "@/app/Types/Recipe";
import Link from "next/link";
import Database from "@/services/database";
import { useEffect } from "react";

export default function Recipes() {
    const database = Database();
    useEffect(() => {
        let recipesQuery = database.getAll();
        if (recipesQuery)
            recipes = recipesQuery;
    });
    let recipes: Recipe[] = [
        {
            id: 0, 
            name: 'topoki',
            recipePicture: 'foto', 
            ingredients: ['agua', 'arroz'],
            howToPrepare: 'coloca arroz na agua'
        },
        {
            id: 1,  
            name: 'topoki',
            recipePicture: 'foto', 
            ingredients: ['agua', 'arroz'],
            howToPrepare: 'coloca arroz na agua'
        },
        {
            id: 2,  
            name: 'topoki',
            recipePicture: 'foto', 
            ingredients: ['agua', 'arroz'],
            howToPrepare: 'coloca arroz na agua'
        },
    ];
    return(
        <div>
            <h1>Receitas</h1>
            <ul className="recipesList">
            {
                recipes.map((recipe: Recipe) => 
                    <li key={recipe.id}>
                        <Link 
                            href={`/new/${recipe.id}`}
                            className="text-decoration-none fs-4">{recipe.name}</Link>
                    </li>
                )
            }
            </ul>
        </div>
    );
}