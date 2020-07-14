import resultsReducer from '../../reducers/results'
import resultsLoaderReducer from '../../reducers/resultsLoader'
import selectedResultReducer from '../../reducers/selectedResult'


describe('resultsReducer', () => {

    it('has a default state', () => {
        expect(resultsReducer(undefined, {type: 'inaction'})).toEqual([])
    })

    it('adds results', () => {
        expect(resultsReducer([], {type: 'ADD_RESULTS', results: [{id: 1}, {id: 2}]})).toEqual([{id: 1}, {id: 2}])
    })
})

describe('resultsLoaderReducer', () => {

    it('has a default state', () => {
        expect(resultsLoaderReducer(undefined, {type: 'inaction'})).toEqual(false)
    })

    it('only returns true for first page', () => {
        expect(resultsLoaderReducer(false, {type: 'START_GET_RESULTS', page: 1})).toEqual(true)
        expect(resultsLoaderReducer(false, {type: 'START_GET_RESULTS', page: 2})).toEqual(false)
    })
})

describe('selectedResultReducer', () => {

    it('has a default state', () => {
        expect(selectedResultReducer(undefined, {type: 'inaction'})).toEqual(null)
    })

    it('selects result', () => {
        expect(selectedResultReducer(null, {type: 'START_ADD_SEQUENCE', result: {id: 1}})).toEqual({id: 1})
        expect(selectedResultReducer(undefined, {type: 'ADD_RESULT', result: {id: 1}})).toEqual({id: 1})
    })
})