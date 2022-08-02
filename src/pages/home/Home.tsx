import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Alert, Button, CircularProgress, Grid } from '@mui/material';
import SearchBox from '../../components/SearchBox';
import PokemonCard from '../../components/PokemonCard';

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

  React.useEffect(() => {
    if (data) {
      setPokemons(page === 0 
        ? data.pokemon_v2_pokemon 
        : [...pokemons, ...data.pokemon_v2_pokemon]);
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
    refetch({ offset: 0, search: value });
  };
  
  return <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
        <SearchBox search={search} onSearch={handleSearch} />
      </Grid>
      {!loading && pokemons.length === 0 && <>
        <Grid item xs={12} md={12}>
          <Alert severity="info">No Pokemons found!!</Alert>
        </Grid>
      </>}
      {loading && <>
        <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
          <CircularProgress /> 
        </Grid>
      </>}
      {!loading && pokemons.length > 0 && pokemons.map((item) =>
      <Grid item xs={6} md={3} key={item.name}>
        <PokemonCard item={item} />
      </Grid>)}
      <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
        {!loading && pokemons.length > 0 && <Button 
          variant="contained" 
          onClick={loadMoreItems}
        >
          Load more Pokemons
        </Button>}
      </Grid>
    </Grid>
  </>;
}

export default Home;