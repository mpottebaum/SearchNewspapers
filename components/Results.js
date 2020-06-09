import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import Result from './Result'

class Results extends React.Component {
    renderResults = () => {
        return this.props.results.map(result => <Result result={result} key={result.id}/>)
    }

    render() {
        return <View style={styles.container}>
            {
                this.props.resultsLoader ?
                <Text>Loading</Text>
                :
                this.renderResults()
            }
        </View>
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        resultsLoader: state.resultsLoader
    }
}

export default connect(mapStateToProps)(Results)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})