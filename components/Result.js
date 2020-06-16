import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { addSequence, addSeqFromPage } from '../actions/sequences'
import { convertDate, titleize } from '../helpers/index'
import Pdf from 'react-native-pdf'

class Result extends React.Component {

    handlePress = () => {
        const { result } = this.props
        if(result.pdf) {
            this.props.addSeqFromPage(result)
        } else {
            this.props.addSequence(result)
        }
        this.props.history.push('/sequence')
    }

    render() {
        const { result } = this.props
        return <TouchableOpacity onPress={this.handlePress} style={styles.result}>
            <Text>{convertDate(result.date)} | Page {result.sequence}</Text>
            <Text>{titleize(result.title_normal)}</Text>
            <Text>{result.city}, {result.state}</Text>
        </TouchableOpacity>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSequence: result => dispatch(addSequence(result)),
        addSeqFromPage: page => dispatch(addSeqFromPage(page))
    }
}

const ResultWithRouter = withRouter(Result)

export default connect(null, mapDispatchToProps)(ResultWithRouter)

const styles = StyleSheet.create({
    result: {
        margin: 10
    }
})