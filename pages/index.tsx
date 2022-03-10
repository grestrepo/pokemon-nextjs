import { NextPage, GetStaticProps } from 'next';
import { Grid, Image } from '@nextui-org/react';

import {Layout} from '../components/layouts/Layout';
import { PokemonCard } from '../components/pokemon/PokemonCard';

import {pokeApi} from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {
  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {
          pokemons.map(({id, name, img}) => (
            <PokemonCard id={id} name={name} img={img} key={id} />
          ))
        }
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const resp = await pokeApi.get<PokemonListResponse>('/pokemon', {
    params: {
      limit: 151
    }
  });
  // console.log(resp.data);
  const pokemons: SmallPokemon[] = resp.data.results.map((poke, index) => { 
    const pokemon: SmallPokemon = {
      id: index+1,
      name: poke.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`,
      url: poke.url
    };
    return pokemon;
  });
  return {
    props: {
      pokemons
    }
  };
};

export default HomePage;
