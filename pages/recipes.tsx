import Recipe from "@/app/Types/Recipe";
import Link from "next/link";
import Database from "@/services/database";
import { useEffect, useState, useMemo } from "react";

export default function Recipes() {
    const database = useMemo(() =>  new Database(), []);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    
    useEffect(() => {
        database.getAll().then(value => {
            
            console.log(`recipesQuery: ${value}`);
    
            if (value == undefined)
                return;
    
            setRecipes(value);
            setFilteredRecipes(value);
        });
    }, [database]);

    async function deleteFromDb(id: number) {
        await database.delete(id);
        window.location.reload();
    }

    return(
        <div className="d-flex flex-column w-100">
            <h1 className="align-self-center">Receitas</h1>
            <input type="text" name="search-recipe" id="search-recipe" className="form-control m-2 my-4 w-75 align-self-center" onChange={(e) => {
                const inputValue = e.target.value;
                if (e.target.value === '') {
                    setFilteredRecipes(recipes);
                    return;
                }
                setFilteredRecipes(recipes.filter(recipe => recipe.name.includes(inputValue)));
            }} />
            <ul className="recipesList">
            {
                filteredRecipes.map((recipe: Recipe) => 
                    <div key={recipe.id}>
                        <li className="d-flex justify-content-between align-items-center me-4">
                            <Link 
                                href={`/new/${recipe.id}`}
                                className="text-decoration-none fs-4">{recipe.name}</Link>
                            <button className="btn-close" onClick={() => recipe.id ? deleteFromDb(recipe.id) : ''}></button>
                        </li>
                        <hr className="me-4"/>
                    </div>
                )
            }
            </ul>
        </div>
    );
}