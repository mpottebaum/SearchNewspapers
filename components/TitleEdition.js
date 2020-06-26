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
        return <TouchableOpacity onPress={this.handlePress} style={styles.edition}>
                    <Text style={styles.text}>{titleize(result.title_normal)} {convertDate(edition.date_issued)}</Text>
            </TouchableOpacity>
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
        flexDirection: 'row'
    },
    text: {
        fontSize: 20
    }
})