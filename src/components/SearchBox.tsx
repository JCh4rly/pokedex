import React from "react";
import { Box, Button, TextField } from "@mui/material";

interface SearchBoxProps {
  search: string,
  onSearch: any,
}

const SearchBox = ({ search, onSearch }: SearchBoxProps) => {
  const [value, setValue] = React.useState(search);
  const onKeyDown = (e: any) => {
    if (e.code === "Enter") {
      onSearch(value);
    }
  }
  const onChange = (value: string) => {
    if (value === " ") {
      return;
    }

    setValue(value);
  }

  return <>
    <Box sx={{ display: 'flex' }}>
      <TextField 
        value={value}
        onKeyDown={onKeyDown} 
        onChange={(e) => onChange(e.target.value)}
        sx={{ flexGrow: 1 }} />
      <Button 
        variant="contained"
        onClick={() => onSearch(value)}
        disabled={!value || value.length <= 3}
        sx={{ marginLeft: 1 }}
      >
        Search
      </Button>
    </Box>
  </>
}

export default SearchBox;
