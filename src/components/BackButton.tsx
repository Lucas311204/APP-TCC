import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type BackButtonProps = {
  onPress: () => void
}

export default function BackButton({ onPress }: BackButtonProps) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 14,
        left: 14,
        zIndex: 30,
        borderRadius: 6,
        backgroundColor: '#FFF',
        padding: 8,
        borderWidth: 1,
        borderColor: '#DDD',
      }}
    >
      <TouchableOpacity onPress={() => onPress()}>
        <MaterialIcons name="arrow-back" size={26} color="black" />
      </TouchableOpacity>
    </View>
  )
}
