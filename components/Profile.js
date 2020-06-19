import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { withRouter } from 'react-router-native'
import Pages from './Pages'
import SubmitButton from './templates/SubmitButton'
import { deleteUser, deletePages } from '../actions/users'

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
                    <View style={styles.buttonContainer}>
                        <SubmitButton onPress={this.handleDelSel} text={'Cancel'}/>
                    </View>
                    :
                    <View style={styles.buttonContainer}>
                        <SubmitButton onPress={this.handleOptPress} text={'Options'}/>
                    </View>
                }
                {
                    this.state.opt ?
                    <View style={styles.buttonContainer}>
                        <SubmitButton onPress={this.handleOptPress} text={'Pages'}/>
                    </View>
                    :
                    this.state.deleteSelect ?
                            <View style={styles.buttonContainer}>
                                <SubmitButton onPress={this.handleDelete} text={'Delete'}/>
                            </View>
                            :
                            <View style={styles.buttonContainer}>
                                <SubmitButton onPress={this.handleDelSel} text={'Select Pages To Delete'}/>
                            </View>
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
        flex: 1
    },
    optContainer: {
        flex: 1
    },
    pagesContainer: {
        flex: 12
    },
    topButtons: {
        flex: 1,
        flexDirection: 'row'
    }
})