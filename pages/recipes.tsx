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

    async function deleteFromDb(id: number) {
        await database.delete(id);
        window.location.reload();
    }

    return(
        <div className="d-flex flex-column w-100">
            <h1 className="align-self-center">Receitas</h1>
            <ul className="recipesList">
            {
                recipes.map((recipe: Recipe) => 
                    <li key={recipe.id} className="d-flex justify-content-between align-items-center me-4">
                        <Link 
                            href={`/new/${recipe.id}`}
                            className="text-decoration-none fs-4">{recipe.name}</Link>
                        <button className="btn-close" onClick={() => recipe.id ? deleteFromDb(recipe.id) : ''}></button>
                    </li>
                )
            }
            </ul>
        </div>
    );
}