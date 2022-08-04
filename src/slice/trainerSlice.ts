import { createSlice } from '@reduxjs/toolkit'
import trainers from '../resource/trainers.json'

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    trainers,
  },
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const {} = trainerSlice.actions

export default trainerSlice.reducer