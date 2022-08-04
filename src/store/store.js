import { configureStore } from '@reduxjs/toolkit'
import detailReducer from '../slice/detailSlice'
import homeReducer from '../slice/homeSlice'
import trainerReducer from '../slice/trainerSlice'

export default configureStore({
  reducer: {
    home: homeReducer,
    detail: detailReducer,
    trainer: trainerReducer,
  },
})
