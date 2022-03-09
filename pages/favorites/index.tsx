import { Card, Grid } from '@nextui-org/react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts/Layout';
import { PokemonsFavoritos } from '../../components/pokemon/PokemonsFavoritos';
import { NoFavorites } from '../../components/ui';
import { pokemons } from '../../utils';

const FavoritesPage: NextPage = () => {
  const [favoritesPokemon, setFavoritesPokemon] = useState<number[]>([]);
  useEffect(() => {
    setFavoritesPokemon(pokemons());
  }, []);
  
  return (
    <Layout title="Pokemon - Favorito">
      {
        favoritesPokemon.length === 0 ? 
          <NoFavorites /> : 
          <PokemonsFavoritos pokemons={favoritesPokemon} />
      }            
    </Layout>
  );
};

export default FavoritesPage;
