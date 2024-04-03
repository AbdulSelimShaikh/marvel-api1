let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let showContainer2 = document.getElementById("list-container");

let showdescription=document.getElementById("show-description");
let listContainer = document.querySelector(".list");
let favListEl = document.getElementById("fav-button");
let home = document.getElementById("home");

const listE2 = document.createElement("li");

// time stamp apikey or hashval
const timestamp = '1709866604358';
const apiKey = '1287bb79320259bbf01788f7435133ed';
const hashValue = '2ccf544cb4cfaccf8f667a83cfa279d5';

// search bar
input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});
// if submit is blank show msg
function Submit(){
  if (input.value==='') {
    alert("Input cannot be blank");
  }
}
// display search bar character name
function displayWords(value) {
  input.value = value;
  removeElements();
}
// remove character name
function removeElements() {
  listContainer.innerHTML = "";
}
// after search character name show deatils
button.addEventListener(
    "click",
    (getRsult = async () => {

      const inputfield=document.getElementById("input-box").value;
      
      showContainer.innerHTML = "";
      showdescription.innerHTML="";
      showContainer2.innerHTML="";
    
      const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${inputfield}`;
  
      const response = await fetch(url);
      const jsonData = await response.json();
      jsonData.data["results"].forEach((element) => {
        // fav list adding list
        const listEl = document.createElement("li");
        listEl.innerHTML =`<div class="cardu-container">
        <div class="containeru-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <span class="button-remove" id="removeFromFav">Remove from Favorites</span>
        
        <div class="characteru-name">${element.name}</div>
        <div class="characteru-description">${element.description}</div>
        </div>`;
       

       // after submit search name show image
        showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <button class="button-add" id="addToFav">Add to Favorites</button>
        </div>`;
        // after submit search name show description
       showdescription.innerHTML=` <div class="card-container2">
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
        // add fav
        let addToFavBtnEl = document.querySelector("#addToFav");
        addToFavBtnEl.addEventListener("click", () =>{
            let clk = true;
            if(clk){
              clk=false;
              listE2.appendChild(listEl);
            }
            
        });
          
      });
    })
  );
  
  // home page 
 home.addEventListener('click', async () => {
    showContainer.innerHTML = "";
    showdescription.innerHTML="";
    showContainer2.innerHTML="";

})

// show all Favorites characterz
favListEl.addEventListener('click', async () => {
  showContainer.innerHTML = "";
  showdescription.innerHTML="";
  showContainer2.innerHTML="";
  showContainer2.appendChild(listE2);
 
  
})
// remove fav
showContainer2.addEventListener("click",function(e){
  //e.target.id
 if(e.target.tagName==="SPAN"){
    
      e.target.parentElement.remove();

  }
},false);

  
window.onload = () => {
  getRsult();
};