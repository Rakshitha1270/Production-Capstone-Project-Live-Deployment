const $ = id => document.getElementById(id);
const ITEMS_KEY = "capstoneCatalogItemsV1";
const USER_KEY = "capstoneCatalogUserV1";
const starterItems = [
 {id:"demo1",name:"Wireless Headphones",category:"Electronics",price:2499,description:"Comfortable everyday headphones with clear sound."},
 {id:"demo2",name:"Travel Backpack",category:"Lifestyle",price:1499,description:"A lightweight backpack for college and weekend trips."},
 {id:"demo3",name:"Desk Lamp",category:"Home",price:899,description:"A compact lamp for a focused study workspace."}
];
let items = loadItems();
let currentUser = loadUser();
let authMode = "login";
function loadItems(){try{const data=localStorage.getItem(ITEMS_KEY);return data?JSON.parse(data):starterItems.map(x=>({...x}));}catch{return starterItems.map(x=>({...x}));}}
function loadUser(){try{return JSON.parse(localStorage.getItem(USER_KEY)||"null");}catch{return null;}}
function saveItems(){localStorage.setItem(ITEMS_KEY,JSON.stringify(items));}
function safe(v){return String(v??"").replace(/[&<>""']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function money(v){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2}).format(Number(v)||0);}
function announce(msg){$("notice").textContent=msg;setTimeout(()=>{if($("notice").textContent===msg)$("notice").textContent="";},3000);}
function renderAccount(){
 $("accountArea").innerHTML=currentUser?`<span class="muted small">Hi, ${safe(currentUser.name||currentUser.email.split("@")[0])}</span> <button class="btn outline" id="logout">Logout</button>`:`<button class="btn outline" id="loginOpen">Login</button> <button class="btn" id="registerOpen">Register</button>`;
 $("loginOpen")?.addEventListener("click",()=>openAuth("login"));
 $("registerOpen")?.addEventListener("click",()=>openAuth("register"));
 $("logout")?.addEventListener("click",()=>{currentUser=null;localStorage.removeItem(USER_KEY);renderAccount();announce("You have logged out.");});
}
function render(){
 const q=$("search").value.trim().toLowerCase();
 const filtered=items.filter(x=>[x.name,x.category,x.description].some(v=>String(v||"").toLowerCase().includes(q)));
 $("itemCount").textContent=items.length;
 $("catalog").innerHTML=filtered.map((x,i)=>`<article class="item"><div class="item-top"><div class="symbol">${["▣","✦","◈","▤","◇"][i%5]}</div><span class="category">${safe(x.category)}</span></div><h3>${safe(x.name)}</h3><p class="description">${safe(x.description||"No description added.")}</p><div class="price">${money(x.price)}</div><div class="actions"><button class="action" data-edit="${safe(x.id)}">Edit</button><button class="action delete" data-delete="${safe(x.id)}">Delete</button></div></article>`).join("");
 $("empty").classList.toggle("hidden",filtered.length!==0);$("catalog").classList.toggle("hidden",filtered.length===0);
 document.querySelectorAll("[data-edit]").forEach(b=>b.addEventListener("click",()=>editItem(b.dataset.edit)));
 document.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",()=>deleteItem(b.dataset.delete)));
}
function openAuth(mode){
 authMode=mode;$("authTitle").textContent=mode==="login"?"Welcome back":"Create your account";
 $("authHelp").textContent=mode==="login"?"Login to personalize your session.":"Register a demo profile for this browser.";
 $("nameLabel").classList.toggle("hidden",mode!=="register");$("authName").required=mode==="register";
 $("authSubmit").textContent=mode==="login"?"Login":"Register";$("authForm").reset();$("authDialog").showModal();
}
$("authForm").addEventListener("submit",e=>{
 e.preventDefault();const email=$("authEmail").value.trim().toLowerCase();
 currentUser={name:authMode==="register"?$("authName").value.trim():email.split("@")[0],email};
 localStorage.setItem(USER_KEY,JSON.stringify(currentUser));$("authDialog").close();renderAccount();
 announce(authMode==="register"?"Demo profile created. This is not secure production authentication.":"Demo login successful. No server-side authentication is used.");
});
function openItem(){$("itemForm").reset();$("itemId").value="";$("itemTitle").textContent="Add item";$("itemDialog").showModal();}
function editItem(id){const x=items.find(i=>i.id===id);if(!x)return;$("itemId").value=x.id;$("itemName").value=x.name;$("itemCategory").value=x.category;$("itemPrice").value=x.price;$("itemDescription").value=x.description||"";$("itemTitle").textContent="Edit item";$("itemDialog").showModal();}
$("itemForm").addEventListener("submit",e=>{
 e.preventDefault();const id=$("itemId").value;
 const item={id:id||`${Date.now()}-${Math.random().toString(16).slice(2)}`,name:$("itemName").value.trim(),category:$("itemCategory").value.trim(),price:Number($("itemPrice").value),description:$("itemDescription").value.trim()};
 if(id){items=items.map(x=>x.id===id?item:x);announce("Item updated.");}else{items.unshift(item);announce("Item added.");}
 saveItems();$("itemDialog").close();render();
});
function deleteItem(id){const x=items.find(i=>i.id===id);if(!x||!confirm(`Delete "${x.name}"?`))return;items=items.filter(i=>i.id!==id);saveItems();render();announce("Item deleted.");}
$("addOpen").addEventListener("click",openItem);$("emptyAdd").addEventListener("click",openItem);$("search").addEventListener("input",render);
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>$(b.dataset.close).close()));
renderAccount();render();
