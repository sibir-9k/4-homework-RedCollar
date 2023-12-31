import { createBlockPokemon } from './create-block-pokemon.js';
let countCards = null;
let allPokemonsArray = [];

// Получаю список имен покемонов
const getNamesPokemons = async () => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
		const data = await response.json();
		return await data.results;
	} catch (error) {
		console.error(error);
	}
};

// Полученные имена передаю чтобы получить информацию о конкретном покемоне
const getCurrentPokemonInfo = async (indexPokemons) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${indexPokemons}/`);
		if (!response.ok) {
			throw new Error('ошибка при получении инфо о конкретном покемоне');
		}
		const responseData = await response.json();

		return {
			number: responseData.id,
			name: responseData.name,
			imgURL: responseData.sprites.other.dream_world.front_default,
			type: responseData.types[0].type.name,
		};
	} catch (error) {
		console.error(error);
	}
};

async function loadCards() {
	const dataNamesPokemonsArray = await getNamesPokemons();

	const maxCards = 3;

	if (countCards <= maxCards) {
		const pokemonsPromises = dataNamesPokemonsArray.slice(0, maxCards).map((dataPokemon, index) => {
			const currentCount = index + 1;
			return getCurrentPokemonInfo(currentCount);
		});

		const allPokemonsArray = await Promise.all(pokemonsPromises);
		createBlockPokemon(allPokemonsArray);
	}

	if (countCards > maxCards) {
		const nextPokemonsPromises = dataNamesPokemonsArray
			.slice(0, countCards)
			.map((dataPokemon, index) => {
				const currentCount = index + maxCards + 1;
				return getCurrentPokemonInfo(currentCount);
			});

		const allPokemonsArray = await Promise.all(nextPokemonsPromises);

		createBlockPokemon(allPokemonsArray);
	}

	observer.observe(document.querySelector('.footer'));
}

loadCards();

// Создаем Intersection Observer
const options = {
	root: null,
	rootMargin: ' 0px 0px 75px 0px',
	threshold: 0.5,
};

const observer = new IntersectionObserver((entries, observer) => {
	console.log(entries);
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// Если элемент находится в зоне видимости (проходит порог видимости)
			const index = allPokemonsArray.length; // индекс следующего покемона для загрузки
			const pokemonPromise = getCurrentPokemonInfo(index + 1); // получаем информацию о покемоне с указанным индексом
			pokemonPromise.then((pokemon) => {
				allPokemonsArray.push(pokemon); // добавляем покемона в массив
				createBlockPokemon([pokemon]); // отрисовываем его карточку
			});
			// .then(() => {
			// 	observer.unobserve(entry.target); // останавливаем наблюдение за элементом
			// });                      // без него работает, а с ним нет
		}
	});
}, options);

// observer.observe(document.querySelector('.footer'));
