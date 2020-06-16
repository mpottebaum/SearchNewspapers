import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import Result from './Result'
import PageNavBar from './templates/PageNavBar'
import { getPages } from '../actions/users'

class Pages extends React.Component {

    componentDidMount() {
        this.props.getPages(this.props.user.id)
    }

    // numPages = () => {
    //     const { results } = this.props
    //     return Math.ceil(results.totalItems / results.itemsPerPage)
    // }

    // handlePress = pageNum => {
    //     this.props.getResults(this.props.query, pageNum)
    // }
    
    // handleChange = (value, index, data) => {
    //     this.props.getResults(this.props.query, value)
    // }

    // pages = () => {
    //     const totalPages = this.numPages() > 2**30 ? 2**30 : this.numPages()
    //     return [...Array(totalPages).keys()].map(i => i + 1)
    // }

    // pageData = () => {
    //     const pages = this.pages()
    //     return pages.map(page => {
    //         return {
    //             value: page
    //         }
    //     })
    // }

    render() {
        return <View style={styles.container}>
            {/* <PageNavBar 
                onPress={this.handlePress}
                onDropdownChange={this.handleChange}
                dropdownData={this.pageData()}
                collection={this.pages()}
                selection={this.props.searchPage}
                collectionLoader={this.props.resultsLoader}
            />
            <SafeAreaView style={styles.results}>
                {
                    this.props.resultsLoader ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <FlatList
                        data={items}
                        renderItem={({ item }) => <Result result={item} />}
                        keyExtractor={result => result.id}
                    />

                }
            </SafeAreaView> */}
        </View>
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        pages: state.pages,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPages: userId => dispatch(getPages(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    results: {
        flex: 12
    }
})


const getStart = (page, pageTotal) => {
    const pageNum = parseInt(page)
    const diff = pageTotal - pageNum
    if(pageNum > 10) {
        if(diff < 10) {
            return pageNum - 10
        } else {
            return pageNum - (20 - diff)
        }
    } else {
        return 1
    }
}