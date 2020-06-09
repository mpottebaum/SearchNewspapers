import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, Text } from 'react-native'
import { addSequence } from '../actions/sequences'

class Result extends React.Component {

    handlePress = () => {
        const id = this.props.result.id.slice(0, -1)
        this.props.addSequence(id)
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
        addSequence: id => dispatch(addSequence(id))
    }
}

export default connect(null, mapDispatchToProps)(Result)


const convertDate = date => {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return `${month}/${day}/${year}`
}