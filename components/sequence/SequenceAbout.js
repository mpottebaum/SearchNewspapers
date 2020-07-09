import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, Text, FlatList } from 'react-native'
import SubmitButton from '../templates/SubmitButton'
import { convertDate, titleize } from '../../helpers/index'

const SequenceAbout = ({
    selectedResult,
    inSequence,
    rename,
    name,
    handleRenameChange,
    handleRenameSubmit,
    handleRenamePress
}) => {
    const renderLanguages = languages => {
        return <FlatList
                data={languages}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
    }
    return <View style={styles.newspaper}>
        {
            inSequence && selectedResult.name ?
            rename ?
                <View style={styles.nameContainer}>
                    <TextInput style={styles.name} onChange={handleRenameChange} value={name} />
                    <View style={styles.renameButtons}>
                        <SubmitButton onPress={handleRenameSubmit} text={'Update'} />
                        <SubmitButton onPress={handleRenamePress} text={'Cancel'} />
                    </View>
                </View>
                :
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            :
            null
        }
        <View style={styles.infoContainer}>
            {inSequence ? <Text style={styles.infoText}>Printed {convertDate(selectedResult.date)}</Text> : null}
            <Text style={styles.infoText}>{titleize(selectedResult.title_normal)}</Text>
            <Text style={styles.infoText}>{selectedResult.city}, {selectedResult.state}</Text>
            <Text style={styles.infoText}>Published by {selectedResult.publisher}</Text>
            <Text style={styles.infoText}>{selectedResult.start_year} - {selectedResult.end_year}</Text>
            <Text style={styles.infoText}>Printed {selectedResult.frequency}</Text>
            <View style={styles.languages}>
                <Text style={styles.infoText}>Languages:</Text>
                {renderLanguages(selectedResult.language)}
            </View>
            <View style={styles.notes}>
                <Text style={styles.infoText}>{selectedResult.note}</Text>
            </View>
        </View>
    </View>
}

const mapStateToProps = state => {
    return {
        selectedResult: state.selectedResult,
    }
}

export default connect(mapStateToProps)(SequenceAbout)

const styles = StyleSheet.create({
    nameContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    },
    infoContainer: {
        flex: 5,
        marginTop: 20
    },
    infoText: {
        fontSize: 18
    },
    newspaper: {
        flex: 1
    },
    rename: {
        width: 100,
        alignSelf: 'center'
    },
    renameButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    languages: {
        flex: 1
    },
    notes: {
        flex: 4
    }
})