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
        const { edition, result } = this.props
        return <View>
            <TouchableOpacity onPress={this.handlePress} style={styles.edition}>
                <Text style={styles.dateText}>{convertDate(edition.date_issued)}</Text>
                <Text style={styles.titleText}>{titleize(result.title_normal)}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
        </View>

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEdFromTitle: url => dispatch(addEdFromTitle(url)),
    }
}

const TitleEditionWithRouter = withRouter(TitleEdition)

export default connect(null, mapDispatchToProps)(TitleEditionWithRouter)

const styles = StyleSheet.create({
    edition: {
        padding: 20,
        flex: 1,
        flexDirection: 'column'
    },
    dateText: {
        fontSize: 17
    },
    titleText: {
        color: '#6b6b6b',
        fontSize: 17
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#000",
    }
})