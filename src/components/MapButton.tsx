import { TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type MapButtonProps = {
  onPress: () => void
}

export default function MapButton({ onPress }: MapButtonProps) {
  return (
    <TouchableOpacity
      style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 10 }}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View
        style={{
          padding: 16,
          backgroundColor: '#38a69d',
          borderRadius: 12,
          elevation: 8,
          shadowColor: '#999',
        }}
      >
        <MaterialCommunityIcons color="#FFF" size={32} name="map-search" />
        {/* <Text style={{ color: '#888' }}>Mapa</Text> */}
      </View>
    </TouchableOpacity>
  )
}
