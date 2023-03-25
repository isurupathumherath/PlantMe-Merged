import { Pressable } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const UpdateIcon = ({onPress}) => {
  return (
    <Pressable onPress={onPress}>
            <Ionicons name='md-create-outline' size={24} color="green"  />
    </Pressable>
  )
}

export default UpdateIcon;