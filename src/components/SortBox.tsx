import { Box, MenuItem, Select, Typography } from "@mui/material";

interface SortBoxProps {
  value: string,
  onChange: any,
}

const SortBox = ({ value, onChange }: SortBoxProps) => <>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography>
      Sort Pokemons by
    </Typography>
    <Select
      sx={{ marginLeft: 1 }}
      labelId="demo-select-small"
      id="demo-select-small"
      size="small"
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
    >
      <MenuItem value={'order_asc'}>Lowest Number</MenuItem>
      <MenuItem value={'order_desc'}>Highest Number</MenuItem>
      <MenuItem value={'name_asc'}>A-Z</MenuItem>
      <MenuItem value={'name_desc'}>Z-A</MenuItem>
    </Select>
  </Box>
</>

export default SortBox;
