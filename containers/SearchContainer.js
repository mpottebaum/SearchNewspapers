import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { NativeRouter as Router, Route } from 'react-router-native'
import StatusBarBackground from '../components/StatusBarBackground'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
// import SearchForm from '../components/SearchForm'
import Results from '../components/Results'
import Sequence from '../components/Sequence'
import Edition from '../components/Edition'
import Profile from '../components/Profile'


class SearchContainer extends React.Component {
    render() {
        return <View style={styles.container}>
            <StatusBarBackground />
            <Router>
                <SafeAreaView style={{flex: 1}}>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path='/results'>
                        <Results />
                    </Route>
                    <Route path='/sequence'>
                        <Sequence />
                    </Route>
                    <Route path='/edition'>
                        <Edition />
                    </Route>
                    <Route path='/user'>
                        <Profile />
                    </Route>
                </SafeAreaView>
                <NavBar />
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