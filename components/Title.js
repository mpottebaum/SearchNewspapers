import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import TitleEdition from './TitleEdition'
import PageNavBar from './templates/PageNavBar'
import selectedTitleReducer from '../reducers/selectedTitle'
// {
//     "place_of_publication": "Paris, Ky.",
//     "lccn": "sn86069873",
//     "start_year": "1895",
//     "place": [
//         "Kentucky--Bourbon--Paris"
//     ],
//     "name": "The Bourbon news. [volume]",
//     "publisher": "Champ & Miller",
//     "url": "https://chroniclingamerica.loc.gov/lccn/sn86069873.json",
//     "end_year": "19??",
//     "issues": [
//         {
//             "url": "https://chroniclingamerica.loc.gov/lccn/sn86069873/1897-01-01/ed-1.json",
//             "date_issued": "1897-01-01"
//         },

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
    
    handleChange = (value, index, data) => {
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
                value: page
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
        console.log('loader', this.props.loader)
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
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <FlatList
                        data={this.visiblePages()}
                        renderItem={({ item }) => <TitleEdition edition={item} />}
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
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         getResults: (query, page) => dispatch(getResults(query, page))
//     }
// }

export default connect(mapStateToProps)(Title)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titles: {
        flex: 12
    }
})


// const getStart = (page, pageTotal) => {
//     const pageNum = parseInt(page)
//     const diff = pageTotal - pageNum
//     if(pageNum > 10) {
//         if(diff < 10) {
//             return pageNum - 10
//         } else {
//             return pageNum - (20 - diff)
//         }
//     } else {
//         return 1
//     }
// }