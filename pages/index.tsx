import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "@/public/receitas_da_ximi.webp";
import { MouseEventHandler, useMemo } from "react";
import Recipe from "@/app/Types/Recipe";
import OldRecipe from "@/app/Types/OldRecipe";
import Database from "@/services/database";

export default function Home() {
  const router = useRouter();
  const database = useMemo(() => new Database(), []);

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
    <div className="d-flex flex-column indexPage mx-auto row-gap-2">
      <Image
        src={Logo}
        className="mx-auto"
        alt="Logo"
        width={260}
        height={360}
      />
      <button
        className="btn btn-info indexButton mx-auto"
        onClick={() => router.push("/recipes")}
      >
        Lista de Receitas
      </button>
      <button
        className="btn btn-info indexButton mx-auto"
        onClick={() => router.push("/new")}
      >
        Nova Receita
      </button>
      <button
        className="btn btn-info indexButton mx-auto"
        onClick={() => router.push("/import")}
      >
        Importar receitas
      </button>
      <button
        className="btn btn-info indexButton mx-auto"
        onClick={handleExportAllButtonClick}
      >
        Exportar todas as receitas
      </button>
    </div>
  );
}
