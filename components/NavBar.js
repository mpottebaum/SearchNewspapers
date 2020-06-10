import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { withRouter } from 'react-router-native'

class NavBar extends React.Component {

    handlePress = path => {
        if(this.props.query) {
            this.props.history.push(path)
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => this.handlePress('/')} style={styles.button}>
                <Text style={styles.itemText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('results')} style={styles.button}>
                <Text style={styles.itemText}>Results</Text>
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
        query: state.query
    }
}

const NavBarWithRouter = withRouter(NavBar)

export default connect(mapStateToProps)(NavBarWithRouter)

const navData = [
    {
        path: '/',
        text: 'Search'
    },
    {
        path: '/results',
        text: 'Results'
    }
]

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
        width: Dimensions.get('window').width / navData.length,
        padding: 20,
        backgroundColor: '#a9b6c9'
    },
    itemText: {
        textAlign: 'center'
    }
})