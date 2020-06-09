import React from 'react'
import { View, Text } from 'react-native'

const Result = props => {
    return <View>
        <Text>Title: {props.result.title}</Text>
    </View>
}

export default Result