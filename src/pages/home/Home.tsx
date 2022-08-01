import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

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
      {data.pokemon_v2_pokemon.map(({ name, pokemon_v2_pokemonsprites_aggregate: sprites }: any) =>
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
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>)}
    </Grid>
  </>;
}

export default Home;