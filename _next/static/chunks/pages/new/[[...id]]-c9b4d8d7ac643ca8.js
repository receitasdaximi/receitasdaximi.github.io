(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[378],{7292:(e,o,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/new/[[...id]]",function(){return r(5735)}])},5735:(e,o,r)=>{"use strict";r.r(o),r.d(o,{default:()=>a});var s=r(4848),t=r(6715),n=r(6540),l=r(9028);function a(){let e=(0,t.useRouter)(),o=(0,n.useMemo)(()=>new l.A,[]),[r,a]=(0,n.useState)({name:"",recipePicture:"",ingredients:"",howToPrepare:""});return(0,n.useEffect)(()=>{if(void 0==e.query.id)return;console.log("id received: ".concat(e.query.id));let r=Number(e.query.id);r&&o.getById(r).then(e=>{console.log(e),void 0!=e&&a(e)})},[e.query.id,o]),(0,s.jsxs)("div",{className:"d-flex flex-column mx-3",children:[(0,s.jsx)("p",{className:"h1",children:"Nova Receita"}),(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault(),void 0!==r&&""!=r.name&&""!=r.ingredients&&""!=r.howToPrepare&&o.create(r)},className:"form",children:[(0,s.jsxs)("div",{className:"form-input mb-3",children:[(0,s.jsx)("label",{htmlFor:"recipe-name",className:"form-label fw-bold",children:"Nome da Receita"}),(0,s.jsx)("input",{required:!0,type:"text",id:"recipe-name",className:"form-control",value:r.name,onChange:e=>{a({id:r.id,name:e.target.value,recipePicture:r.recipePicture,ingredients:r.ingredients,howToPrepare:r.howToPrepare})}})]}),(0,s.jsxs)("div",{className:"form-input mb-3",children:[(0,s.jsx)("label",{htmlFor:"ingredients",className:"form-label fw-bold",children:"Ingredientes"}),(0,s.jsx)("textarea",{required:!0,id:"ingredients",className:"form-control",value:r.ingredients,onChange:e=>{a({id:r.id,name:r.name,recipePicture:r.recipePicture,ingredients:e.target.value,howToPrepare:r.howToPrepare})}})]}),(0,s.jsxs)("div",{className:"form-input mb-3",children:[(0,s.jsx)("label",{htmlFor:"how-to-prepare",className:"form-label fw-bold",children:"Modo de Preparo"}),(0,s.jsx)("textarea",{required:!0,id:"how-to-prepare",className:"form-control",value:r.howToPrepare,onChange:e=>{a({id:r.id,name:r.name,recipePicture:r.recipePicture,ingredients:r.ingredients,howToPrepare:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-input mb-3",children:[(0,s.jsx)("label",{htmlFor:"recipe-image",className:"form-label fw-bold",children:"Foto da Receita (em breve)"}),(0,s.jsx)("input",{required:!0,type:"file",accept:".png .jpeg .jpg",id:"recipe-image",disabled:!0,className:"form-control"})]}),(0,s.jsxs)("div",{className:"btn-group",children:[(0,s.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Salvar"}),(0,s.jsx)("button",{className:"btn btn-secondary",type:"reset",children:"Limpar"})]})]})]})}},9028:(e,o,r)=>{"use strict";let s;r.d(o,{A:()=>c});let t="recipesDatabase",n="recipes";function l(e){e.onupgradeneeded=()=>{s=e.result,console.log("openDatabase:onupgradeneeded"),s.objectStoreNames.contains(n)||s.createObjectStore(n,{keyPath:"id",autoIncrement:!0})},e.onerror=()=>{console.error("Database Error",e.error)},e.onblocked=()=>{alert("Banco de dados bloqueado")}}function a(){s.onversionchange=()=>{console.log("openDatabase:onversionchange"),null!=s&&(s.close(),alert("Banco de dados desatualizado. Atualize a p\xe1gina."))}}class c{getAll(){let e=indexedDB.open(t,1);return l(e),console.log("get all called"),new Promise((o,r)=>{e.onsuccess=()=>{s=e.result,console.log("success openning database"),a();let t=s.transaction(n),l=t.objectStore(n).getAll();console.log("getAll request: ".concat(l)),l.onerror=()=>r(l.error),l.onsuccess=()=>{o(l.result)},t.oncomplete=()=>{console.log("getAll result: ".concat(l.result)),s.close()}}})}getById(e){console.log("getById called");let o=indexedDB.open(t,1);return l(o),new Promise((r,t)=>{o.onsuccess=()=>{s=o.result,console.log("success openning database"),a();let l=s.transaction(n),c=l.objectStore(n).get(e);console.log("getAll request: ".concat(c)),c.onerror=()=>t(c.error),c.onsuccess=()=>{r(c.result)},l.oncomplete=()=>{console.log("getAll result: ".concat(c.result)),s.close()}}})}create(e){let o=indexedDB.open(t,1);l(o),o.onsuccess=()=>{s=o.result,a();let r=s.transaction(n,"readwrite"),t=r.objectStore(n);console.log("recipe to be saved: ".concat(e)),void 0==e.id&&delete e.id;let l=t.put(e);l.onsuccess=()=>console.log("adicionado com sucesso",l.result),l.onerror=()=>console.log("erro ao adicionar",l.error),r.oncomplete=()=>s.close()}}delete(e){let o=indexedDB.open(t,1);l(o),o.onsuccess=()=>{s=o.result,a();let r=s.transaction(n,"readwrite"),t=r.objectStore(n);console.log("recipe id to be deleted: ".concat(e));let l=t.delete(e);l.onsuccess=()=>console.log("deletado com sucesso",l.result),l.onerror=()=>console.log("erro ao deletar",l.error),r.oncomplete=()=>s.close()}}}},6715:(e,o,r)=>{e.exports=r(4009)}},e=>{var o=o=>e(e.s=o);e.O(0,[636,593,792],()=>o(7292)),_N_E=e.O()}]);