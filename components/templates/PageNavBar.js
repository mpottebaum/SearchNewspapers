import React from 'react'
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'

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
            <View style={styles.column}>
                <View style={styles.container}>
                    <Text
                        style={styles.pageCount}
                    >
                    </Text>
                    <View style={styles.dropdown}>
                        {
                            collectionLoader ?
                            null
                            :
                            <Dropdown
                                value={(selection).toString()}
                                data={dropdownData}
                                fontSize={14}
                                onChangeText={onDropdownChange}
                                itemTextStyle={styles.dropdownText}
                            />
                        }
                    </View>
                    <View style={styles.pageCount}>
                        <Text
                            
                        >
                            of {collection ? collection.length : 'Loading'}
                        </Text>
                    </View>
                </View>
            </View>
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
        backgroundColor: 'rgba(104, 95, 79, 0.5)',
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