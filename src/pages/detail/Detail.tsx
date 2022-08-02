import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TypeTag from "../../components/TypeTag";
import { getSprite } from "../../util/Util";

const Detail = () => {
  const currentItem = useSelector((state: any) => state.detail.currentItem);
  const { order, height, weight, name, pokemon_v2_pokemonsprites_aggregate: sprites, 
    pokemon_v2_pokemontypes: types, pokemon_v2_pokemonabilities: abilities } = currentItem;

  return <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Typography variant="h3" component="div">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="img"
            height="350"
            image={getSprite(sprites)}
            sx={{ objectFit: 'fill', p: 2 }}
            alt={name}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            Order
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { order }
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            Height
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { height }
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            Weight
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { weight }
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            Type
          </Typography>
          <Box sx={{ display: 'flex' }}>
            { types.map(({ pokemon_v2_type: type }: any) => <TypeTag type={type.name} key={name + type.name} />) }
          </Box>

          <Typography gutterBottom variant="h5" component="div">
            Abilities
          </Typography>
          <Box sx={{ display: 'flex' }}>
            { abilities.map(({ pokemon_v2_ability: type }: any) => <TypeTag type={type.name} key={name + type.name} />) }
          </Box>
        </Card>
      </Grid>
    </Grid>
  </>
}

export default Detail;