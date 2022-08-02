import { Avatar, Box, Grid } from "@mui/material";
import { getSprite } from "../util/Util";

interface EvolutionsProps {
  specy: any,
}

const Evolutions = ({ specy }: EvolutionsProps) => {
  const { pokemon_v2_evolutionchain: chain } = specy;
  const { pokemon_v2_pokemonspecies: species } = chain;

  return <>
    <Grid container spacing={1}>
      {species.map(({ name, pokemon_v2_pokemons: pokemons }: any) => <>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {<Avatar 
                src={getSprite(pokemons[0]?.pokemon_v2_pokemonsprites[0]?.sprites)} 
                sx={{ width: 130, height: 130 }}
              /> }
            {name}
          </Box>
        </Grid>
      </>)}
    </Grid>
  </>
}

export default Evolutions;
