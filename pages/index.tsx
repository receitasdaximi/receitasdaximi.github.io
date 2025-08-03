import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "@/public/receitas_da_ximi.webp";
import {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useMemo,
  useState,
} from "react";
import Recipe from "@/app/Types/Recipe";
import OldRecipe from "@/app/Types/OldRecipe";
import Database from "@/services/database";

export default function Home() {
  const router = useRouter();
  const [fileToImport, setFileToImport] = useState<File | null>(null);
  const database = useMemo(() => new Database(), []);

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
  };

  const handleExportAllButtonClick: MouseEventHandler = async () => {
    const allRecipes: Recipe[] = await database.getAll();
    const recipesAsOldRecipe: OldRecipe[] =
      OldRecipe.ParseFromRecipe(allRecipes);
    const jsonString = JSON.stringify(recipesAsOldRecipe, null);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "receitas.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="d-flex flex-column indexPage mx-auto">
      <Image src={Logo} alt="Logo" />
      <button
        className="btn btn-info indexButton m-2 mt-4"
        onClick={() => router.push("/recipes")}
      >
        Lista de Receitas
      </button>
      <button
        className="btn btn-info indexButton m-2"
        onClick={() => router.push("/new")}
      >
        Nova Receita
      </button>
      <button
        className="btn btn-info indexButton m-2"
        onClick={handleExportAllButtonClick}
      >
        Exportar todas as receitas
      </button>
      <div className="accordion indexButton m-2" id="importAccordion" style={{width: "400px" }}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button btn-info fw-bold text-light collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Importar receitas
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#importAccordion"
          >
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
        </div>
      </div>
    </div>
  );
}
