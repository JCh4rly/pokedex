import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    variables: {
      offset: 0,
      limit: 12,
      sorting: { order: 'asc' },
      search: "",
    },
    sortingOption: 'order_asc',
    page: 0,
    pokemons: [],
    moreData: false,
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
    setPokemons: (state, action) => {
      state.pokemons = action.payload
    },
    setMoreData: (state, action) => {
      state.moreData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setVariables, setPage, setSortingOption, setPokemons, setMoreData } = homeSlice.actions

export default homeSlice.reducer