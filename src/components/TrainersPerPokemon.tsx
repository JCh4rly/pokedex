import React from "react";
import { Alert, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";

interface TrainersPerPokemonProps {
  order: number  
}

const TrainersPerPokemon = ({ order }: TrainersPerPokemonProps) => {
  const trainers = useSelector((state: any) => state.trainer.trainers)
  const trainersPerPokemon = trainers.filter(({ team, box }: any) => team.includes(order) || box.includes(order));

  return <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {(!trainersPerPokemon || trainersPerPokemon.length === 0) && <>
        <Alert severity="info">No trainers found</Alert>
      </>}
      {trainersPerPokemon.map(({ name }: any) => <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={name} src={name} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>)}
    </List>
  </>
}

export default TrainersPerPokemon;
