import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native'
import { addSeqFromPage } from '../../actions/sequences'
import { convertDate, titleize } from '../../helpers/index'
import { selectPageDel, deselectPageDel} from '../../actions/users'

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
        return <View>
            <View style={styles.page}>
                <TouchableOpacity onPress={this.handlePress} style={styles.info}>
                    <Text style={styles.boldText}>{page.name}</Text>
                    <Text style={styles.grayText}>{convertDate(page.date)} | Page {page.sequence}</Text>
                    <Text style={styles.grayText}>{titleize(page.title_normal)}</Text>
                    <Text style={styles.grayText}>{page.city}, {page.state}</Text>
                </TouchableOpacity>
                {
                    this.props.deleteSelect ?
                    <View style={styles.selectContainer}>
                        <TouchableOpacity
                            onPress={this.handleDelSelect}
                            style={styles.selectButton}>
                            {
                                this.isDelSelected() ?
                                <Image style={styles.image} source={require('../../assets/icons/check.png')}/>
                                :
                                <Image style={styles.image} source={require('../../assets/icons/delSelect.png')}/>
                            }
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
            </View>
            <View style={styles.separator} />
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
        flex: 3,
        width: Dimensions.get('window').width * (3 / 5)
    },
    selectButton: {
        padding: 15,
        width: 80,
        height: 80,
    },
    // deselected: {
    //     padding: 15,
    //     width: 80,
    //     height: 80,
    // },
    selButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    deselButtonText: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#000",
    },
    grayText: {
        color: '#6b6b6b',
        fontSize: 17
    },
    boldText: {
        // fontWeight: 'bold',
        fontSize: 17
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    selectContainer: {
        alignSelf: 'center'
    }
})