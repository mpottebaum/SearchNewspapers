import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { getResults } from '../actions/results'
import Link from './Link'

class SearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: props.query
        }
    }


    handleChange = e => {
        this.setState({
            query: e.nativeEvent.text
        })
    }

    handlePress = () => {
        this.props.getResults(this.state.query, 1)
        this.props.history.push('/results')
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.labelContainer}>                
                <Text style={styles.label}>
                    Search the pages of historic American newspapers stored in Chronicling America's database
                </Text>
                <Link text={'About Chronicling America'} url={'https://chroniclingamerica.loc.gov/about/'}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput onChange={this.handleChange} value={this.state.query} style={styles.input} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.handlePress} style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        query: state.query
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getResults: (query, page) => dispatch(getResults(query, page))
    }
}

const SearchFormWithRouter = withRouter(SearchForm)

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormWithRouter)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        textAlign: 'center'
    },
    label: {
        textAlign: 'center',
        fontSize: 17
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        fontSize: 20
    },
    button: {
        padding: 20,
        backgroundColor: 'gray',
    },
    labelContainer: {
        flex: 2,
        width: '95%',
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height / 3
    },
    inputContainer: {
        flex: 1,
        height: 40,
        alignSelf: 'center',
        width: Dimensions.get('window').width * (3 / 4)
    },
    buttonContainer: {
        flex: 7,
        alignSelf: 'center',
    }
})