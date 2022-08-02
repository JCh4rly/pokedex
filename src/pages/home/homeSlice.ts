import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    sorting: 'order_asc',
    page: 0,
    search: "",
    pokemons: [],
  },
  reducers: {
    setSorting: (state, action) => {
      state.sorting = action.payload
    },
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
export const { setSorting, setPage, setSearch, setPokemons } = homeSlice.actions

export default homeSlice.reducer