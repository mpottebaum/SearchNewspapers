import React from 'react'
import { connect } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Pdf from 'react-native-pdf'

class Sequence extends React.Component {
    
    renderLanguages = languages => {
        return <FlatList
                data={languages}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
    }

    render() {
        const { selectedResult, sequence, sequenceLoader } = this.props
        return <View>
            <View>
                {
                    sequenceLoader ?
                    <Text>Loading...</Text>
                    :
                    <Pdf
                        source={{uri: sequence.pdf, cache: true}}
                    />
                }
            </View>
            <View>
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

export default connect(mapStateToProps)(Sequence)

const convertDate = date => {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return `${month}/${day}/${year}`
}