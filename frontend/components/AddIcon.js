import { Pressable, View  , StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const AddIcon = ({onPress}) => {
    
  return (
    <Pressable onPress={onPress}>
       <View style={styles.buttonContainer}>
            <Ionicons name='add' size={24}  color="white" />
      </View>
    </Pressable>
  )
}

export default AddIcon;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2,
    },
    pressed: {
        opacity: 0.75
    }
});