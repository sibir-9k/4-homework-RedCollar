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

export default paintBackgroundPokeball;
