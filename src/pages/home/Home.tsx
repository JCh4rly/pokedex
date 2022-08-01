import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TypeTag from '../../components/TypeTag';
import SearchBox from '../../components/SearchBox';

const GET_POKEMONS = gql`
  query samplePokeAPIquery($offset: Int!, $search: String) {
    pokemon_v2_pokemon(limit: 12, offset: $offset, where: {name: {_iregex: $search}}) {
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
  const [search, setSearch] = React.useState("");
  const { loading, error, data, refetch } = useQuery(GET_POKEMONS, {
    variables: { offset: 0, search }
  });
  const [pokemons, setPokemons] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const getSprite = (sprites: any) => JSON.parse(sprites?.nodes[0]?.sprites)?.other?.home?.front_default;

  React.useEffect(() => {
    if (data) {
      setPokemons([...pokemons, ...data.pokemon_v2_pokemon]);
    }
  }, [data])

  React.useEffect(() => {
    if (page > 0) {
      refetch({ offset: rowsPerpage * page, search });
    }
  }, [page]);

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const loadMoreItems = () => setPage((page) => (page + 1));
  const handleSearch = (value: string) => {
    if (value === search) {
      return
    }
    
    setSearch(value);
    setPage(0);
    setPokemons([]);
    refetch({ offset: 0, search });
  };

  return <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
        <SearchBox search={search} onSearch={handleSearch} />
      </Grid>

      {pokemons.map(({ order, name, pokemon_v2_pokemonsprites_aggregate: sprites, pokemon_v2_pokemontypes: types }: any) =>
      <Grid item xs={6} md={3} key={name}>
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
              { types.map(({ pokemon_v2_type: type }: any) => <TypeTag type={type.name} key={name + type.name} />) }
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