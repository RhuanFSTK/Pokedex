window.addEventListener('load', () => {
  const pokemonName = document.querySelector(".pokemon__name"); /* NOME */
  const pokemonNumber = document.querySelector(".pokemon__number"); /* ID */
  const pokemonImage = document.querySelector(".pokemon__image"); /* IMAGE */
  const stats = document.querySelector(".stats"); /* Status */
  const form = document.querySelector(".form"); /* FORMULARIO */
  const input = document.querySelector(".input__search"); /* INPUT DE PESQUISA */
  const buttonPrev = document.querySelector(".btn-prev"); /* BOTÃO PREV */
  const buttonNext = document.querySelector(".btn-next"); /* BOTÃO NEXT */

  let searchPokemon = 1;

  const fetchPokemon = async (pokemon) => {

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresponse.status == 200) {
      const data = await APIresponse.json();
      return data;
    }

  };

  const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "Loading...";

    const data = await fetchPokemon(pokemon);

    if (data) {
      pokemonImage.style.display = "block",
        pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      /* stats.innerHTML = data.stats */ /* Incluir status */
      pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
      input.value = "";
      searchPokemon = data.id;
      console.log(data.stats);
    } else {
      pokemonImage.style.display = "none",
        pokemonName.innerHTML = "Not Found";
      pokemonNumber.innerHTML = "";
    }

  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());


  });

  buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }

  });

  buttonNext.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);

  });

  renderPokemon(searchPokemon);



})
