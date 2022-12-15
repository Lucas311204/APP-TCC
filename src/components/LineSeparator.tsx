import { View } from 'react-native'

export default function LineSeparator() {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#e5e5e5',
          height: 2,
          width: '100%',
          marginVertical: 16,
        }}
      />
    </View>
  )
}
