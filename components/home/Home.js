import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import SearchForm from './SearchForm'
import CreateUser from './CreateUser'
import { getAsyncData } from '../../helpers/index'
import { addUser } from '../../actions/users'

class Home extends React.Component {

    componentDidMount() {
        getAsyncData('userId', this.props.addUser)
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/journo.jpg')}/>
            </View>
            {
                this.props.user ?
                <SearchForm />
                :
                <CreateUser />
            }
        </View>
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: id => dispatch(addUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

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