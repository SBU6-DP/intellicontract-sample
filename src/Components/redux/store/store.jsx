import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../features/criteriaSlice'

const loadFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('criteriaFilter')
      if (data) {
        return { criteriaFilter: JSON.parse(data) }
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e)
    }
    return { criteriaFilter: [] }
  }


  const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('criteriaFilter', JSON.stringify(state.criteria.criteriaFilter))
    } catch (e) {
      console.warn('Could not save to localStorage:', e)
    }
  }


  const preloadedState = {
    criteria: loadFromLocalStorage(),
  }


const store = configureStore({
    reducer: {
        criteria:filterReducer,
    },
    preloadedState,
  })


  store.subscribe(() => {
    saveToLocalStorage(store.getState())
  })

export default store