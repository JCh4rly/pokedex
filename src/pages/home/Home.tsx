import React from 'react';
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TypeTag from '../../components/TypeTag';

const GET_POKEMONS = gql`
  query samplePokeAPIquery($offset: Int!) {
    pokemon_v2_pokemon(limit: 12, offset: $offset) {
      name
      height
      weight
      order
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites_aggregate {
        nodes {
          sprites
        }
      }
    }
  }
`;

const Home = () => {
  const rowsPerpage = 12;
  const { loading, error, data, refetch } = useQuery(GET_POKEMONS, {
    variables: { offset: 0 }
  });
  const [pokemons, setPokemons] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const getSprite = (sprites: any) => JSON.parse(sprites?.nodes[0]?.sprites)?.other?.dream_world?.front_default;

  React.useEffect(() => {
    if (data) {
      setPokemons([...pokemons, ...data.pokemon_v2_pokemon]);
    }
  }, [data])

  React.useEffect(() => {
    if (page > 0) {
      refetch({ offset: rowsPerpage * page });
    }
  }, [page]);

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const loadMoreItems = () => setPage((page) => (page + 1));

  return <>
    <Grid container spacing={1}>
      {pokemons.map(({ order, name, pokemon_v2_pokemonsprites_aggregate: sprites, pokemon_v2_pokemontypes: types }: any) =>
      <Grid item xs={6} md={3}>
        <Card sx={{ padding: '5px' }}>
          <CardMedia
            component="img"
            height="140"
            image={getSprite(sprites)}
            alt={name}
            sx={{ objectFit: 'fill' }}
          />
          <CardContent>
            <Typography>
              N° {(order + '').padStart(3, '0')}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {name?.charAt(0).toUpperCase() + name?.slice(1)}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              { types.map(({ pokemon_v2_type: type }: any) => <TypeTag type={type.name} />) }
            </Box>
          </CardContent>
        </Card>
      </Grid>)}
      <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
        <Button 
          variant="contained" 
          onClick={loadMoreItems}
          disabled={loading}
        >
          Load more Pokemons
        </Button>
      </Grid>
    </Grid>
  </>;
}

export default Home;