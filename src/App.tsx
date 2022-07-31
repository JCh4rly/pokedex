import React from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';

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

const App = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const getSprite = (sprites: any) => JSON.parse(sprites?.nodes[0]?.sprites)?.other?.dream_world?.front_default;

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return <>
    <ul>
      {data.pokemon_v2_pokemon.map(({ name, pokemon_v2_pokemonsprites_aggregate: sprites }: any) => <li>
        {name}
        <img src={getSprite(sprites)} alt="sprite" width={100} height={100}/>
      </li>)}
    </ul>
  </>;
}

export default App;
