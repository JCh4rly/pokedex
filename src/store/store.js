import { configureStore } from '@reduxjs/toolkit'
import detailReducer from '../pages/detail/detailSlice'
import homeReducer from '../pages/home/homeSlice'
import trainerReducer from '../slice/trainerSlice'

export default configureStore({
  reducer: {
    home: homeReducer,
    detail: detailReducer,
    trainer: trainerReducer,
  },
})
