import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentItem } from "../slice/detailSlice";
import { getSprite } from "../util/Util";
import TypeTag from "./TypeTag";

interface PokemonCardProps {
  item: any
}

const PokemonCard = ({ item }: PokemonCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, name, pokemon_v2_pokemonsprites_aggregate: sprites, pokemon_v2_pokemontypes: types } = item;
  const onClick = () => {
    dispatch(setCurrentItem(item));
    navigate("/detail");
  }
  const spriteUrl = getSprite(sprites?.nodes[0]?.sprites);

  return <>
    <Card sx={{ padding: '5px' }}>
      {!spriteUrl && 
        <Typography 
          variant="h6" 
          sx={{ height: 140, textAlign: 'center', cursor: 'pointer' }}
          onClick={onClick}
        >
          Not Available
        </Typography>}
      {spriteUrl && <CardMedia
        component="img"
        height="140"
        image={spriteUrl}
        alt={name}
        sx={{ objectFit: 'fill', cursor: 'pointer' }}
        onClick={onClick}
      />}
      <CardContent>
        <Typography>
          N° {(order + '').padStart(3, '0')}
        </Typography>
        <Typography gutterBottom variant="h6" noWrap component="div">
          {name?.charAt(0).toUpperCase() + name?.slice(1)}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          { types.map(({ pokemon_v2_type: type }: any) => <TypeTag type={type.name} key={name + type.name} />) }
        </Box>
      </CardContent>
    </Card>
  </>
}

export default PokemonCard;
