import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    page: 0,
    search: "",
    pokemons: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setPokemons: (state, action) => {
      state.pokemons = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPage, setSearch, setPokemons } = homeSlice.actions

export default homeSlice.reducer