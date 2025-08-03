import { FormEvent, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import Database from "@/services/database";
import Recipe from "@/app/Types/Recipe";
import OldRecipe from "@/app/Types/OldRecipe";

export default function New() {
  const router = useRouter();
  const database = useMemo(() => new Database(), []);
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    recipePicture: "",
    ingredients: "",
    howToPrepare: "",
  });

  useEffect(() => {
    if (router.query.id == undefined) return;

    console.log(`id received: ${router.query.id}`);
    const recipeId = Number(router.query.id);

    if (!recipeId) return;

    database.getById(recipeId).then((value) => {
      console.log(value);

      if (value == undefined) return;

      setRecipe(value);
    });
  }, [router.query.id, database]);

  const handleExportButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (
      recipe === undefined ||
      recipe.name == "" ||
      recipe.ingredients == "" ||
      recipe.howToPrepare == ""
    ) {
      alert("Erro ao exportar receita.");
      return;
    }

    const recipeToSave: Recipe[] = [];
    recipeToSave.push(recipe);
    const recipeAsOldRecipe: OldRecipe[] =
      OldRecipe.ParseFromRecipe(recipeToSave);
    const jsonString = JSON.stringify(recipeAsOldRecipe, null);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receita_${recipe.name}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      recipe === undefined ||
      recipe.name == "" ||
      recipe.ingredients == "" ||
      recipe.howToPrepare == ""
    ) {
      alert("Erro ao salvar receita.");
      return;
    }

    database.create(recipe);
    alert("Receita salva com sucesso!");
    router.push("/recipes");
  }

  return (
    <div className="d-flex flex-column mx-3">
      <p className="h1">Nova Receita</p>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-input mb-3">
          <label htmlFor="recipe-name" className="form-label fw-bold">
            Nome da Receita
          </label>
          <input
            required
            type="text"
            id="recipe-name"
            className="form-control"
            value={recipe.name}
            onChange={(e) => {
              setRecipe({
                id: recipe.id,
                name: e.target.value,
                recipePicture: recipe.recipePicture,
                ingredients: recipe.ingredients,
                howToPrepare: recipe.howToPrepare,
              });
            }}
          />
        </div>
        <div className="form-input mb-3">
          <label htmlFor="ingredients" className="form-label fw-bold">
            Ingredientes
          </label>
          <textarea
            required
            id="ingredients"
            className="form-control"
            value={recipe.ingredients}
            onChange={(e) => {
              setRecipe({
                id: recipe.id,
                name: recipe.name,
                recipePicture: recipe.recipePicture,
                ingredients: e.target.value,
                howToPrepare: recipe.howToPrepare,
              });
            }}
          />
        </div>
        <div className="form-input mb-3">
          <label htmlFor="how-to-prepare" className="form-label fw-bold">
            Modo de Preparo
          </label>
          <textarea
            required
            id="how-to-prepare"
            className="form-control"
            value={recipe.howToPrepare}
            onChange={(e) => {
              setRecipe({
                id: recipe.id,
                name: recipe.name,
                recipePicture: recipe.recipePicture,
                ingredients: recipe.ingredients,
                howToPrepare: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-input mb-3">
          <label htmlFor="recipe-image" className="form-label fw-bold">
            Foto da Receita (em breve)
          </label>
          <input
            required
            type="file"
            accept=".png .jpeg .jpg"
            id="recipe-image"
            disabled
            className="form-control"
          />
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" type="submit">
            Salvar
          </button>
          <button className="btn btn-secondary" type="reset">
            Limpar
          </button>
        </div>
      </form>
      {!!router.query.id && (
        <button
          className="btn btn-info indexButton mt-4"
          onClick={handleExportButtonClick}
        >
          Exportar receita
        </button>
      )}
    </div>
  );
}
