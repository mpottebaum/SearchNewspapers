import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { NativeRouter as Router, Route } from 'react-router-native'
import StatusBarBackground from '../components/StatusBarBackground'
import SearchForm from '../components/SearchForm'
import Results from '../components/Results'
import Sequence from '../components/Sequence'


class SearchContainer extends React.Component {
    render() {
        return <View style={styles.container}>
            <StatusBarBackground />
            <Router>
                <Route exact path='/'>
                    <SearchForm />
                </Route>
                <Route path='/results'>
                    <Results />
                </Route>
                <Route path='/sequence'>
                    <Sequence />
                </Route>
            </Router>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        resultsLoader: state.resultsLoader
    }
}

export default connect(mapStateToProps)(SearchContainer)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})