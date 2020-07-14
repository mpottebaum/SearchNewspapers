import sequenceReducer from '../../reducers/sequence'
import loaderReducer from '../../reducers/loader'
import selectedTitleReducer from '../../reducers/selectedTitle'

describe('sequenceReducer', () => {

    it('has a default state', () => {
        expect(sequenceReducer(undefined, {type: 'inaction'})).toEqual({})
    })

    it('adds sequence', () => {
        expect(sequenceReducer({}, {type: 'ADD_SEQUENCE', sequence: {id: 1}})).toEqual({id: 1})
    })
})

describe('loaderReducer', () => {

    it('has a default state', () => {
        expect(loaderReducer(undefined, {type: 'inaction'})).toEqual(false)
    })

    it('only true when loading', () => {
        expect(loaderReducer(false, {type: 'START_ADD_USER'})).toEqual(true)
        expect(loaderReducer(false, {type: 'ADD_USER'})).toEqual(false)
        expect(loaderReducer(false, {type: 'START_ADD_PAGES'})).toEqual(true)
        expect(loaderReducer(false, {type: 'ADD_PAGES'})).toEqual(false)
        expect(loaderReducer(false, {type: 'START_GET_RESULTS'})).toEqual(true)
        expect(loaderReducer(false, {type: 'ADD_RESULTS'})).toEqual(false)
        expect(loaderReducer(false, {type: 'START_ADD_SEQUENCE'})).toEqual(true)
        expect(loaderReducer(false, {type: 'ADD_SEQUENCE'})).toEqual(false)
        expect(loaderReducer(false, {type: 'START_ADD_EDITION_PAGE'})).toEqual(true)
        expect(loaderReducer(false, {type: 'ADD_EDITION_PAGE'})).toEqual(false)
        expect(loaderReducer(false, {type: 'START_ADD_TITLE'})).toEqual(true)
        expect(loaderReducer(false, {type: 'ADD_TITLE'})).toEqual(false)
    })
})

describe('selectedTitleReducer', () => {

    it('has a default state', () => {
        expect(selectedTitleReducer(undefined, {type: 'inaction'})).toEqual(null)
    })

    it('selects and deselects title', () => {
        const selectState = selectedTitleReducer(null, {type: 'ADD_TITLE', title: {id: 1}})
        expect(selectState).toEqual({id: 1})
        expect(selectedTitleReducer(selectState, {type: 'REMOVE_TITLE'})).toEqual(null)
    })
})