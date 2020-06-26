import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

const ReduxStore = ({
    results,
    resultsLoader,
    sequence,
    selectedResult,
    searchPage,
    query,
    edition,
    editionPage,
    editionLoader,
    user,
    loader,
    pages,
    selectedPagesDel,
    selectedTitle
}) => {
    console.log('********************')
    console.log('REDUX STORE')
    console.log(`
    selectedResult: ${selectedResult}
    sequence: ${sequence}
    selectedTitle: ${selectedTitle}
    edition: ${edition}
    editionPage: ${editionPage}
    *******
    results: ${results}
    query: ${query}
    searchPage: ${searchPage}
    *******
    user: ${user}
    pages: ${pages}
    selectedPagesDel: ${selectedPagesDel}

    LOADERS
    loader: ${loader}
    resultsLoader: ${resultsLoader}
    editionLoader: ${editionLoader}
    `)
    console.log('********************')
    return <View></View>
}

const mapStateToProps = state => {
    return {
        results: state.results,
        resultsLoader: state.resultsLoader,
        sequence: state.sequence,
        selectedResult: state.selectedResult,
        searchPage: state.searchPage,
        query: state.query,
        edition: state.edition,
        editionPage: state.editionPage,
        editionLoader: state.editionLoader,
        user: state.user,
        loader: state.loader,
        pages: state.pages,
        selectedPagesDel: state.selectedPagesDel,
        selectedTitle: state.selectedTitle
    }
}

export default connect(mapStateToProps)(ReduxStore)