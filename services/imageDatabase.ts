const DATABASE_NAME = "imagesDatabase";
const DATABASE_VERSION = 1.0;
const objectStoreName = "images";
let database: IDBDatabase;

function openDatabase(openRequest: IDBOpenDBRequest) {
  openRequest.onupgradeneeded = () => {
    database = openRequest.result;
    console.log('openImageDatabase:onupgradeneeded');
    if (database.objectStoreNames.contains(objectStoreName)) return;

    database.createObjectStore(objectStoreName, {
      keyPath: 'id',
      autoIncrement: true,
    });
  };

  openRequest.onerror = () => {
    console.error("Image Database Error", openRequest.error);
  };

  

  openRequest.onblocked = () => {
    alert("Banco de dados de imagens bloqueado");
  };

}

function setOnVersionChange() {
  database.onversionchange = () => {
    console.log("openImageDatabase:onversionchange");

    if (database == null) return;

    database.close();
    alert("Banco de dados de imagens desatualizado. Atualize a página.");
  };
}

export default class ImageDatabase {

  //getAll(): Promise<Recipe[]> {
    //const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    //openDatabase(openRequest);
    //console.log("get all called");
    //return new Promise<Recipe[]>((resolve, reject) => {

      //openRequest.onsuccess = () => {
        //database = openRequest.result;
        //console.log("success openning image database");

        //setOnVersionChange();
        //const transaction = database.transaction(objectStoreName);
        //const objectStore = transaction.objectStore(objectStoreName);
        //const request = objectStore.getAll();
  
        //console.log(`getAll request: ${request}`);

        //request.onerror = () => reject(request.error);
        //request.onsuccess = () => {
          //const result = request.result;
          //resolve(result);
        //}
        //transaction.oncomplete = () => {
          //console.log(`getAll result: ${request.result}`);
          //database.close();
        //}

      //};
    //});
  //}
  
  getById(id: string) {
    console.log('getById called');

    const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDatabase(openRequest);

    return new Promise<Blob>((resolve, reject) => {
      openRequest.onsuccess = () => {
        database = openRequest.result;
        console.log("success openning image database");

        setOnVersionChange();
        const transaction = database.transaction(objectStoreName);
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.get(Number(id));

        console.log(`getAll request: ${request}`);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const result = request.result;
          resolve(result);
        };
        transaction.oncomplete = () => {
          console.log(`getAll result: ${request.result}`);
          database.close();
        };
      };
    });
  }

  create(imageBlob: Blob): Promise<string> {
    const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDatabase(openRequest);

    return new Promise<string>((resolve, reject) => {
    openRequest.onsuccess = () => {
      database = openRequest.result;

      setOnVersionChange();
      const transaction = database.transaction(objectStoreName, 'readwrite');
      const objectStore = transaction.objectStore(objectStoreName);
      console.debug(`image to be saved: ${imageBlob}`);
      
      const request = objectStore.put(imageBlob);

      request.onsuccess = () => {
        const insertedImageId = request.result;
        console.log("imagem adicionada com sucesso", insertedImageId)
        resolve(insertedImageId.toString());
      };
      request.onerror = () => {
        console.log("erro ao adicionar imagem", request.error);
        reject(request.result);
      };
      transaction.oncomplete = () => database.close();
    }
    })
  }

  //async bulkCreate(images: Recipe[]): Promise<boolean>  {
    //const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    //openDatabase(openRequest);

    //return new Promise<boolean>((resolve, reject) => {
      //openRequest.onsuccess = () => {
        //database = openRequest.result;
  
        //setOnVersionChange();
        //const transaction = database.transaction(objectStoreName, 'readwrite');
        //const objectStore = transaction.objectStore(objectStoreName);
        //console.log(`images to be saved: ${images}`);
        
        //for (const recipe of images) {
          //const request = objectStore.put(recipe);
          //request.onsuccess = () => resolve(true);
          //request.onerror = () => reject(request.error);
        //}
  
        //transaction.oncomplete = () => database.close();
      //}
    //});
  //}

  delete(id: number) {
    const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    openDatabase(openRequest);

    openRequest.onsuccess = () => {
      database = openRequest.result;

      setOnVersionChange();
      const transaction = database.transaction(objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);
      console.log(`image id to be deleted: ${id}`);
      const request = objectStore.delete(id);

      request.onsuccess = () =>
        console.log("deletado com sucesso", request.result);
      request.onerror = () => console.log("erro ao deletar", request.error);
      transaction.oncomplete = () => database.close();
    };
  }
}