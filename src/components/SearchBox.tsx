import React from "react";
import { Box, Button, TextField } from "@mui/material";

interface SearchBoxProps {
  search: string,
  onSearch: any,
}

const SearchBox = ({ search, onSearch }: SearchBoxProps) => {
  const [value, setValue] = React.useState(search);
  const searchEmpty = !value;
  const onClear = () => {
    setValue("");
    onSearch("");
  }
  const onKeyDown = (e: any) => {
    if (e.code === "Enter") {
      onSearch(value);
    }

    if (e.code === "Escape") {
      onClear();
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
        onClick={onClear}
        sx={{ marginLeft: 1 }}
        disabled={searchEmpty}
      >
        Clear
      </Button>  
      <Button 
        variant="contained"
        onClick={() => onSearch(value)}
        sx={{ marginLeft: 1 }}
        disabled={searchEmpty}
      >
        Search
      </Button>
    </Box>
  </>
}

export default SearchBox;
