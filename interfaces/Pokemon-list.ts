export interface PokemonListResponse {
  count:    number;
  next:     string;
  previous: null | string;
  results:  SmallPokemon[];
}

export interface SmallPokemon {
  id: number;
  name: string;
  img: string;
  url:  string;
}
