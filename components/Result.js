import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native'
import { addSequence } from '../actions/sequences'
import { convertDate, titleize } from '../helpers/index'

class Result extends React.Component {

    handlePress = () => {
        const { result } = this.props
        this.props.addSequence(result)
        this.props.history.push('/sequence')
    }

    isSaved = () => {
        return this.props.pages.some(page => page.lccn === this.props.result.id)
    }

    render() {
        const { result } = this.props
        return <TouchableOpacity onPress={this.handlePress} style={this.isSaved() ? styles.savedResult : styles.result}>
                <View style={styles.info}>
                    <Text>{convertDate(result.date)} | Page {result.sequence}</Text>
                    <Text>{titleize(result.title_normal)}</Text>
                    <Text>{result.city}, {result.state}</Text>
                </View>
                {
                    this.isSaved() ?
                    <View style={styles.savedContainer}>
                        <Image style={styles.image} source={require('../assets/icons/check.png')}/>
                    </View>
                    :
                    null
                }
            </TouchableOpacity>
    }
}

const mapStateToProps = state => {
    return {
        pages: state.pages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSequence: result => dispatch(addSequence(result)),
    }
}

const ResultWithRouter = withRouter(Result)

export default connect(mapStateToProps, mapDispatchToProps)(ResultWithRouter)

const styles = StyleSheet.create({
    result: {
        padding: 10,
        flex: 1,
        flexDirection: 'row'
    },
    savedResult: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(176, 161, 128, 0.75)'
    },
    info: {
        width: Dimensions.get('window').width * (3 / 5)
    },
    save: {
        textAlign: 'center',
        color: 'blue',
        width: Dimensions.get('window').width * (2 / 5)
    },
    savedContainer: {
        alignContent: 'center'
    },
    image: {
        width: Dimensions.get('window').width / 4 - 70,
        height: Dimensions.get('window').width / 4 - 70,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
})