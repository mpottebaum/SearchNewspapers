import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import Result from './Result'
import { getResults } from '../actions/results'

class Results extends React.Component {

    numPages = () => {
        const { results } = this.props
        return Math.ceil(results.totalItems / results.itemsPerPage)
    }

    handlePress = () => {
        this.props.getResults(this.props.query, (this.props.page + 1))
    }

    render() {
        const { items } = this.props.results
        return <View style={styles.container}>
            {
                this.props.resultsLoader ?
                <Text>Loading</Text>
                :
                <View style={styles.container}>
                    <Text>{this.props.results.totalItems} results</Text>
                    <Text>Showing page {this.props.page} of {this.numPages()}</Text>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Text>Next Page</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={items}
                        renderItem={({ item }) => <Result result={item} />}
                        keyExtractor={result => result.id}
                    />
                </View>

            }
        </View>
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        resultsLoader: state.resultsLoader,
        page: state.page,
        query: state.query
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getResults: (query, page) => dispatch(getResults(query, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})