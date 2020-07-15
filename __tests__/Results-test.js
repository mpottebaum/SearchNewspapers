import 'react-native'
import React from 'react'
import { MemoryRouter } from 'react-router-native'
import { Provider } from 'react-redux'
import Results from '../components/results/Results'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import { mockResults } from '../__mocks__/results'


const mockStore = configureStore()

describe('Results snapshot test', () => {

    
    it('renders load spinner correctly', () => {
        const store = mockStore({
            results: [],
            loader: true,
            resultsLoader: true,
            searchPage: 1,
            query: '',
            pages: []
        })
        const tree = renderer.create(<Provider store={store}><MemoryRouter><Results /></MemoryRouter></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders results correctly', () => {
        const store = mockStore({
            results: mockResults,
            loader: false,
            resultsLoader: false,
            searchPage: 1,
            query: '',
            pages: []
        })
        const tree = renderer.create(<Provider store={store}><MemoryRouter><Results /></MemoryRouter></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})

describe('Results page numbers tests', () => {
    let store, tree, results


    beforeEach(() => {
        store = mockStore({
            results: mockResults,
            loader: false,
            resultsLoader: false,
            searchPage: 1,
            query: '',
            pages: []
        })
        tree = renderer.create(<Provider store={store}><MemoryRouter><Results /></MemoryRouter></Provider>).root;
        results = tree.children[0].children[0].children[0].children[0]._fiber.stateNode
    })
    
    // 298728
    it('calculates correct number of pages', () => {
        expect(results.numPages()).toEqual(298728)
    })

    it('.numPages() creates array of 50 page numbers', () => {
        expect(results.pages().length).toEqual(50)
        expect(results.pages()[0]).toEqual(1)
        expect(results.pages()[49]).toEqual(50)
    })

    it('.numPages() creates array of less than 50 page numbers for small lists', () => {
        const updatedResults = {
            ...mockResults,
            "totalItems": 45
        }
        store = mockStore({
            results: updatedResults,
            loader: false,
            resultsLoader: false,
            searchPage: 1,
            query: '',
            pages: []
        })

        tree = renderer.create(<Provider store={store}><MemoryRouter><Results /></MemoryRouter></Provider>).root;
        results = tree.children[0].children[0].children[0].children[0]._fiber.stateNode
        const pages = results.pages()
        expect(pages.length).toEqual(3)
        expect(pages[0]).toEqual(1)
        expect(pages[pages.length - 1]).toEqual(3)
    })

    it('.totalPages() creates array of all page numbers', () => {
        const pages = results.totalPages()
        expect(pages.length).toEqual(298728)
        expect(pages[0]).toEqual(1)
        expect(pages[pages.length - 1]).toEqual(298728)
    })

    it('.pageData() creates array of objects with label and value', () => {
        const pages = results.pageData()
        expect(pages[0]).toBeInstanceOf(Object)
        expect(pages[0]).toHaveProperty('label', '1')
        expect(pages[0]).toHaveProperty('value', '1')
    })

})

import { firstVisiblePage } from '../helpers/results'

describe('Results firstVisiblePage helper function', () => {

    it('returns 1 when number of pages is less than 50', () => {
        expect(firstVisiblePage(1, 30)).toEqual(1)
    })

    it('returns 25 less than the current page', () => {
        expect(firstVisiblePage(30, 100)).toEqual(5)
        expect(firstVisiblePage(150, 10000)).toEqual(125)
    })

    it('cannot be negative', () => {
        expect(firstVisiblePage(1, 51)).toEqual(1)
        expect(firstVisiblePage(10, 10000)).toEqual(1)
    })

    it('cannot allow page number options to be larger than total page count', () => {
        expect(firstVisiblePage(40, 51)).toEqual(2)
        expect(firstVisiblePage(90, 100)).toEqual(51)
    })

})