import React from 'react'
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

// props = {
//     onPress: this.handlePress,
//     onDropdownChange: this.handleChange,
//     dropdownData: this.pageData(),
//     collection: this.props.edition.pages.map(page.sequence),
//     selection: this.props.editionPage.sequence,
//     collectionLoader: this.props.editionLoader,
//     
// }

const PageNavBar = ({
    onPress,
    onDropdownChange,
    dropdownData,
    collection,
    selection,
    collectionLoader
}) => {

    return <View style={styles.container}>
            <View style={styles.column}>
                {
                    collection && selection > 1 ?
                    <TouchableOpacity onPress={() => onPress(selection - 1)} style={styles.navButton}>
                        <Text style={styles.navText}>Previous</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
                <TouchableOpacity style={styles.countContainer}>
                    <View style={styles.dropdownView}>
                        {
                            collectionLoader ?
                            null
                            :
                            <RNPickerSelect
                                value={selection.toString()}
                                items={dropdownData}
                                onValueChange={onDropdownChange}
                                // style={{iconContainer: {textAlign: 'center'}}}
                                placeholder={{}}
                            />
                        }
                    </View>
                    <View style={styles.pageCount}>
                        <Text>
                            of {collection ? collection.length : 'Loading'}
                        </Text>
                    </View>
                </TouchableOpacity>
            <View style={styles.column}>
                {
                    collection && selection < collection.length ?
                    <TouchableOpacity onPress={() => onPress(selection + 1)} style={styles.navButton}>
                        <Text style={styles.navText}>Next</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        </View>

}

export default PageNavBar

const styles = StyleSheet.create({

    // pdf: {
    //     width: Dimensions.get('window').width,
    //     height: '100%',
    // },
    // page: {
    //     flex: 1
    // },
    newspaper: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    countContainer: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignContent: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center'
    },
    navText: {
        textAlign: 'center'
    },
    navButton: {
        width: Dimensions.get('window').width / 3,
        padding: 20,
        backgroundColor: 'rgba(104, 95, 79, 0.5)',
        justifyContent: 'center',
        alignContent: 'center',
    },
    dropdownContainer: {
        height: 30,
        flex: 1
        // textAlign: 'center'
    },
    dropdownView: {
        // alignSelf: 'flex-start'
        paddingRight: 5
        // justifyContent: 'flex-end',
        // alignContent: 'flex-end',
    },
    dropdown: {
        fontSize: 20,
        backgroundColor: 'white',
        textAlign: 'center'
    },
    dropdownText: {
        textAlign: 'center'
    },
    pageCount: {
        // flex: 1,
        // alignSelf: 'center',
        // textAlign: 'center'
        // justifyContent: 'flex-end',
        // marginBottom: 15
    }
})