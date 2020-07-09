import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import { withRouter } from 'react-router-native'
import Pages from './Pages'
import SubmitButton from '../templates/SubmitButton'
import { deleteUser, deletePages } from '../../actions/users'

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            opt: false,
            deleteSelect: false
        }
    }

    handleOptPress = () => {
        this.setState(prevState => {
            return {
                opt: !prevState.opt
            }
        })
    }

    handleDelAcc = () => {
        this.props.deleteUser(this.props.user.id)
        this.props.history.push('/')
    }

    handleDelSel = () => {
        this.setState(prevState => {
            return {
                deleteSelect: !prevState.deleteSelect
            }
        })
    }

    handleDelete = () => {
        this.props.deletePages(this.props.user.id, this.props.selectedPagesDel)
        this.setState({
            deleteSelect: false
        })
    }


    render() {
        return <View style={styles.container}>
            <View style={styles.topButtons}>
                {
                    this.state.deleteSelect ?
                    <TouchableOpacity onPress={this.handleDelSel} style={styles.button} >
                        <Image style={styles.image} source={require('../../assets/icons/cancel.png')}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.handleOptPress} style={styles.button} >
                        <Image style={styles.image} source={require('../../assets/icons/options.png')}/>
                    </TouchableOpacity>
                }
                {
                    this.state.opt ?
                    <TouchableOpacity onPress={this.handleOptPress} style={styles.button} >
                        <Image style={styles.image} source={require('../../assets/icons/list.png')}/>
                    </TouchableOpacity>
                    :
                    this.state.deleteSelect ?
                            <TouchableOpacity onPress={this.handleDelete} style={styles.button} >
                                <Image style={styles.image} source={require('../../assets/icons/check.png')}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={this.handleDelSel} style={styles.button} >
                                <Image style={styles.image} source={require('../../assets/icons/delete.png')}/>
                            </TouchableOpacity>
                }
            </View>
            {
                this.state.opt ?
                <View style={styles.optContainer}>
                    <View style={styles.buttonContainer}>
                        <SubmitButton onPress={this.handleDelAcc} text={'Delete Account'}/>
                    </View>
                </View>
                :
                <View style={styles.pagesContainer}>
                    <Pages deleteSelect={this.state.deleteSelect} />
                </View>

            }
        </View>
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        selectedPagesDel: state.selectedPagesDel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: id => dispatch(deleteUser(id)),
        deletePages: (userId, pageIds) => dispatch(deletePages(userId, pageIds))
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
        flex: 1,
        alignSelf: 'center',
        marginTop: 20
    },
    optContainer: {
        flex: 12,
        flexDirection: 'row'
    },
    pagesContainer: {
        flex: 12
    },
    topButtons: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: Dimensions.get('window').width / 4 - 70,
        height: Dimensions.get('window').width / 4 - 70,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    button: {
        padding: 13,
        backgroundColor: '#a9a48e',
        width: Dimensions.get('window').width / 2
    }
})