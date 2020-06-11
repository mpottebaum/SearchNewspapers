import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import SearchForm from './SearchForm'

const Home = props => {
    return <View style={styles.container}>

        <SearchForm />
    </View>
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    // about: {
    //     flex: 1
    // },
    // text: {
    //     textAlign: 'center'
    // }
})