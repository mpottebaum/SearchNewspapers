import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { addSeqFromPage } from '../actions/sequences'
import { convertDate, titleize } from '../helpers/index'
import { selectPageDel, deselectPageDel} from '../actions/users'

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

    isDelSelected = () => {
        return this.props.selectedPagesDel.some(pageId => pageId === this.props.page.id)
    }
    
    handleDelSelect = () => {
        if(this.isDelSelected()) this.props.deselectPageDel(this.props.page.id)
        else this.props.selectPageDel(this.props.page.id)
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
            {
                this.props.deleteSelect ?
                <View>
                    <TouchableOpacity
                        onPress={this.handleDelSelect}
                        style={this.isDelSelected() ? styles.selected : styles.deselected}>
                        {
                            this.isDelSelected() ?
                            <Text style={styles.selButtonText}>Selected</Text>
                            :
                            <Text style={styles.deselButtonText}>Select</Text>
                        }
                    </TouchableOpacity>
                </View>
                :
                null
            }
        </View>
    }
}

const mapStateToProps = state => {
    return {
        selectedPagesDel: state.selectedPagesDel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSeqFromPage: page => dispatch(addSeqFromPage(page)),
        selectPageDel: id => dispatch(selectPageDel(id)),
        deselectPageDel: id => dispatch(deselectPageDel(id)),
    }
}

const PageWithRouter = withRouter(Page)

export default connect(mapStateToProps, mapDispatchToProps)(PageWithRouter)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        margin: 10,
        flexDirection: 'row'
    },
    info: {
        width: Dimensions.get('window').width * (3 / 5)
    },
    selected: {
        padding: 15,
        backgroundColor: 'gray',
    },
    deselected: {
        padding: 15,
        backgroundColor: 'white',
    },
    selButtonText: {
        color: 'white',
        textAlign: 'center'
    },
    deselButtonText: {
        textAlign: 'center'
    }
})