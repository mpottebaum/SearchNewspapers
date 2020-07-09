import React, { useCallback} from 'react'
import { StyleSheet, Text, TouchableOpacity, Linking} from 'react-native'

const Link = ({ url, text }) => {

    const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);    
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url])

  return <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
}

export default Link

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        textAlign: 'center'
    },
    button: {
        padding: 5,
    }
})