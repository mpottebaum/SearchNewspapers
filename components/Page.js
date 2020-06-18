import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { addSeqFromPage } from '../actions/sequences'
import { convertDate, titleize } from '../helpers/index'

class Page extends React.Component {

    handlePress = () => {
        const { page } = this.props
        if(page.pdf) {
            this.props.addSeqFromPage(page)
        } else {
            this.props.addSequence(page)
        }
        this.props.history.push('/sequence')
    }

    render() {
        const { page } = this.props
        return <View style={styles.page}>
            <TouchableOpacity onPress={this.handlePress} style={styles.info}>
                <Text>{page.name}</Text>
                <Text>{convertDate(page.date)} | Page {page.sequence}</Text>
                <Text>{titleize(page.title_normal)}</Text>
                <Text>{page.city}, {page.state}</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={styles.delete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSeqFromPage: page => dispatch(addSeqFromPage(page))
    }
}

const PageWithRouter = withRouter(Page)

export default connect(null, mapDispatchToProps)(PageWithRouter)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        margin: 10,
        flexDirection: 'row'
    },
    info: {
        width: Dimensions.get('window').width * (3 / 5)
    },
    delete: {
        padding: 15,
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
})