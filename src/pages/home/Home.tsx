import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Alert, Button, CircularProgress, Grid } from '@mui/material';
import SearchBox from '../../components/SearchBox';
import PokemonCard from '../../components/PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { setMoreData, setPage, setPokemons, setSortingOption, setVariables } from '../../slice/homeSlice';
import SortBox from '../../components/SortBox';
import InfiniteScroll from 'react-infinite-scroll-component';

const GET_POKEMONS = gql`
  query samplePokeAPIquery($offset: Int!, $limit: Int!, $search: String, $sorting: [pokemon_v2_pokemon_order_by!]) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_iregex: $search}, order: {_gte: 1, _lte: 779}}, order_by: $sorting) {
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
  const pokemons = useSelector((state: any) => state.home.pokemons);
  const variables = useSelector((state: any) => state.home.variables);
  const sortingOption = useSelector((state: any) => state.home.sortingOption);
  const page = useSelector((state: any) => state.home.page);
  const moreData = useSelector((state: any) => state.home.moreData);
  const { search, limit } = variables;
  const dispatch = useDispatch();
  const [getPokemons, { loading, error, data }] = useLazyQuery(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
  });
  const sortingConfig: {[key: string]: any} = {
    order_asc: { order: 'asc' },
    order_desc: { order: 'desc' },
    name_asc: { name: 'asc' },
    name_desc: { name: 'desc' },
  };
  const init = React.useRef(true);

  React.useEffect(() => {
    if (data) {
      dispatch(setPokemons(page === 0 
        ? data.pokemon_v2_pokemon 
        : [...pokemons, ...data.pokemon_v2_pokemon]));
      dispatch(setMoreData(data.pokemon_v2_pokemon.length === limit));  
    }
  }, [data])

  React.useEffect(() => {
    // Use init to detect first render.
    if ((init.current && pokemons.length === 0) || !init.current) {
      getPokemons({ variables });
    }

    // Set init to false after first use.
    return (() => {
      if (init.current) {
        init.current = false;
      }
    })
  }, [variables]);

  const loadMoreItems = () => {
    dispatch(setPage(page + 1));
    dispatch(setVariables({ offset: limit * (page + 1) }));
  };
  const handleSearch = (value: string) => {
    if (value === search) {
      return;
    }

    dispatch(setPokemons([]));
    dispatch(setPage(0));
    dispatch(setVariables({ offset: 0, search: value }));
  };
  const handleSort = (value: string) => {
    const sortingValue = sortingConfig[value] || sortingConfig['order_asc'];
    dispatch(setPokemons([]));
    dispatch(setSortingOption(value));
    dispatch(setPage(0));
    dispatch(setVariables({ offset: 0, sorting: sortingValue }));
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  
  return <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
        <SearchBox search={search} onSearch={handleSearch} />
      </Grid>
      <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
        <SortBox value={sortingOption} onChange={handleSort} />
      </Grid>

      {!loading && data?.pokemon_v2_pokemon?.length === 0 && pokemons.length === 0 && <>
        <Grid item xs={12} md={12}>
          <Alert severity="info">No Pokemons found!!</Alert>
        </Grid>
      </>}

      <Grid item xs={12} md={12}>    
        <InfiniteScroll
          dataLength={pokemons.length}
          next={loadMoreItems}
          hasMore={moreData}
          loader={null}
          scrollThreshold={0.9}
        >
          <Grid container spacing={1}>
            {pokemons.map((item: any) =>
              <Grid item xs={6} md={3} key={item.name}>
                <PokemonCard item={item} />
              </Grid>)}
          </Grid>
        </InfiniteScroll>
      </Grid>

      {loading && <>
        <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
          <CircularProgress /> 
        </Grid>
      </>}
    </Grid>
  </>;
}

export default Home;