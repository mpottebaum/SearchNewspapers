import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { addEdFromTitle} from '../actions/editions'
import { convertDate, titleize } from '../helpers/index'

class TitleEdition extends React.Component {

    handlePress = () => {
        const { edition } = this.props
        this.props.addEdFromTitle(edition.url)
        this.props.history.push('/edition')
    }

    render() {
        const { edition } = this.props
        return <TouchableOpacity onPress={this.handlePress} style={styles.edition}>
                    <Text>{convertDate(edition.date_issued)}</Text>
            </TouchableOpacity>
    }
}

// const mapStateToProps = state => {
//     return {
//         selectedResult: state.result
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        addEdFromTitle: url => dispatch(addEdFromTitle(url)),
    }
}

const TitleEditionWithRouter = withRouter(TitleEdition)

export default connect(null, mapDispatchToProps)(TitleEditionWithRouter)

const styles = StyleSheet.create({
    edition: {
        padding: 10,
        flex: 1,
        flexDirection: 'row'
    },
    // savedResult: {
    //     padding: 10,
    //     flex: 1,
    //     flexDirection: 'row',
    //     backgroundColor: 'rgba(176, 161, 128, 0.75)'
    // },
    // info: {
    //     width: Dimensions.get('window').width * (3 / 5)
    // },
    // save: {
    //     textAlign: 'center',
    //     color: 'blue',
    //     width: Dimensions.get('window').width * (2 / 5)
    // },
    // savedContainer: {
    //     alignContent: 'center'
    // }
})