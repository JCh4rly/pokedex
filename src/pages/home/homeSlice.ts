import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    variables: {
      offset: 0,
      sorting: { order: 'asc' },
      search: "",
    },
    sortingOption: 'order_asc',
    page: 0,
    pokemons: [],
  },
  reducers: {
    setVariables: (state, action) => {
      state.variables = { ...state.variables, ...action.payload }
    },
    setSortingOption: (state, action) => {
      state.sortingOption = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    // setSearch: (state, action) => {
    //   state.search = action.payload
    // },
    setPokemons: (state, action) => {
      state.pokemons = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVariables, setPage, setSortingOption, setPokemons } = homeSlice.actions

export default homeSlice.reducer