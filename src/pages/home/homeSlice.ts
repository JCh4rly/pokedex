import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    search: "",
    pokemons: [],
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setPokemons: (state, action) => {
      state.pokemons = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearch, setPokemons } = homeSlice.actions

export default homeSlice.reducer