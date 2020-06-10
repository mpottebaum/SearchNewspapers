import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, Dimensions, View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native'
import Pdf from 'react-native-pdf'

class Sequence extends React.Component {
    
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

    render() {
        const { selectedResult, sequence, sequenceLoader } = this.props
        return <ScrollView style={styles.container}>
            <View style={styles.page}>
                {
                    sequenceLoader ?
                    <Text>Loading...</Text>
                    :
                    <Pdf
                        source={{uri: sequence.pdf, cache: true}}
                        onLoadComplete={(numberOfPages,filePath)=>{
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page,numberOfPages)=>{
                            console.log(`current page: ${page}`);
                        }}
                        onError={(error)=>{
                            console.log(error);
                        }}
                        style={styles.pdf}
                    />
                }
            </View>
            <TouchableOpacity onPress={this.handleBackPress}>
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.newspaper}>
                <Text>Newspaper</Text>
                <Text>{selectedResult.title}</Text>
                <Text>{selectedResult.start_year} - {selectedResult.end_year}</Text>
                <Text>{selectedResult.city}, {selectedResult.state}</Text>
                <Text>{selectedResult.frequency}</Text>
                <Text>Languages</Text>
                {this.renderLanguages(selectedResult.language)}
                <Text>Published by {selectedResult.publisher}</Text>
                <Text>{selectedResult.note}</Text>
            </View>
        </ScrollView>
    }
}

const mapStateToProps = state => {
    return {
        selectedResult: state.selectedResult,
        sequence: state.sequence,
        sequenceLoader: state.sequenceLoader
    }
}

const SequenceWithRouter = withRouter(Sequence)

export default connect(mapStateToProps)(SequenceWithRouter)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    page: {
        flex: 1
    },
    newspaper: {
        flex: 1
    }
})

const convertDate = date => {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return `${month}/${day}/${year}`
}