import { Pressable } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const DeleteIcon = ({onPress}) => {
  return (
    <Pressable onPress={onPress}>
            <Ionicons name='md-trash-outline' size={24}  color="red" />
    </Pressable>
  )
}

export default DeleteIcon;