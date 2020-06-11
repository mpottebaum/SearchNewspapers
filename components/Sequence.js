import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, Dimensions, View, ScrollView, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import Pdf from 'react-native-pdf'
import { addEdition } from '../actions/editions'

class Sequence extends React.Component {
    constructor() {
        super()
        this.state = {
            view: 'pdf'
        }
    }
    
    renderLanguages = languages => {
        return <FlatList
                data={languages}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
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
        this.props.addEdition(this.props.selectedResult, this.props.sequence)
        this.props.history.push('/edition')
    }

    renderView = () => {
        const { selectedResult, sequence, sequenceLoader } = this.props
        switch(this.state.view) {
            case 'pdf':
                return sequenceLoader ?
                <Text>Loading...</Text>
                :
                <Pdf
                    source={{uri: sequence.pdf, cache: true}}
                    style={styles.pdf}
                    minScale={1.0}
                    maxScale={11.0}
                />
            case 'paper':
                return <View style={styles.newspaper}>
                    <Text>{selectedResult.title}</Text>
                    <Text>{selectedResult.start_year} - {selectedResult.end_year}</Text>
                    <Text>{selectedResult.city}, {selectedResult.state}</Text>
                    <Text>{selectedResult.frequency}</Text>
                    <Text>Languages</Text>
                    {this.renderLanguages(selectedResult.language)}
                    <Text>Published by {selectedResult.publisher}</Text>
                    <Text>{selectedResult.note}</Text>
                </View>
        }
    }

    render() {
        console.log(this.props.sequence.pdf)
        return <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => this.handleNavPress('paper')} style={styles.navButton}>
                    <Text style={styles.navText}>Publishing</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleNavPress('pdf')} style={styles.navButton}>
                    <Text style={styles.navText}>View PDF</Text>
                </TouchableOpacity>
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
        sequenceLoader: state.sequenceLoader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEdition: (result, sequence) => dispatch(addEdition(result, sequence))
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
    newspaper: {
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
    }
})

const convertDate = date => {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return `${month}/${day}/${year}`
}