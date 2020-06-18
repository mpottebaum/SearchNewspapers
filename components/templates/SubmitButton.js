import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


const SubmitButton = props => {
    return <TouchableOpacity onPress={props.onPress} style={styles.button} disabled={props.disabled}>
        <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
}

export default SubmitButton

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center'
    },
    button: {
        padding: 20,
        backgroundColor: 'gray',
    }
})