const colors = {
	rock: 'rock',
	ghost: 'ghost',
	electric: 'electric',
	bug: 'bug',
	poison: 'poison',
	normal: 'normal',
	fairy: 'fairy',
	fire: 'fire',
	grass: 'grass',
	water: 'water',
};

export const getPaintBackgroundPokeball = (type) => {
  return colors[type] || ''
}
