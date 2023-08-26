import paintBackgroundPokeball from './paint-block-pokemon.js';

const container = document.querySelector('.pokemon-container');

const createBlockPokemon = (sortedArrayPokemons) => {
	sortedArrayPokemons.forEach((pokemon) => {
		const cardBlock = document.createElement('div');
		cardBlock.classList.add('pokeball');
		container.appendChild(cardBlock);

		const bgColorCard = paintBackgroundPokeball(pokemon.type ? pokemon.type : 'normal');
		cardBlock.classList.add(bgColorCard);

		const cardNumber = document.createElement('div');
		cardNumber.classList.add('number');
		cardBlock.appendChild(cardNumber);

		const smallNumber = document.createElement('small');
		smallNumber.textContent = `#${pokemon.number}`;
		cardNumber.appendChild(smallNumber);

		const img = document.createElement('img');
		img.alt = pokemon.name;
		img.addEventListener('load', () => {
			cardBlock.appendChild(img);
		});
		img.src = pokemon.imgURL;

		const pokemonBlock = document.createElement('div');
		pokemonBlock.classList.add('pokemon');
		cardBlock.appendChild(pokemonBlock);

		const h3 = document.createElement('h3');
		h3.classList.add('pokemon-name');
		h3.textContent = pokemon.name;
		pokemonBlock.appendChild(h3);

		const typePokemon = document.createElement('small');
		typePokemon.classList.add('pokemon-type');
		typePokemon.textContent = pokemon.type;
		pokemonBlock.appendChild(typePokemon);
	});
};

export default createBlockPokemon;
