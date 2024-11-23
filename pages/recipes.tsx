import Recipe from "@/app/Types/Recipe";
import Link from "next/link";
import Database from "@/services/database";
import { useEffect, useState, useMemo } from "react";

export default function Recipes() {
    const database = useMemo(() =>  new Database(), []);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    
    useEffect(() => {
        database.getAll().then(value => {
            
            console.log(`recipesQuery: ${value}`);
    
            if (value == undefined)
                return;
    
            setRecipes(value);
        });
    }, [database]);

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