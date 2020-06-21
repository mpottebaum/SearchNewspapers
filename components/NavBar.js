import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { withRouter } from 'react-router-native'

class NavBar extends React.Component {

    handlePress = path => {
        if(path === '/results' && !this.props.query) {
            this.props.history.push('/')
        } else if(path === '/sequence' && !this.props.selectedResult) {
            this.props.history.push('/')
        } else {
            this.props.history.push(path)
        }
    }

    isDisabled = () => {
        return this.props.user ? false : true
    }

    buttonStyle = path => {
        return path === this.props.location.pathname ? styles.activeButton : styles.inactiveButton
    }

    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => this.handlePress('/')} style={this.buttonStyle('/')}>
                <Text style={styles.itemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('/results')} disabled={this.isDisabled()} style={this.buttonStyle('/results')}>
                <Text style={styles.itemText}>Results</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('/user')} disabled={this.isDisabled()} style={this.buttonStyle('/user')}>
                <Text style={styles.itemText}>Saved</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('/sequence')} disabled={this.isDisabled()} style={this.buttonStyle('/sequence')}>
                <Text style={styles.itemText}>Selected</Text>
            </TouchableOpacity>
        </View> 
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
        query: state.query,
        selectedResult: state.selectedResult,
        user: state.user
    }
}

const NavBarWithRouter = withRouter(NavBar)

export default connect(mapStateToProps)(NavBarWithRouter)

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
        backgroundColor: '#a9b6c9'
    },
    activeButton: {
        // marginLeft: 5,
        // marginRight: 5,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#0061ff'
    },
    itemText: {
        textAlign: 'center'
    }
})