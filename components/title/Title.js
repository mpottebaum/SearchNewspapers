import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import TitleEdition from './TitleEdition'
import PageNavBar from '../templates/PageNavBar'

class Title extends React.Component {
    constructor() {
        super()
        this.state = {
            listPage: 0
        }
    }

    numPages = () => {
        const { selectedTitle } = this.props
        return selectedTitle ? Math.ceil(selectedTitle.issues.length / 20) : null
    }

    handlePress = pageNum => {
        this.setState({
            listPage: pageNum - 1
        })
    }
    
    handleChange = value => {
        this.setState({
            listPage: value - 1
        })
    }

    pages = () => {
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

    visiblePages = () => {
        return this.props.selectedTitle ?
            this.props.selectedTitle.issues.slice((this.state.listPage * 20), (this.state.listPage * 20 + 20))
            :
            null
    }

    render() {
        return <View style={styles.container}>
            <PageNavBar 
                onPress={this.handlePress}
                onDropdownChange={this.handleChange}
                dropdownData={this.pageData()}
                collection={this.pages()}
                selection={this.state.listPage + 1}
                collectionLoader={this.props.loader}
            />
            <SafeAreaView style={styles.titles}>
                {
                    this.props.loader ?
                    <ActivityIndicator size="large" color="##6b6b6b" />
                    :
                    <FlatList
                        data={this.visiblePages()}
                        renderItem={({ item }) => <TitleEdition edition={item} result={this.props.selectedResult}/>}
                        keyExtractor={issue => issue.date_issued}
                    />

                }
            </SafeAreaView>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        loader: state.loader,
        selectedTitle: state.selectedTitle,
        selectedResult: state.selectedResult
    }
}

export default connect(mapStateToProps)(Title)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    titles: {
        flex: 12,
        justifyContent: 'center',
    }
})