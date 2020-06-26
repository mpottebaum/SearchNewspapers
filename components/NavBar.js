import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { withRouter } from 'react-router-native'
import { navs } from '../constants/navBar'
import { removeTitle } from '../actions/titles'

class NavBar extends React.Component {

    handlePress = path => {
        if(path === '/results' && !this.props.query) this.props.history.push('/')
        if(path === '/sequence' && this.props.selectedTitle) {
                this.props.removeTitle()
                this.props.history.push(path)
        }
        if(path === '/sequence' && !this.props.selectedResult) this.props.history.push('/')
        
        else {
            this.props.history.push(path)
        }
    }

    isDisabled = path => {
        if(path === '/') return false
        else return this.props.user ? false : true
    }

    buttonStyle = path => {
        return path === this.props.location.pathname ? styles.activeButton : styles.inactiveButton
    }

    selectNav = () => {
        switch(this.props.location.pathname) {
            case '/edition':
                return this.props.selectedTitle ? 'title' : 'edition'
            case '/sequence':
                if(this.props.selectedTitle) return 'title'
                else if(this.props.edition) return 'edition'
                else return 'main'
            case '/title':
             return 'title'
            case '/about':
             return 'title'
            default:
                return 'main'
        }
    }

    renderButtons = () => {
        const nav = this.selectNav()
        return navs[nav].map(button => {
            return <TouchableOpacity
                key={button.text}
                onPress={() => this.handlePress(button.path)}
                disabled={this.isDisabled(button.path)}
                style={this.buttonStyle(button.path)}
            >
                <Text style={styles.itemText}>{button.text}</Text>
            </TouchableOpacity>
        })
    }

    render() {
        // console.log(this.props.location.pathname)
        return <View style={styles.container}>
            {this.renderButtons()}
        </View> 
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        query: state.query,
        selectedResult: state.selectedResult,
        user: state.user,
        edition: state.edition,
        selectedTitle: state.selectedTitle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeTitle: () => dispatch(removeTitle())
    }
}

const NavBarWithRouter = withRouter(NavBar)

export default connect(mapStateToProps, mapDispatchToProps)(NavBarWithRouter)

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center'
    },
    inactiveButton: {
        // marginLeft: 5,
        // marginRight: 5,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: 'rgba(116, 132, 108, .6)'
    },
    activeButton: {
        // marginLeft: 5,
        // marginRight: 5,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: 'rgb(116, 132, 108)'
    },
    itemText: {
        textAlign: 'center'
    }
})