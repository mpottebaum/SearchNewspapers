import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { NativeRouter as Router } from 'react-router-native'
import Home from '../components/home/Home'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'


const mockStore = configureStore()

it('renders correctly', () => {
    const store = mockStore({user: {id: 1}})
    const tree = renderer.create(<Provider store={store}><Router><Home /></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });