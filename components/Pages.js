import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import Result from './Result'
import PageNavBar from './templates/PageNavBar'
import { getPages } from '../actions/users'

class Pages extends React.Component {
    constructor() {
        super()
        this.state = {
            listPage: 0
        }
    }

    componentDidMount() {
        this.props.getPages(this.props.user.id)
    }

    numPages = () => {
        const { pages } = this.props
        return pages.length === 0 ? 1 : Math.ceil(pages.length / 20)
    }

    handlePress = pageNum => {
        this.setState({
            listPage: pageNum
        })
    }
    
    handleChange = (value, index, data) => {
        this.setState({
            listPage: (value - 1)
        })
    }

    pageNumsArr = () => {
        const totalPages = this.numPages() > 10**6 ? 10**6 : this.numPages()
        return [...Array(totalPages).keys()].map(i => i + 1)
    }

    pageData = () => {
        const pageNums = this.pageNumsArr()
        return pageNums.map(pageNum => {
            return {
                value: pageNum
            }
        })
    }

    visiblePages = () => {
        return this.props.pages.slice((this.state.listPage * 20), (this.state.listPage * 20 + 20))
    }

    render() {
        const pages = this.visiblePages()
        return <View style={styles.container}>
            <PageNavBar 
                onPress={this.handlePress}
                onDropdownChange={this.handleChange}
                dropdownData={this.pageData()}
                collection={this.pageNumsArr()}
                selection={this.state.listPage + 1}
                collectionLoader={this.props.loader}
            />
            <SafeAreaView style={styles.results}>
                {
                    this.props.loader ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <FlatList
                        data={pages}
                        renderItem={({ item }) => <Result result={item} />}
                        keyExtractor={page => page.id}
                    />

                }
            </SafeAreaView>
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