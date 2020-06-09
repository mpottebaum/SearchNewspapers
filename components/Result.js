import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { TouchableOpacity, Text } from 'react-native'
import { addSequence } from '../actions/sequences'

class Result extends React.Component {

    handlePress = () => {
        this.props.addSequence(this.props.result)
        this.props.history.push('/sequence')
    }

    render() {
        const { result } = this.props
        return <TouchableOpacity onPress={this.handlePress} >
            <Text>Newspaper: {result.title}</Text>
            <Text>{convertDate(result.date)}</Text>
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


const convertDate = date => {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return `${month}/${day}/${year}`
}