import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, Text, FlatList } from 'react-native'
import SubmitButton from './templates/SubmitButton'
import { renamePage } from '../actions/users'
import { convertDate, titleize } from '../helpers/index'

class SequenceAbout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rename: false,
            name: props.selectedResult.name
        }
    }

    handleRenameSubmit = () => {
        this.props.renamePage(this.props.user.id, this.props.selectedResult.id, this.state.name)
        this.setState({
            rename: false
        })
    }

    handleRenameChange = e => {
        this.setState({
            name: e.nativeEvent.text
        })
    }

    handleRenamePress = () => {
        this.setState(prevState => {
            return {
                rename: !prevState.rename
            }
        })
    }

    renderLanguages = languages => {
        return <FlatList
                data={languages}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
    }

    render() {
        const { selectedResult } = this.props
        return <View style={styles.newspaper}>
        {
            selectedResult.name ?
            this.state.rename ?
                <View style={styles.nameContainer}>
                    <TextInput onChange={this.handleRenameChange} value={this.state.name} />
                    <SubmitButton onPress={this.handleRenameSubmit} text={'Update'} />
                    <SubmitButton onPress={this.handleRenamePress} text={'Cancel'} />
                </View>
                :
                <View style={styles.nameContainer}>
                    <Text>{this.state.name}</Text>
                    <SubmitButton onPress={this.handleRenamePress} text={'Rename'} />
                </View>
            :
            null
        }
        <Text>Printed {convertDate(selectedResult.date)}</Text>
        <Text>About Newspaper</Text>
        <Text>{titleize(selectedResult.title_normal)}</Text>
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

const mapStateToProps = state => {
    return {
        selectedResult: state.selectedResult,
        user: state.user,
        pages: state.pages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        renamePage: (userId, pageId, name) => dispatch(renamePage(userId, pageId, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceAbout)

const styles = StyleSheet.create({
    nameContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    newspaper: {
        flex: 1
    }
})