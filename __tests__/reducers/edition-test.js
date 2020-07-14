import editionReducer from '../../reducers/edition'
import editionPageReducer from '../../reducers/editionPage'
import editionLoaderReducer from '../../reducers/editionLoader'

describe('editionReducer', () => {

    it('has a default state', () => {
        expect(editionReducer(undefined, {type: 'inaction'})).toEqual(null)
    })

    it('adds edition', () => {
        expect(editionReducer(null, {type: 'ADD_EDITION', edition: {id: 1}})).toEqual({id: 1})
    })

    it('removes edition', () => {
        expect(editionReducer({id: 1}, {type: 'START_ADD_SEQUENCE'})).toEqual(null)
        expect(editionReducer({id: 1}, {type: 'REMOVE_EDITION'})).toEqual(null)
    })
})

describe('editionPageReducer', () => {

    it('has a default state', () => {
        expect(editionPageReducer(undefined, {type: 'inaction'})).toEqual(null)
    })

    it('updates edition page', () => {
        expect(editionPageReducer(null, {type: 'START_ADD_EDITION', page: 1})).toEqual(1)
        expect(editionPageReducer(1, {type: 'ADD_EDITION_PAGE', page: 2})).toEqual(2)
    })
})

describe('editionLoaderReducer', () => {

    it('has a default state', () => {
        expect(editionLoaderReducer(undefined, {type: 'inaction'})).toEqual(false)
    })

    it('is only true when adding edition', () => {
        const startState = editionLoaderReducer(false, {type: 'START_ADD_EDITION'})
        expect(startState).toEqual(true)
        expect(editionLoaderReducer(startState, {type: 'ADD_EDITION'})).toEqual(false)
    })
})