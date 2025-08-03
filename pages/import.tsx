import { FormEvent, FormEventHandler, useMemo, useState } from "react";
import Recipe from "@/app/Types/Recipe";
import OldRecipe from "@/app/Types/OldRecipe";
import Database from "@/services/database";
import { useRouter } from "next/navigation";

export default function Import() {
  const [fileToImport, setFileToImport] = useState<File | null>(null);
  const database = useMemo(() => new Database(), []);
  const router = useRouter();

  const handleImportFormSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent
  ) => {
    event.preventDefault();
    if (!fileToImport) {
      alert("Selecione um arquivo para ser importado.");
      return;
    }

    const fileContent = await fileToImport.text();

    if (!fileContent) {
      alert("Arquivo inválido.");
      return;
    }

    const importedJson: Recipe[] | OldRecipe[] = JSON.parse(fileContent);
    if (!importedJson) {
      alert("Arquivo inválido.");
      return;
    }

    const parsedRecipes = importedJson.map((r) =>
      r instanceof Recipe
        ? new Recipe(
            r.name,
            r.recipePicture ?? "",
            r.ingredients ?? "",
            r.howToPrepare ?? ""
          )
        : new Recipe(r.title, "", r.ingredients, r.instructions)
    );

    const result = await database.bulkCreate(parsedRecipes);
    if (!result) {
      alert("Falha ao importar receitas.");
    }

    alert("Receitas importadas com sucesso.");
    router.push("/recipes");
  };
  return (
    <div className="d-flex flex-column justify-content-center items-center h-100 row-gap-2">
      <h1 className="align-self-center">Importar receitas</h1>

      <form
        className="d-flex flex-column form p-4 row-gap-3"
        onSubmit={(e) => handleImportFormSubmit(e)}
      >
        <input
          type="file"
          accept="application/JSON"
          className="form-control mx-auto"
          onChange={(e) =>
            setFileToImport(e.target.files ? e.target.files[0] : null)
          }
        />
        <button className="btn btn-secondary mx-auto" type="submit">
          Importar
        </button>
      </form>
    </div>
  );
}
