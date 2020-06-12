import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { addSequence } from '../actions/sequences'
import { convertDate, titleize } from '../helpers/index'

class Result extends React.Component {

    handlePress = () => {
        this.props.addSequence(this.props.result)
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
        addSequence: result => dispatch(addSequence(result))
    }
}

const ResultWithRouter = withRouter(Result)

export default connect(null, mapDispatchToProps)(ResultWithRouter)

const styles = StyleSheet.create({
    result: {
        margin: 10
    }
})