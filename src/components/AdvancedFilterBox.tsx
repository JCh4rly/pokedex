import { gql, useQuery } from "@apollo/client";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

const GET_TYPES = gql`
  query samplePokeAPIquery {
    pokemon_v2_type(order_by: {name: asc}) {
      name
    }
  }
`;

const AdvancedFilterBox = () => {
  const { data } = useQuery(GET_TYPES);

  return <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        Filter by Type
      </Grid>
      <Grid item xs={12} md={6}>
        Filter by Ability
      </Grid>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" sx={{ margin: 1 }}>Reset</Button>
          <Button variant="contained" sx={{ margin: 1 }}>Search</Button>
        </Box>
      </Grid>
    </Grid>
  </>
}

export default AdvancedFilterBox;
