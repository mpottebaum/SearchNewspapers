import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
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
            <View style={styles.headerContainer}>
                <Text style={styles.text}>
                    Search through Chronicling America's database of historic American newspapers
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Enter your name to get started</Text>
                <TextInput
                    onChange={this.handleChange}
                    value={this.state.name}
                    placeholder={'Your name'}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.buttonContainer}>
                <SubmitButton onPress={this.handlePress} text={'Create Account'} />
            </View>
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
        textAlign: 'center',
        fontSize: 20,
        // marginLeft: 12,
        // marginRight: 12,
    },
    labelText : {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        // alignSelf: 'center',
        // width: '60%'
    },
    textInput: {
        margin: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    inputContainer: {
        flex: 2,
        height: 40,
        alignSelf: 'center',
        width: Dimensions.get('window').width * (3 / 4)
    },
    buttonContainer: {
        flex: 6,
        alignSelf: 'center',
    },
    headerContainer: {
        flex: 2,
        width: '95%',
        alignSelf: 'center',
        marginTop: 20,

    }
})