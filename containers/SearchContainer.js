import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { NativeRouter as Router, Route } from 'react-router-native'
import StatusBarBackground from '../components/templates/StatusBarBackground'
import NavBar from '../components/NavBar'
import Home from '../components/home/Home'
import Results from '../components//results/Results'
import Sequence from '../components/sequence/Sequence'
import Edition from '../components/Edition'
import Profile from '../components/profile/Profile'
import Title from '../components/title/Title'
import SequenceAbout from '../components/sequence/SequenceAbout'

import ReduxStore from './ReduxStore'


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
                    <Route path='/title'>
                        <Title />
                    </Route>
                    <Route path='/about'>
                        <SequenceAbout />
                    </Route>
                </SafeAreaView>
                <NavBar />
            </Router>
            <ReduxStore />
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
        backgroundColor: 'rgba(176, 161, 128, 0.4)'
    }
})