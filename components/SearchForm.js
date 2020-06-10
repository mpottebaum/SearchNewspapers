import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { getResults } from '../actions/results'

class SearchForm extends React.Component {
    constructor() {
        super()
        this.state = {
            query: ''
        }
    }

    handleChange = e => {
        this.setState({
            query: e.nativeEvent.text
        })
    }

    handlePress = () => {
        this.props.getResults(this.state.query, 1)
        this.props.history.push('/results')
    }


    render() {
        return <View style={styles.container}>
            <Text style={styles.label}>Search Chronicling America</Text>
            <TextInput onChange={this.handleChange} value={this.state.query} style={styles.input} />
            <TouchableOpacity onPress={this.handlePress} style={styles.button}><Text>Search</Text></TouchableOpacity>
        </View>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getResults: (query, page) => dispatch(getResults(query, page))
    }
}

const SearchFormWithRouter = withRouter(SearchForm)

export default connect(null, mapDispatchToProps)(SearchFormWithRouter)

const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: 'center',
        alignContent: 'center'
    },
    label: {

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1 
    },
    button: {
        padding: 20,
        backgroundColor: 'gray'
    }
})