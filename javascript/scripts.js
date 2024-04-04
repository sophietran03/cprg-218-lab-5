/**
 * Create one card from item data.
 */
function createCardElement(item) {
    return `
        <li class="card">
            <img src=${item.image} alt="">
            <div class="card-content">
                <p class="subheader">
                    ${item.subtitle}
                </p>
                <h3 class="header">
                    ${item.title}
                </h3>
            </div>
        </li>
    `;
}
  
/**
* Create multiple cards from array of item data.
*/
function createCardElements(data) {
return data.map(createCardElement).join("");
}
  
/**
* Fetch list of pokemon names and urls.
*/
async function fetch150PokemonList() {
    try {
        // Get a list of Pokemon numbered 0-150
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150");
        const data = await response.json();
        return data.results;
        //Error handling
    }   catch (error) {
        console.log(error);
    }
}
  
/**
* Fetch details of a pokemon.
*/
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
        //Error handling
    }   catch (error) {
        console.log(error);
    }
}
  
/**
* Fetch details of all 150 pokemon.
*/
async function fetch150PokemonDetails() {
    const detailsList = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const data = await fetchPokemonDetails(url);
        if (data) {
            detailsList.push(data);
        }
    }
    return detailsList;
}

/**
* Option 1
*/
function renderOption1Results(data) {
    const card = createCardElement({
        title: data.name,
        subtitle: data.types.map((type) => type.type.name).join(", "),
        image: data.sprites.other["official-artwork"].front_default,
    });
    document.getElementById("option-1-results").innerHTML = card;
}
  
async function option1DropdownClickHandler(event) {
    const select = document.getElementById("dropdown");
    const url = select.options[select.selectedIndex].value;
    const data = await fetchPokemonDetails(url);
    if (data) {
        renderOption1Results(data);
    }
}
  
/**
* Attach an event listener to the submit button for the Option 1 dropdown list.
*/
const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", option1DropdownClickHandler);
  
/**
* Populate the dropdown list with pokemon names and their endpoint urls.
*/
async function renderOption1Dropdown() {
    const select = document.getElementById("dropdown");
    const list = await fetch150PokemonList();
    if (list) {
        list.forEach((item) => {
            const option = document.createElement("option");
            option.textContent = item.name;
            option.value = item.url;
            select.appendChild(option);
        });
    }
}

renderOption1Dropdown();