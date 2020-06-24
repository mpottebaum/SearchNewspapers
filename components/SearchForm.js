import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { getResults } from '../actions/results'
import Link from './Link'
import SubmitButton from './templates/SubmitButton'

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
                <SubmitButton onPress={this.handlePress} text={'Search'} style={{borderRadius: 8}} textStyle={{fontSize: 20}} />
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
    label: {
        textAlign: 'center',
        fontSize: 17
    },
    input: {
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
        height: 40,
        fontSize: 20
    },
    labelContainer: {
        flex: 2,
        width: '95%',
        alignSelf: 'center',
        marginTop: 20
    },
    inputContainer: {
        flex: 1,
        height: 40,
        alignSelf: 'center',
        width: Dimensions.get('window').width * (3 / 4)
    },
    buttonContainer: {
        flex: 5,
        alignSelf: 'center',
    }
})