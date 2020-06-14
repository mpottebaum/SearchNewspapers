import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import SubmitButton from './templates/SubmitButton'
import { createUser } from '../actions/users'

class CreateUser extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    handlePress = () => {
        this.props.createUser(this.state.name)
    }

    handleChange = e => {
        this.setState({
            name: e.nativeEvent.text
        })
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.text}>
                Search through Chronicling America's database of historic American newspapers
            </Text>
            <TextInput
                onChange={this.handleChange}
                value={this.state.name}
                placeholder={'Enter your name'}
                style={styles.textInput}
            />
            <SubmitButton onPress={this.handlePress} text={'Create Account'} />
        </View>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createUser: name => dispatch(createUser(name))
    }
}

export default connect(null, mapDispatchToProps)(CreateUser)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    text : {
        textAlign: 'center'
    },
    textInput: {
        fontSize: 18
    }
})