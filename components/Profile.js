import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { withRouter } from 'react-router-native'
import Pages from './Pages'
import SubmitButton from './templates/SubmitButton'
import { deleteUser } from '../actions/users'

class Profile extends React.Component {

    handlePress = () => {
        this.props.deleteUser(this.props.user.id)
        this.props.history.push('/')
    }


    render() {
        return <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <SubmitButton onPress={this.handlePress} text={'Delete Account'}/>
            </View>
            <View style={styles.pagesContainer}>
                <Pages />
            </View>
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
        deleteUser: id => dispatch(deleteUser(id))
    }
}

const ProfileWithRouter = withRouter(Profile)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithRouter)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonContainer: {
        flex: 1
    },
    pagesContainer: {
        flex: 12
    }
})