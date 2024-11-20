import { FormEvent } from "react";
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from "react";
import Database from "@/services/database";
import Recipe from "@/app/Types/Recipe";

export default function New() {
    const router = useRouter();
    const database = useMemo(() =>  new Database(), []);
    const [recipe, setRecipe] = useState<Recipe>({
        id: -1,
        name: 'teste',
        recipePicture: '123',
        ingredients: '123',
        howToPrepare: '123',
    });

    //TODO acertar com useState
    useEffect(()=> {
        if (typeof(router.query.id) != 'string')
            return;

        const recipeId = parseInt(router.query.id);

        if (!recipeId)
            return;
        
        const recipeQuery: Recipe = database.getById(recipeId);
        
        if (recipeQuery == undefined)
            return;

        setRecipe(recipeQuery);
        

    }, [router.query.id, database]);
    
    function onSubmit(event: FormEvent) {
        event.preventDefault();
        if (recipe === undefined)
            return;

        database.create(recipe);
        return;
    }

    return(
        <div className="d-flex flex-column text-center">
            <p className="h1">Nova Receita</p>
            <form onSubmit={(e) =>onSubmit(e)} className="form">
                <div className="form-input mb-3">
                    <label htmlFor="recipe-name" className="form-label">Nome da Receita</label>
                    <input required type="text" id="recipe-name" className="form-control" value={recipe.name} onChange={
                        (e) => {
                            setRecipe(
                                {
                                    id: recipe? recipe.id : -1,
                                    name: e.target.value,
                                    recipePicture: recipe? recipe.recipePicture : '',
                                    ingredients: recipe? recipe.ingredients: '',
                                    howToPrepare: recipe? recipe.howToPrepare: '',
                                });
                            console.log(recipe?.name);
                            }
                        } 
                    />
                </div>
                <div className="form-input mb-3">
                    <label htmlFor="recipe-image" className="form-label">Foto da Receita</label>
                    <input required type="file" accept=".png .jpeg .jpg" id="recipe-image" className="form-control" />
                </div>
                <div className="form-input mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredientes</label>
                    <textarea required id="ingredients" className="form-control" value={recipe.ingredients} />
                </div>
                <div className="form-input mb-3">
                    <label htmlFor="how-to-prepare" className="form-label">Modo de Preparo</label>
                    <textarea required id="how-to-prepare" className="form-control" value={recipe.howToPrepare} />
                </div>
                <div className="btn-group">
                    <button className="btn btn-primary" type="submit">Salvar</button>
                    <button className="btn btn-secondary" type="reset">Limpar</button>
                </div>
            </form>
        </div>
    );
}