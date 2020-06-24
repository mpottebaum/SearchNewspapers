import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


const SubmitButton = props => {
    const buttonStyle = {
        ...styles.button,
        ...props.style
    }
    const textStyle = {
        ...styles.buttonText,
        ...props.textStyle
    }

    return <TouchableOpacity onPress={props.onPress} style={buttonStyle} disabled={props.disabled}>
        <Text style={textStyle}>{props.text}</Text>
    </TouchableOpacity>
}

export default SubmitButton

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        fontSize: 15
    },
    button: {
        padding: 18,
        backgroundColor: '#a9a48e',
    }
})