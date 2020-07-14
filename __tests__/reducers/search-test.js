import searchPageReducer from '../../reducers/searchPage'
import queryReducer from '../../reducers/query'

describe('searchPageReducer', () => {

    it('has a default state', () => {
        expect(searchPageReducer(undefined, {type: 'inaction'})).toEqual(null)
    })

    it('adds search page', () => {
        expect(searchPageReducer(null, {type: 'START_GET_RESULTS', page: 1})).toEqual(1)
    })
})

describe('queryReducer', () => {

    it('has a default state', () => {
        expect(queryReducer(undefined, {type: 'inaction'})).toEqual('')
    })

    it('adds query', () => {
        expect(queryReducer('', {type: 'START_GET_RESULTS', query: 'search'})).toEqual('search')
    })
})