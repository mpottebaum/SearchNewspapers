import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import Result from './Result'
import PageNavBar from './templates/PageNavBar'
import { getResults } from '../actions/results'

class Results extends React.Component {

    numPages = () => {
        const { results } = this.props
        return Math.ceil(results.totalItems / results.itemsPerPage)
    }

    handlePress = pageNum => {
        this.props.getResults(this.props.query, pageNum)
    }
    
    handleChange = (value, index, data) => {
        this.props.getResults(this.props.query, value)
    }

    pages = () => {
        const totalPages = parseInt(this.props.results.totalItems)
        return [...Array(totalPages).keys()].map(i => i + 1)
    }

    pageData = () => {
        const pages = this.pages()
        return pages.map(page => {
            return {
                value: page
            }
        })
    }

    render() {
        const { items } = this.props.results
        return <View style={styles.container}>
            {
                this.props.resultsLoader ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <View style={styles.container}>
                    <PageNavBar 
                        onPress={this.handlePress}
                        onDropdownChange={this.handleChange}
                        dropdownData={this.pageData()}
                        collection={this.pages()}
                        selection={this.props.searchPage}
                        collectionLoader={this.props.resultsLoader}
                    />
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