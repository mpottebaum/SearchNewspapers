import { combineReducers } from 'redux'
import resultsReducer from './results'
import resultsLoaderReducer from './resultsLoader'
import sequenceReducer from './sequence'
import sequenceLoaderReducer from './sequenceLoader'
import selectedResultReducer from './selectedResult'

const rootReducer = combineReducers({
    results: resultsReducer,
    resultsLoader: resultsLoaderReducer,
    sequence: sequenceReducer,
    sequenceLoader: sequenceLoaderReducer,
    selectedResult: selectedResultReducer

})

export default rootReducer