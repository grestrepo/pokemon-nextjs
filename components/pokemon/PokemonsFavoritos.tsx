import { FC } from 'react';
import { Grid } from '@nextui-org/react';
import { FavoritePokemonCard } from './FavoritePokemonCard';

import { PokemonFavorito } from '../../interfaces';

interface Props {
  pokemons: PokemonFavorito[]
}

export const PokemonsFavoritos: FC<Props> = ({pokemons}) => {
  return (
    <Grid.Container  gap={2} direction="row" justify="flex-start">
      {
        pokemons.map(({id, name}) => (
          <FavoritePokemonCard id={id} name={name} key={id} />
        ))
      }
    </Grid.Container>
  );
};
