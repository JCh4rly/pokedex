import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Alert, Button, CircularProgress, Grid } from '@mui/material';
import SearchBox from '../../components/SearchBox';
import PokemonCard from '../../components/PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemons, setSearch } from './homeSlice';

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
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            name
            pokemon_v2_pokemons {
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
      }
    }
  }
`;

const Home = () => {
  const rowsPerpage = 12;
  const pokemons = useSelector((state: any) => state.home.pokemons);
  const search = useSelector((state: any) => state.home.search);
  const dispatch = useDispatch();
  const [getPokemons, { loading, error, data }] = useLazyQuery(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
  });
  const [page, setPage] = React.useState(0);  

  React.useEffect(() => {
    if (pokemons.length === 0) {
      getPokemons({ variables: { offset: 0, search: "" } });
    }
  }, [])

  React.useEffect(() => {
    if (data) {
      dispatch(setPokemons(page === 0 
        ? data.pokemon_v2_pokemon 
        : [...pokemons, ...data.pokemon_v2_pokemon]));
    }
  }, [data])

  React.useEffect(() => {
    if (page > 0) {
      getPokemons({ variables: { offset: rowsPerpage * page, search } });
    }
  }, [page]);

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const loadMoreItems = () => setPage((page) => (page + 1));
  const handleSearch = (value: string) => {
    dispatch(setSearch(value));
    setPage(0);
    getPokemons({ variables: { offset: 0, search: value } });
  };
  
  return <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
        <SearchBox search={search} onSearch={handleSearch} />
      </Grid>
      {!loading && data?.pokemon_v2_pokemon?.length === 0 && pokemons.length === 0 && <>
        <Grid item xs={12} md={12}>
          <Alert severity="info">No Pokemons found!!</Alert>
        </Grid>
      </>}
      {pokemons.map((item: any) =>
      <Grid item xs={6} md={3} key={item.name}>
        <PokemonCard item={item} />
      </Grid>)}
      {loading && <>
        <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
          <CircularProgress /> 
        </Grid>
      </>}
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