import { Alert, Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Evolutions from "../../components/Evolutions";
import TrainersPerPokemon from "../../components/TrainersPerPokemon";
import TypeTag from "../../components/TypeTag";
import { getHomeSprite } from "../../util/Util";

const Detail = () => {
  const navigate = useNavigate();
  const currentItem = useSelector((state: any) => state.detail.currentItem);

  if (!currentItem) {
    return <>
      <Box sx={{ display: 'flex' }}>
        <Alert severity="error" sx={{ flexGrow: 1, marginRight: 1 }}>
          No Pokemon selected!! Please go back and pick your favorite one
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Back to Pokedex
        </Button>
      </Box>
    </>
  }

  const { order, height, weight, name, pokemon_v2_pokemonsprites_aggregate: sprites, 
    pokemon_v2_pokemontypes: types, pokemon_v2_pokemonabilities: abilities,
    pokemon_v2_pokemonspecy: specy} = currentItem;
  const spriteUrl = getHomeSprite(sprites?.nodes[0]?.sprites);

  return <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="div">
            {name}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Back to Pokedex
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="img"
            height="350"
            image={spriteUrl}
            sx={{ objectFit: 'contain', p: 2 }}
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
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            Evolutions
          </Typography>
          <Evolutions specy={specy} />
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            Trainers
          </Typography>
          <TrainersPerPokemon order={Number(order)} />
        </Card>
      </Grid>
    </Grid>
  </>
}

export default Detail;