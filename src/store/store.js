import { configureStore } from '@reduxjs/toolkit'
import detailReducer from '../pages/detail/detailSlice'
import homeReducer from '../pages/home/homeSlice'

export default configureStore({
  reducer: {
    home: homeReducer,
    detail: detailReducer,
  },
})
