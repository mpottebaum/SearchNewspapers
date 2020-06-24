import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, Dimensions, View, TextInput, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import Pdf from 'react-native-pdf'
import SequenceAbout from './SequenceAbout'
import SubmitButton from './templates/SubmitButton'
import { addEdition, addEdFromPage } from '../actions/editions'
import { savePage, renamePage } from '../actions/users'
import { convertDate, titleize } from '../helpers/index'

class Sequence extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: 'pdf',
            optSaved: false,
        }
    }

    handleSavePress = () => {
        if(!this.isSaved()) {
            this.setState({optSaved: true})
            const { selectedResult, sequence, user } = this.props
            this.props.savePage(selectedResult, sequence, user.id)
        }
    }

    isSaved = () => {
        if(this.state.optSaved) return true
        else {
            if(parseInt(this.props.selectedResult.id)) {
                return this.props.pages.some(page => page.id === this.props.selectedResult.id)
            } else {
                return this.props.pages.some(page => page.lccn === this.props.selectedResult.id)
            }
        }
    }

    handleBackPress = () => {
        this.props.history.push('/results')
    }

    handleNavPress = view => {
        this.setState({
            view: view
        })
    }

    handleEditionPress = () => {
        if(parseInt(this.props.selectedResult.id)) {
            this.props.addEdFromPage(this.props.selectedResult)
        } else {
            this.props.addEdition(this.props.selectedResult, this.props.sequence)
        }
        this.props.history.push('/edition')
    }

    renderView = () => {
        const { selectedResult, sequence, sequenceLoader } = this.props
        switch(this.state.view) {
            case 'pdf':
                return sequenceLoader ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <Pdf
                    source={{uri: sequence.pdf, cache: true}}
                    style={styles.pdf}
                    minScale={1.0}
                    maxScale={11.0}
                />
            case 'paper':
                return <SequenceAbout />
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => this.handleNavPress('paper')} style={styles.navButton}>
                    <Text style={styles.navText}>About</Text>
                </TouchableOpacity>
                {
                    this.state.view === 'paper' ?
                    <TouchableOpacity onPress={() => this.handleNavPress('pdf')} style={styles.navButton}>
                        <Text style={styles.navText}>View PDF</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.handleSavePress} style={this.isSaved() ? styles.saved : styles.navButton} disabled={this.isSaved()}>
                        <Text style={styles.navText}>{this.isSaved() ? 'Saved' : 'Save Page'}</Text>
                    </TouchableOpacity>

                }
                <TouchableOpacity onPress={this.handleEditionPress} style={styles.navButton}>
                    <Text style={styles.navText}>Full Issue</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={{flex: 12}}>
                {this.renderView()}
            </SafeAreaView>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        selectedResult: state.selectedResult,
        sequence: state.sequence,
        sequenceLoader: state.sequenceLoader,
        user: state.user,
        pages: state.pages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEdition: (result, sequence) => dispatch(addEdition(result, sequence)),
        addEdFromPage: page => dispatch(addEdFromPage(page)),
        savePage: (result, sequence, userId) => dispatch(savePage(result, sequence, userId)),
        renamePage: (userId, pageId, name) => dispatch(renamePage(userId, pageId, name))
    }
}

const SequenceWithRouter = withRouter(Sequence)

export default connect(mapStateToProps, mapDispatchToProps)(SequenceWithRouter)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    page: {
        flex: 1
    },
    navBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    navColumn: {
        flex: 1,
        flexDirection: 'column',
    },
    navText: {
        textAlign: 'center'
    },
    navButton: {
        width: Dimensions.get('window').width / 3,
        padding: 20,
        backgroundColor: '#a9b6c9',
        justifyContent: 'center',
        alignContent: 'center'
    },
    saved: {
        width: Dimensions.get('window').width / 3,
        padding: 20,
        backgroundColor: '#bfbfbf',
        justifyContent: 'center',
        alignContent: 'center'
    }
})