import { combineReducers } from 'redux'
import resultsReducer from './results'
import resultsLoaderReducer from './resultsLoader'

const rootReducer = combineReducers({
    results: resultsReducer,
    resultsLoader: resultsLoaderReducer
})

export default rootReducer