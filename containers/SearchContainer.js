import React from 'react'
import { connect } from 'react-redux'
import { NativeRouter as Router, Route } from 'react-router-native'
import { StyleView, Text } from 'react-native'
import SearchForm from '../components/SearchForm'
import Results from '../components/Results'


class SearchContainer extends React.Component {
    render() {
        return <Router>
            <Route exact path='/'>
                <SearchForm />
            </Route>
            <Route path='/results'>
                <Results />
            </Route>
        </Router>
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        resultsLoader: state.resultsLoader
    }
}

export default connect(mapStateToProps)(SearchContainer)