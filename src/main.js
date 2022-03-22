let pokemons = [];

window.onload = () => {
    init()
    const button = document.querySelector('#inputSearch')
    button.addEventListener('input', () => searchPoke())
}

const init = async () => {
    pokemons = await fetchPokemon();
    const printPokemon = pokeSprite(pokemons);
}  

const searchPoke = () => {
    const nameInput = document.querySelector('#inputSearch');
    console.log (nameInput.value);
    const filterPoke = pokemons.filter(poke => (poke.name.toLowerCase().includes(nameInput.value.toLowerCase())))
    pokeSprite(filterPoke);
    }



const fetchPokemon = async () => {
    const pokemonData = [];
    for (let i = 1; i <= 151; i++){
        const fetchPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const fetchToJson = await fetchPoke.json();
        pokemonData.push(fetchToJson)
    }
    return pokemonData;
}

function pokeSprite(pokemons) {
    const list = document.querySelector('.list') ? document.querySelector('.list') : document.createElement('div');
    list.className = "container-cartita"
    list.innerHTML = "";   
    list.className = "list";

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');

        card.className = 'cartita'
        card.innerHTML += `
        <h1 class="name">${pokemon.name}</h1>
        <img src=${pokemon.sprites.other.dream_world.front_default} alt=${pokemon.name}/>
        <p>${pokemon.id}</p>
        <p>${pokemon.height/10} m</p>
        <p>${pokemon.weight/10} kg</p>
        <p>${pokemon.types[0].type.name}</p>
        `

        list.appendChild(card)
    });

    document.body.appendChild(list)

}


