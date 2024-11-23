import { FormEvent } from "react";
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from "react";
import Database from "@/services/database";
import Recipe from "@/app/Types/Recipe";

export default function New() {
    const router = useRouter();
    const database = useMemo(() =>  new Database(), []);
    const [recipe, setRecipe] = useState<Recipe>({
        name: '',
        recipePicture: '',
        ingredients: '',
        howToPrepare: '',
    });

    useEffect(()=> {
        if (router.query.id == undefined)
            return;
        
        console.log(`id received: ${router.query.id}`);
        const recipeId = Number(router.query.id);

        if (!recipeId)
            return;
        
        database.getById(recipeId).then(value => {
            console.log(value);
    
            if (value == undefined)
                return;
    
            setRecipe(value);
        });
        
        

    }, [router.query.id, database]);
    
    function onSubmit(event: FormEvent) {
        event.preventDefault();
        if (recipe === undefined
            || recipe.name == ''
            || recipe.ingredients == ''
            || recipe.howToPrepare == ''
        )
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
                                    id: recipe.id,
                                    name: e.target.value,
                                    recipePicture: recipe.recipePicture,
                                    ingredients: recipe.ingredients,
                                    howToPrepare: recipe.howToPrepare,
                                });
                            }
                        } 
                    />
                </div>
                <div className="form-input mb-3">
                    <label htmlFor="recipe-image" className="form-label">Foto da Receita (em breve)</label>
                    <input required type="file" accept=".png .jpeg .jpg" id="recipe-image" disabled className="form-control" />
                </div>
                <div className="form-input mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredientes</label>
                    <textarea required id="ingredients" className="form-control" value={recipe.ingredients} onChange={
                        (e) => {
                            setRecipe(
                                {
                                    id: recipe.id,
                                    name: recipe.name,
                                    recipePicture: recipe.recipePicture,
                                    ingredients: e.target.value,
                                    howToPrepare: recipe.howToPrepare,
                                });
                            }
                        } 
                    />
                </div>
                <div className="form-input mb-3">
                    <label htmlFor="how-to-prepare" className="form-label">Modo de Preparo</label>
                    <textarea required id="how-to-prepare" className="form-control" value={recipe.howToPrepare} onChange={
                        (e) => {
                            setRecipe(
                                {
                                    id: recipe.id,
                                    name: recipe.name,
                                    recipePicture: recipe.recipePicture,
                                    ingredients: recipe.ingredients,
                                    howToPrepare: e.target.value,
                                });
                            }
                        } 
                    />
                </div>
                <div className="btn-group">
                    <button className="btn btn-primary" type="submit">Salvar</button>
                    <button className="btn btn-secondary" type="reset">Limpar</button>
                </div>
            </form>
        </div>
    );
}