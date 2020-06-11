import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { addSequence } from '../actions/sequences'

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


const convertDate = date => {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return `${month}/${day}/${year}`
}

const titleize = title => {
    const removePeriod = title.slice(0, -1)
    const splitTitleSpace = removePeriod.split(' ')
    const capitalizedSpace = capitalizeWords(splitTitleSpace)
    const spaceCapTitle = capitalizedSpace.join(' ')
    const splitTitleDash = spaceCapTitle.split('-')
    if(splitTitleDash.length > 1) {
        const capitalizedDash = capitalizeWords(splitTitleDash)
        return capitalizedDash.join('-')
    } else {
        return spaceCapTitle
    }
}

const capitalizeWords = wordArray => {
    return wordArray.map(word => {
        const splitWord = word.split('')
        splitWord[0] = splitWord[0].toUpperCase()
        return splitWord.join('')
    })
}