import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { NativeRouter as Router } from 'react-router-native'
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
        const tree = renderer.create(<Provider store={store}><Router><Results /></Router></Provider>).toJSON();
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
        const tree = renderer.create(<Provider store={store}><Router><Results /></Router></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})

describe('Results function tests', () => {

    // 298728
    it('calculates correct number of pages', () => {
        const store = mockStore({
            results: mockResults,
            loader: false,
            resultsLoader: false,
            searchPage: 1,
            query: '',
            pages: []
        })

        const tree = renderer.create(<Provider store={store}><Router><Results /></Router></Provider>).getInstance();
        console.log(tree)

    })
})