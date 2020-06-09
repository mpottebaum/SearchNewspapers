import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import Result from './Result'

class Results extends React.Component {

    render() {
        return <View style={styles.container}>
            {
                this.props.resultsLoader ?
                <Text>Loading</Text>
                :
                <FlatList
                    data={this.props.results}
                    renderItem={({ item }) => <Result result={item} />}
                    keyExtractor={result => result.id}
                />
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