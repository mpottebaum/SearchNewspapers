import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native'

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
        console.log(this.state.query)
    }


    render() {
        return <View style={styles.container}>
            <Text style={styles.label}>Search Chronicling America</Text>
            <TextInput onChange={this.handleChange} value={this.state.query} style={styles.input} />
            <TouchableOpacity onPress={this.handlePress} style={styles.button}><Text>Search</Text></TouchableOpacity>
        </View>
    }
}

export default SearchForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
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