import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import Result from './Result'
import PageNavBar from '../templates/PageNavBar'
import { getResults } from '../../actions/results'
import { firstVisiblePage } from '../../helpers/results'

class Results extends React.Component {

    numPages = () => {
        const { results } = this.props
        return Math.ceil(results.totalItems / results.itemsPerPage)
    }

    handlePress = pageNum => {
        this.props.getResults(this.props.query, pageNum)
    }
    
    handleChange = value => {
        this.props.getResults(this.props.query, value)
    }

    pages = () => {
        const pages = []
        const listEnd = this.numPages() > 49 ? 49 : this.numPages() - 1
        pages[listEnd] = true
        const listStart = firstVisiblePage(this.props.searchPage, this.numPages())
        return [...pages.keys()].map(i => i + listStart)
    }

    totalPages = () => {
        const pages = []
        const lastIndex = this.numPages() - 1
        pages[lastIndex] = true
        return [...pages.keys()].map(i => i + 1)
    }

    pageData = () => {
        const pages = this.pages()
        return pages.map(page => {
            return {
                label: page.toString(),
                value: page.toString()
            }
        })
    }

    render() {
        const { items } = this.props.results
        return <View style={styles.container}>
            <PageNavBar 
                onPress={this.handlePress}
                onDropdownChange={this.handleChange}
                dropdownData={this.pageData()}
                collection={this.totalPages()}
                selection={this.props.searchPage}
                collectionLoader={this.props.resultsLoader}
            />
            <SafeAreaView style={styles.results}>
                {
                    this.props.loader ?
                    <ActivityIndicator size="large" color="#6b6b6b" />
                    :
                    <FlatList
                        data={items}
                        renderItem={({ item }) => <Result result={item} />}
                        keyExtractor={result => result.id}
                    />

                }
            </SafeAreaView>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        loader: state.loader,
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
        flex: 1,
    },
    results: {
        flex: 12,
        justifyContent: 'center',
        zIndex: 1
    },
})