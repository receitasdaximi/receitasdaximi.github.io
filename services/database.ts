import Recipe from "@/app/Types/Recipe";

const DATABASE_NAME = "recipesDatabase";
const DATABASE_VERSION = 1.0;
const objectStoreName = "recipes";
let database: IDBDatabase;

function openDatabase(openRequest: IDBOpenDBRequest) {
  openRequest.onupgradeneeded = () => {
    database = openRequest.result;
    console.log('openDatabase:onupgradeneeded');
    if (database.objectStoreNames.contains(objectStoreName)) return;

    database.createObjectStore(objectStoreName, {
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
    console.log("openDatabase:onversionchange");

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
    console.log("get all called");
    return new Promise<Recipe[]>((resolve, reject) => {

      openRequest.onsuccess = () => {
        database = openRequest.result;
        console.log("success openning database");

        setOnVersionChange();
        const transaction = database.transaction(objectStoreName);
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.getAll();
  
        console.log(`getAll request: ${request}`);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const result = request.result;
          let id = 1;
          result.map((value) => value.id = id++);
          resolve(result);
        }
        transaction.oncomplete = () => {
          console.log(`getAll result: ${request.result}`);
          database.close();
        }

      };
    });
  }
  
  getById(id: number) {
    console.log('getById called');

    const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDatabase(openRequest);

    return new Promise<Recipe>((resolve, reject) => {
      openRequest.onsuccess = () => {
        database = openRequest.result;
        console.log("success openning database");

        setOnVersionChange();
        const transaction = database.transaction(objectStoreName);
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.get(id);

        console.log(`getAll request: ${request}`);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const result = request.result;
          result.id = id;
          resolve(result);
        };
        transaction.oncomplete = () => {
          console.log(`getAll result: ${request.result}`);
          database.close();
        };
      };
    });
  }

  create(recipe: Recipe) {
    const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDatabase(openRequest);

    openRequest.onsuccess = () => {
      database = openRequest.result;

      setOnVersionChange();
      const transaction = database.transaction(objectStoreName, 'readwrite');
      const objectStore = transaction.objectStore(objectStoreName);
      console.log(`recipe to be saved: ${recipe}`);
      const request = objectStore.put(recipe);

      request.onsuccess = () => console.log("adicionado com sucesso", request.result);
      request.onerror = () => console.log("erro ao adicionar", request.error);
      transaction.oncomplete = () => database.close();
    }
  }

  //update(id: number) {}
}