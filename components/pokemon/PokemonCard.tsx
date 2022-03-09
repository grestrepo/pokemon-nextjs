import { FC } from 'react';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Props {
  id: number;
  img: string;
  name: string;
}

export const PokemonCard: FC<Props> = ({id, name, img}) => {
  const router = useRouter();
  const onClick = () => {
    // router.push(`/pokemon/${id}`);
    router.push(`/pokemon/${name}`);
  };
  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card hoverable clickable onClick={onClick}>
        <Card.Body css={{p: 1}}>
          <Card.Image src={img} height="100%" width="100%" />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text>#{id}</Text>
            <Text transform="capitalize">{name}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
