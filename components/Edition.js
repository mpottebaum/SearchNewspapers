import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import Pdf from 'react-native-pdf'
import { withRouter } from 'react-router-native'
import { addEditionPage } from '../actions/editions'
import { savePage } from '../actions/users'
import { addTitle } from '../actions/titles'
import PageNavBar from './templates/PageNavBar'

class Edition extends React.Component {

    handlePress = (sequence) => {
        this.props.addEditionPage(sequence, this.props.edition)
    }

    handleSavePress = () => {
        if(!this.isSaved()) {
            const { selectedResult, editionPage, user } = this.props
            this.props.savePage(selectedResult, editionPage, user.id)
        }
    }

    handleTitlePress = () => {
        const lccn = parseInt(this.props.selectedResult.id) ? this.props.selectedResult.lccn : this.props.selectedResult.id
        this.props.addTitle(lccn)
        this.props.history.push('/title')
    }


    isSaved = () => {
        if(this.props.editionPage) {
            const lccn = /\/lccn\/s?n?[0-9]+\/[0-9]+-[0-9]+-[0-9]+\/ed-[0-9]+\/seq-[0-9]+/.exec(this.props.editionPage.pdf)
            return this.props.pages.some(page => page.lccn === `${lccn[0]}/`)
        } else return false
    }

    handleChange = value => {
        this.props.addEditionPage(value, this.props.edition)
    }

    pageData = () => {
        return this.props.editionLoader ?
            []
            :
            this.props.edition.pages.map(page => {
                return {
                    label: page.sequence.toString(),
                    value: page.sequence.toString()
                }
            })
    }

    collection = () => {
        return this.props.editionLoader ?
            []
            :
            this.props.edition.pages.map(page => page.sequence)
    }

    render() {
        return <View style={styles.container}>
                <View style={styles.topButtons}>
                    <TouchableOpacity onPress={this.handleSavePress} style={this.isSaved() ? styles.saved : styles.button} disabled={this.isSaved()}>
                        {
                            this.isSaved() ?
                                <Image style={styles.image} source={require('../assets/icons/check.png')}/>
                                :
                                <Image style={styles.image} source={require('../assets/icons/save.png')}/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleTitlePress} style={styles.button}>
                        <Image style={styles.image} source={require('../assets/icons/more_issues.png')}/>
                    </TouchableOpacity>
                </View>
                <PageNavBar 
                    onPress={this.handlePress}
                    onDropdownChange={this.handleChange}
                    dropdownData={this.pageData()}
                    collection={this.collection()}
                    selection={this.props.editionPage ? this.props.editionPage.sequence : 1}
                    collectionLoader={this.props.editionLoader}
                />
            <SafeAreaView style={{flex: 12, justifyContent: 'center'}}>
                {
                    this.props.loader ?
                        <ActivityIndicator size="large" color="#6b6b6b" />
                        :
                        <Pdf
                            source={{uri: this.props.editionPage.pdf, cache: true}}
                            style={styles.pdf}
                            minScale={1.0}
                            maxScale={11.0}
                        />
                }
                
            </SafeAreaView>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        edition: state.edition,
        editionPage: state.editionPage,
        editionLoader: state.editionLoader,
        loader: state.loader,
        pages: state.pages,
        selectedResult: state.selectedResult,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEditionPage: (sequence, edition) => dispatch(addEditionPage(sequence, edition)),
        savePage: (result, sequence, userId) => dispatch(savePage(result, sequence, userId)),
        addTitle: lccn => dispatch(addTitle(lccn))
    }
}

const EditionWithRouter = withRouter(Edition)

export default connect(mapStateToProps, mapDispatchToProps)(EditionWithRouter)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topButtons: {
        flex: 1,
        flexDirection: 'row'
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    page: {
        flex: 1
    },
    newspaper: {
        flex: 1
    },
    navBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    navText: {
        textAlign: 'center'
    },
    navButton: {
        width: Dimensions.get('window').width / 3,
        padding: 20,
        backgroundColor: '#a9b6c9',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    dropdown: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    dropdownText: {
        textAlign: 'center'
    },
    pageCount: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15
    },
    buttonText: {
        textAlign: 'center'
    },
    button: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(104, 95, 79, 0.5)',
    },
    saved: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgb(104, 95, 79)',
    },
    image: {
        width: Dimensions.get('window').width / 4 - 70,
        height: Dimensions.get('window').width / 4 - 70,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
})