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

    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => this.handlePress('/')} style={styles.button}>
                <Text style={styles.itemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('/results')} disabled={this.isDisabled()} style={styles.button}>
                <Text style={styles.itemText}>Results</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('/user')} disabled={this.isDisabled()} style={styles.button}>
                <Text style={styles.itemText}>Saved</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('/sequence')} disabled={this.isDisabled()} style={styles.button}>
                <Text style={styles.itemText}>Selected</Text>
            </TouchableOpacity>
            {/* <FlatList
                data={navData}
                renderItem={({ item }) => <TouchableOpacity onPress={() => this.handlePress(item.path)}><Text style={styles.itemText}>{item.text}</Text></TouchableOpacity>}
                keyExtractor={item => item.path}
                horizontal={true}
                contentContainerStyle={{justifyContent: 'center', alignContent: 'center'}}
            /> */}
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
    button: {
        // marginLeft: 5,
        // marginRight: 5,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#a9b6c9'
    },
    itemText: {
        textAlign: 'center'
    }
})