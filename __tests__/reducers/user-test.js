import pagesReducer from '../../reducers/pages'
import selectedPagesDelReducer from '../../reducers/selectedPagesDel'
import userReducer from '../../reducers/user'

describe('userReducer', () => {

    it('has a default state', () => {
        expect(userReducer(undefined, {type: 'inaction'})).toEqual(null)
    })

    it('adds and deletes user', () => {
        const addState = userReducer(undefined, {type: 'ADD_USER', user: {id: 1}})
        expect(addState).toEqual({id: 1})
        expect(userReducer(addState, {type: 'DELETE_USER'})).toEqual(null)
    })
})


describe('pagesReducer', () => {

    it('has a default state', () => {
        expect(pagesReducer(undefined, {type: 'inaction'})).toEqual([])
    })

    it('adds all pages and new page', () => {
        const allPagesState = pagesReducer([], {type: 'ADD_PAGES', pages: [{id: 1}, {id: 2}, {id: 3}]})
        expect(allPagesState).toEqual([{id: 1}, {id: 2}, {id: 3}])
        expect(pagesReducer(allPagesState, {type: 'ADD_PAGE', page: {id: 4}})).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
    })

    it('deletes page', () => {
        const allPagesState = pagesReducer([], {type: 'ADD_PAGES', pages: [{id: 1}, {id: 2}, {id: 3}]})
        expect(pagesReducer(allPagesState, {type: 'DELETE_PAGE', id: 1}).length).toEqual(2)
    })

    it('renames page', () => {
        const allPagesState = pagesReducer([], {type: 'ADD_PAGES', pages: [{id: 1, name: 'joe'}, {id: 2, name: 'george'}, {id: 3, name: 'jack'}]})
        const renamedState = pagesReducer(allPagesState, {type: 'RENAME_PAGE', id: 1, name: 'jessica'})
        const renamedPage = renamedState.find(page => page.id === 1)
        expect(renamedPage.name).toEqual('jessica')
    })
})

describe('selectedPagesDelReducer', () => {

    it('has a default state', () => {
        expect(selectedPagesDelReducer(undefined, {type: 'inaction'})).toEqual([])
    })

    it('selects and deselects page', () => {
        const selectState = selectedPagesDelReducer([1], {type: 'SELECT_PAGE', id: 2})
        expect(selectState).toEqual([1, 2])
        expect(selectedPagesDelReducer(selectState, {type: 'DESELECT_PAGE', id: 1})).toEqual([2])
    })

    it('clears selected pages', () => {
        const selectState = selectedPagesDelReducer([1], {type: 'SELECT_PAGE', id: 2})
        expect(selectedPagesDelReducer(selectState, {type: 'CLEAR_SELECTED_PAGES_DEL'})).toEqual([])
    })
})
