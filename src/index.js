const container = document.querySelector('.pokemon-container');

let nextCards = 0;
let namesPokemonsArray = [];
let allPokemonsArray = [];
let sortedArray = [];

// Ленивая подгрузка карточек
const infinitePokemonObserver = new IntersectionObserver(
	([entry], observer) => {
		if (entry.isIntersecting) {
			observer.unobserve(entry.target);
			getNamesPokemons((nextCards += 1));
		}
	},
	{ threshold: 0.5 }
);

// Получаю список имен покемонов
const getNamesPokemons = async (offset = 0) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=3&offset=${offset}`);
		const data = await response.json();
		const result = await data.results;

		result.forEach((item) => {
			getCurrentPokemonInfo(item.name);
		});
	} catch (error) {
		console.error(error);
	}
};

// Полученные имена передаю чтобы получить информацию о конкретном покемоне
const getCurrentPokemonInfo = async (pokemonName) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
		if (!response.ok) {
			throw new Error('ошибка при получении инфо о конкретном покемоне');
		}
		let data = await response.json();

		allPokemonsArray.push({
			number: data.id,
			name: data.name,
			imgURL: data.sprites.other.dream_world.front_default,
			type: data.types[0].type.name,
		});
		let sort = await filtredAndSortArray(allPokemonsArray);
		await createBlockPokemon(sort);
	} catch (error) {
		console.error(error);
	}
};

// Массив с объектами приходит не отсортированным и с дубликатами, тут я от них избаляюсь
const filtredAndSortArray = async (array) => {
	let filteredArrayUpd = array.filter(
		(obj, index, self) => index === self.findIndex((o) => o.number === obj.number)
	);
	let sortedArrayUpd = filteredArrayUpd.sort((a, b) => a.number - b.number);
	return sortedArrayUpd;
};

// Отрисовываю карточки с покемонами
const createBlockPokemon = async (sortedArrayPokemons) => {
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

	const lastCard = document.querySelector('.pokeball:last-child');

	if (lastCard) {
		infinitePokemonObserver.observe(lastCard);
	}
};

// Крашу фон карточки, взависимости от типа покемона
const paintBackgroundPokeball = (type) => {
	let bgColorCard = null;
	switch (type) {
		case 'rock':
			bgColorCard = 'rock';
			break;
		case 'ghost':
			bgColorCard = 'ghost';
			break;
		case 'electric':
			bgColorCard = 'electric';
			break;
		case 'bug':
			bgColorCard = 'bug';
			break;
		case 'poison':
			bgColorCard = 'poison';
			break;
		case 'normal':
			bgColorCard = 'normal';
			break;
		case 'fairy':
			bgColorCard = 'fairy';
			break;
		case 'fire':
			bgColorCard = 'fire';
			break;
		case 'grass':
			bgColorCard = 'grass';
			break;
		case 'water':
			bgColorCard = 'water';
			break;

		default:
			bgColorCard = '';
			break;
	}
	return bgColorCard;
};

getNamesPokemons();
