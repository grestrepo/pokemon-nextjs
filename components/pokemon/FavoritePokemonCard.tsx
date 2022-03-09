import {FC} from 'react';
import { useRouter } from 'next/router';
import { Card, Grid } from '@nextui-org/react';

interface Props {
  id: number
}

export const FavoritePokemonCard: FC<Props> = ({id}) => {

  const {push} = useRouter();

  const onFavoriteClicked = () => {
    push(`pokemon/${id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card hoverable clickable onClick={onFavoriteClicked} css={{ 
        padding: 10, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Card.Image 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width="100%"
          height="100%"
        />
      </Card>
    </Grid>
  );
};
