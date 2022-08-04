import { createSlice } from '@reduxjs/toolkit'

export const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    currentItem: null,
  },
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentItem } = detailSlice.actions

export default detailSlice.reducer