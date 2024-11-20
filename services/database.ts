import Recipe from "@/app/Types/Recipe";

const DATABASE_NAME = "recipesDatabase";
const DATABASE_VERSION = 1.0;
const objectStoreName = "recipes";
let database: IDBDatabase;

function openDatabase(openRequest: IDBOpenDBRequest) {
  // const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

  openRequest.onupgradeneeded = () => {
    database = openRequest.result;

    if (database.objectStoreNames.contains(objectStoreName)) return;

    database.createObjectStore(objectStoreName, {
      keyPath: "id",
      autoIncrement: true,
    });
  };

  openRequest.onerror = () => {
    console.error("Database Error", openRequest.error);
  };

  

  openRequest.onblocked = () => {
    alert("Banco de dados bloqueado");
  };

}

function setOnVersionChange() {
  database.onversionchange = () => {
    if (database == null) return;

    database.close();
    alert("Banco de dados desatualizado. Atualize a página.");
  };
}

export default class Database {

  database: IDBDatabase | undefined;
  readTransaction: IDBTransaction | undefined;
  readWriteTransaction: IDBTransaction | undefined;

  getAll(): Promise<Recipe[]> {
    const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDatabase(openRequest);
    
    return new Promise<Recipe[]>((resolve, reject) => {

      if (database == null) return new Array<Recipe>();

      openRequest.onsuccess = () => {
        database = openRequest.result;
        // const readTransaction = database.transaction(objectStoreName, "readonly");
        // const readWriteTransaction = database.transaction(objectStoreName, "readwrite");

        setOnVersionChange();
        const transaction = database.transaction(objectStoreName);
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.getAll();
  
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        transaction.oncomplete = () => {
          console.log(request.result);
          database.close();
        }

      };
    });
  }
  
  getById(id: number) {
    if (this.readTransaction == null) return;

    return this.readTransaction.objectStore(objectStoreName).get(id).result;
  }

  create(recipe: Recipe) {
    const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDatabase(openRequest);

    openRequest.onsuccess = () => {
      database = openRequest.result;
      // const readTransaction = database.transaction(objectStoreName, "readonly");
      // const readWriteTransaction = database.transaction(objectStoreName, "readwrite");

      setOnVersionChange();
      const transaction = database.transaction(objectStoreName, 'readwrite');
      const objectStore = transaction.objectStore(objectStoreName);
      const request = objectStore.add(recipe);

      request.onsuccess = () => console.log("adicionado com sucesso", request.result);
      request.onerror = () => console.log("erro ao adicionar", request.error);
      transaction.oncomplete = () => database.close();
    }
  }

  //update(id: number) {}
}