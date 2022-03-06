import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { pokeApi } from '../../api';

import { Layout } from '../../components/layouts/Layout';
import { Pokemon, Sprites } from '../../interfaces';

interface Props {
  pokemon: {
    name: string;
    sprites: Sprites
  };
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  
  return (
    <Layout>
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
              <Button color="gradient" ghost>
                Guardar en favoritos
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

  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);
  const paths = pokemon151.map((value) => (
    {
      params: {
        id: value
      }
    }
  ));
  
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id} = params as { id: string };
  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  const {name, sprites} = data;
  return {
    props: {
      pokemon: {
        name,
        sprites
      }
    }
  };
};

export default PokemonPage;