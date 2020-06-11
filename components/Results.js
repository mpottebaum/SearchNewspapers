import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import Result from './Result'
import { getResults } from '../actions/results'

class Results extends React.Component {

    numPages = () => {
        const { results } = this.props
        return Math.ceil(results.totalItems / results.itemsPerPage)
    }

    handleNextPress = () => {
        this.props.getResults(this.props.query, (this.props.searchPage + 1))
    }

    handlePrevPress = () => {
        this.props.getResults(this.props.query, (this.props.searchPage - 1))
    }

    render() {
        const { items } = this.props.results
        return <View style={styles.container}>
            {
                this.props.resultsLoader ?
                <Text>Loading</Text>
                :
                <View style={styles.container}>
                    <View style={styles.resultsBar}>
                        <View style={styles.column}>
                            {
                                this.props.searchPage > 1 ?
                                <TouchableOpacity onPress={this.handlePrevPress} style={styles.pageNav}>
                                    <Text style={styles.info}>Previous Page</Text>
                                </TouchableOpacity>
                                :
                                null
                            }
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.info}>{this.props.results.totalItems} results</Text>
                            <Text style={styles.info}>Page {this.props.searchPage} of {this.numPages()}</Text>
                        </View>
                        <View style={styles.column}>
                            <TouchableOpacity onPress={this.handleNextPress} style={styles.pageNav}>
                                <Text style={styles.info}>Next Page</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <SafeAreaView style={styles.results}>
                        <FlatList
                            data={items}
                            renderItem={({ item }) => <Result result={item} />}
                            keyExtractor={result => result.id}
                            // contentContainerStyle={styles.results}
                        />
                    </SafeAreaView>
                </View>

            }
        </View>
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        resultsLoader: state.resultsLoader,
        searchPage: state.searchPage,
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
    },
    resultsBar: {
        flex: 1,
        flexDirection: 'row'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    info: {
        textAlign: 'center'
    },
    pageNav: {
        width: Dimensions.get('window').width / 3,
        padding: 20,
        backgroundColor: '#a9b6c9'
    },
    results: {
        flex: 8
    }
})