import { combineReducers } from 'redux'
import resultsReducer from './results'
import resultsLoaderReducer from './resultsLoader'
import sequenceReducer from './sequence'
import selectedResultReducer from './selectedResult'
import searchPageReducer from './searchPage'
import queryReducer from './query'
import editionReducer from './edition'
import editionPageReducer from './editionPage'
import editionLoaderReducer from './editionLoader'
import userReducer from './user'
import loaderReducer from './loader'
import pagesReducer from './pages'
import selectedPagesDelReducer from './selectedPagesDel'
import selectedTitleReducer from './selectedTitle'

const rootReducer = combineReducers({
    results: resultsReducer,
    resultsLoader: resultsLoaderReducer,
    sequence: sequenceReducer,
    selectedResult: selectedResultReducer,
    searchPage: searchPageReducer,
    query: queryReducer,
    edition: editionReducer,
    editionPage: editionPageReducer,
    editionLoader: editionLoaderReducer,
    user: userReducer,
    loader: loaderReducer,
    pages: pagesReducer,
    selectedPagesDel: selectedPagesDelReducer,
    selectedTitle: selectedTitleReducer
})

export default rootReducer