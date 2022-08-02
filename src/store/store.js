import { configureStore } from '@reduxjs/toolkit'
import detailReducer from '../pages/detail/detailSlice'

export default configureStore({
  reducer: {
    detail: detailReducer,
  },
})
