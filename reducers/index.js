import { combineReducers } from 'redux'
import resultsReducer from './results'
import resultsLoaderReducer from './resultsLoader'
import sequenceReducer from './sequence'
import sequenceLoaderReducer from './sequenceLoader'
import selectedResultReducer from './selectedResult'
import searchPageReducer from './searchPage'
import queryReducer from './query'
import editionReducer from './edition'
import editionPageReducer from './editionPage'
import editionLoaderReducer from './editionLoader'
import userReducer from './user'
import loaderReducer from './loader'

const rootReducer = combineReducers({
    results: resultsReducer,
    resultsLoader: resultsLoaderReducer,
    sequence: sequenceReducer,
    sequenceLoader: sequenceLoaderReducer,
    selectedResult: selectedResultReducer,
    searchPage: searchPageReducer,
    query: queryReducer,
    edition: editionReducer,
    editionPage: editionPageReducer,
    editionLoader: editionLoaderReducer,
    user: userReducer,
    loader: loaderReducer
})

export default rootReducer