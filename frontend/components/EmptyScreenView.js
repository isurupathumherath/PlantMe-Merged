import React from 'react'
import { Text, View ,StyleSheet} from 'react-native'

const EmptyScreenView = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}> No Plants Were Added To This Category !!! </Text>
    </View>
  )
}

export default EmptyScreenView;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#87CEEB',
        padding: 10,
        margin: 4,
        borderRadius: 8,
        marginBottom: 400,

    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        color: 'red',
        textAlign: 'center',
    }
});