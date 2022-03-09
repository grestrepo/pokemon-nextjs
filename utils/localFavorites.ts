import {PokemonFavorito} from '../interfaces';

export const toggleFavorite = (id: number, name: string) => {
  let favorites: PokemonFavorito[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  let favoritesFilter = favorites.filter(poke => poke.id === id);
  if(favoritesFilter.length !== 0){
    favorites = favorites.filter(poke => poke.id !== id);
  }else{
    favorites.push({
      id,
      name
    });
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const existInFavorite = (id: number): boolean => {
  if(typeof window === 'undefined') return false;
  let favorites: PokemonFavorito[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  let favoritesFilter = favorites.filter(poke => poke.id === id);
  return favoritesFilter.length !== 0;
};

export const pokemons = (): PokemonFavorito[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};