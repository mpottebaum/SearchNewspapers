import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import SearchForm from './SearchForm'
import CreateUser from './CreateUser'

const Home = props => {
    return <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/journo.jpg')}/>
        </View>
        {
            props.user ?
            <SearchForm />
            :
            <CreateUser />
        }
    </View>
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)

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
})