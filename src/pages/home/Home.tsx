import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TypeTag from '../../components/TypeTag';

const GET_POKEMONS = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon(limit: 40) {
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
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const getSprite = (sprites: any) => JSON.parse(sprites?.nodes[0]?.sprites)?.other?.dream_world?.front_default;

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return <>
    <Grid container spacing={1}>
      {data.pokemon_v2_pokemon.map(({ order, name, pokemon_v2_pokemonsprites_aggregate: sprites, pokemon_v2_pokemontypes: types }: any) =>
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
    </Grid>
  </>;
}

export default Home;