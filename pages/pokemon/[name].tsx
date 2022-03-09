
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';

import { Layout } from '../../components/layouts/Layout';
import { Pokemon, PokemonListResponse, SmallPokemon, Sprites } from '../../interfaces';

import { toggleFavorite, existInFavorite } from '../../utils';

interface Props {
  pokemon: {
    id: number;
    name: string;
    sprites: Sprites
  };
}

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

  const [isInFavorites, setisInFavorites] = useState(existInFavorite(pokemon.id));
 
  const onToggleFavorite = () => {
    toggleFavorite(pokemon.id, pokemon.name);
    setisInFavorites(!isInFavorites);

    if(!isInFavorites){
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        }
      });
    }
  };
  
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{
        marginTop: '5px'
      }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{
            padding: '30px'
          }}>
            <Card.Body>
              <Card.Image 
                src={pokemon.sprites.other?.dream_world.front_default || ''} 
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>

          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '30px'
            }}>
              <Text h1 transform="capitalize">{pokemon.name}</Text>
              <Button color="gradient" ghost={!isInFavorites} onClick={onToggleFavorite}>
                {isInFavorites ? 'Sacar de favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container display="flex" direction="row">
                <Image 
                  src={pokemon.sprites.front_default} 
                  alt="front_default"
                  height={100} 
                  width={100}
                />
                <Image 
                  src={pokemon.sprites.back_default} 
                  alt="back_default"
                  height={100} 
                  width={100}
                />
                <Image 
                  src={pokemon.sprites.front_shiny} 
                  alt="front_shiny"
                  height={100} 
                  width={100}
                />
                <Image 
                  src={pokemon.sprites.back_shiny} 
                  alt="back_shiny"
                  height={100} 
                  width={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const resp = await pokeApi.get<PokemonListResponse>('/pokemon', {
    params: {
      limit: 151
    }
  });
  const pokemons: SmallPokemon[] = resp.data.results.map((poke, index) => { 
    const pokemon: SmallPokemon = {
      id: index+1,
      name: poke.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`,
      url: poke.url
    };
    return pokemon;
  });

  const paths = pokemons.map((value) => (
    {
      params: {
        name: value.name
      }
    }
  ));
  
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({params}: any) => {
  const {name} = params;
  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
  const {sprites, id} = data;

  return {
    props: {
      pokemon: {
        id: Number(data.id),
        name,
        sprites
      }
    }
  };
};

export default PokemonByNamePage;