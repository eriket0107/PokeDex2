const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImg = document.querySelector('.pokemon__image');
const form = document.querySelector('.form')
const search = document.querySelector('.input__search')
const nextBtn = document.querySelector('.btn-next')
const prevBtn = document.querySelector('.btn-prev')

let searchPokemon = 1;

const axiosGetPokemon = async (pokemon) => {
    try {
        const APIresponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)

        if (APIresponse.status === 200) {
            const res = APIresponse.data
            return res
        }
    } catch {
        console.error(Error)
    }

}
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    const pokemonData = await axiosGetPokemon(pokemon);
    if (pokemonData) {
        pokemonName.innerHTML = pokemonData.name
        pokemonNumber.innerHTML = pokemonData.id
        pokemonImg.style.display = 'block'
        pokemonImg.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = pokemonData.id
        search.value = ''
    } else {
        pokemonImg.style.display = 'none'
        pokemonName.innerHTML = "Not founds :("
        pokemonNumber.innerHTML = '';
    }


}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(search.value.toLowerCase())

})

nextBtn.addEventListener('click', () => {
    searchPokemon +=1;
    console.log(searchPokemon)
    renderPokemon(searchPokemon)
})
prevBtn.addEventListener('click', () => {
    searchPokemon-=1;
    if (searchPokemon < 1) {
        searchPokemon = 1;
    }
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)