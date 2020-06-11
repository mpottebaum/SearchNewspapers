import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Pdf from 'react-native-pdf'
import { Dropdown } from 'react-native-material-dropdown'
import { addEditionPage } from '../actions/editions'

class Edition extends React.Component {

    // componentDidUpdate() {
    //     if(this.props.edition && this.props.edition)
    // }

    handlePress = (sequence, edition) => {
        this.props.addEditionPage(sequence, edition)
    }

    handleChange = (value, index, data) => {
        this.props.addEditionPage(value, this.props.edition)
    }

    pageData = () => {
        return this.props.edition.pages.map(page => {
            return {
                value: page.sequence
            }
        })
    }

    render() {
        console.log(this.props.edition)
        return <View style={styles.container}>
            <View style={styles.navBar}>
                <View style={styles.column}>
                    {
                        this.props.edition && this.props.editionPage.sequence > 1 ?
                        <TouchableOpacity onPress={() => this.handlePress(this.props.editionPage.sequence - 1, this.props.edition)} style={styles.navButton}>
                            <Text style={styles.navText}>Previous</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
                <View style={styles.column}>
                    <View style={styles.navBar}>
                        <Text
                            style={styles.pageCount}
                        >
                        </Text>
                        <View style={styles.dropdown}>
                            {
                                this.props.editionLoader ?
                                null
                                :
                                <Dropdown
                                    value={(this.props.editionPage.sequence).toString()}
                                    data={this.pageData()}
                                    fontSize={14}
                                    onChangeText={this.handleChange}
                                    itemTextStyle={styles.dropdownText}
                                />
                            }
                        </View>
                        <View style={styles.pageCount}>
                            <Text
                                
                            >
                                of {this.props.edition ? this.props.edition.pages.length : 'Loading'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.column}>
                    {
                        this.props.edition && this.props.editionPage.sequence < this.props.edition.pages.length ?
                        <TouchableOpacity onPress={() => this.handlePress(this.props.editionPage.sequence + 1, this.props.edition)} style={styles.navButton}>
                            <Text style={styles.navText}>Next</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>

            </View>
            <SafeAreaView style={{flex: 12}}>
                {
                    this.props.editionLoader ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <Pdf
                            source={{uri: this.props.editionPage.pdf, cache: true}}
                            style={styles.pdf}
                            minScale={1.0}
                            maxScale={11.0}
                        />
                }
                
            </SafeAreaView>
        </View>
    }
}

const mapStateToProps = state => {
    return {
        edition: state.edition,
        editionPage: state.editionPage,
        editionLoader: state.editionLoader,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEditionPage: (sequence, edition) => dispatch(addEditionPage(sequence, edition))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edition)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    page: {
        flex: 1
    },
    newspaper: {
        flex: 1
    },
    navBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    navText: {
        textAlign: 'center'
    },
    navButton: {
        width: Dimensions.get('window').width / 3,
        padding: 20,
        backgroundColor: '#a9b6c9',
        justifyContent: 'center',
        alignContent: 'center',
    },
    dropdown: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    dropdownText: {
        textAlign: 'center'
    },
    pageCount: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15
    }
})