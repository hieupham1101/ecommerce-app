import { configureStore } from '@reduxjs/toolkit'
import RootReduce from '../store/slices'

const store = configureStore({
  reducer: RootReduce
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
