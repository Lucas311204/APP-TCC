import { StyleSheet, Text, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export type AnimalProps = {
  name: string
  vaccines: { name: string; checked: boolean }[]
  onVaccinePress: (index: number, checked: boolean) => void
}

export default function Animal({ name, vaccines, onVaccinePress }: AnimalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      {vaccines.map((vaccine, index) => (
        <View key={index} style={{ paddingVertical: 4 }}>
          <BouncyCheckbox
            isChecked={vaccine.checked}
            text={vaccine.name}
            fillColor="#38a69d"
            onPress={(checked) => onVaccinePress(index, checked)}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 6,
  },
  name: {
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 16,
  },
})
