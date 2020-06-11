import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import SearchForm from './SearchForm'

const Home = props => {
    return <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/journo.jpg')}/>
        </View>
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
    image: {
        resizeMode: 'center',
        width: (Dimensions.get('window').width) * 1.2
    },
    imageContainer: {
        flex: 1
    }
    // about: {
    //     flex: 1
    // },
    // text: {
    //     textAlign: 'center'
    // }
})