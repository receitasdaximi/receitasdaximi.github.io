import { Recipe } from "@/app/Types/Recipe";

export default class Database {
  DATABASE_NAME = "recipesDatabase";
  DATABASE_VERSION = 1.0;
  objectStoreName = "recipes";

  database: IDBDatabase | undefined;
  readTransaction: IDBTransaction | undefined;
  readWriteTransaction: IDBTransaction | undefined;

  constructor() {
    const openRequest = indexedDB.open(this.DATABASE_NAME, this.DATABASE_VERSION);

    openRequest.onupgradeneeded = () => {
      this.database = openRequest.result;

      if (this.database.objectStoreNames.contains(this.objectStoreName)) return;

      this.database.createObjectStore(this.objectStoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    openRequest.onerror = () => {
      console.error("Database Error", openRequest.error);
    };

    openRequest.onsuccess = () => {
      this.database = openRequest.result;
      this.readTransaction = this.database.transaction(this.objectStoreName, "readonly");
      this.readWriteTransaction = this.database.transaction(this.objectStoreName, "readwrite");

      this.database.onversionchange = () => {
        if (this.database == null)
          return;

        this.database.close();
        alert("Banco de dados desatualizado. Atualize a página.");
      };
    };

    openRequest.onblocked = () => {
      alert("Banco de dados bloqueado");
    };

  }
  //ideia site de festa pagando os presentes no site 

  getAll() {
    if (this.readTransaction == null) return;

    return this.readTransaction.objectStore(this.objectStoreName).getAll();
  }
  
  getById(id: number) {
    if (this.readTransaction == null) return;

    return this.readTransaction.objectStore(this.objectStoreName).get(id).result;
  }

  create(recipe: Recipe) {
    if (this.readWriteTransaction == null) return;

    const request = this.readWriteTransaction
      .objectStore(this.objectStoreName)
      .add(recipe);
    request.onsuccess = () =>
      console.log("adicionado com sucesso", request.result);
    request.onerror = () => console.log("erro ao adicionar", request.error);
  }
  
  //update(id: number) {}
}