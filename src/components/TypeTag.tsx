import { Box } from "@mui/material";

interface TypeTagProps {
  type: string
}

const defaultColor = 'aliceblue';
const colors: { [key:string]: string } = {
  'grass': 'limegreen',
  'poison': 'plum',
  'fire': 'orange',
  'electric': 'yellow',
  'flying': 'lightseagreen',
};

const TypeTag = ({ type }: TypeTagProps) => <>
  <Box sx={{
    color: 'darkslategray',
    backgroundColor: colors[type] || defaultColor,
    padding: '2px',
    margin: '1px',
    borderRadius: '4px',
   }}>
    {type}
  </Box>
</>

export default TypeTag;