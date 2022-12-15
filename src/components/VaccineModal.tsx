import { useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

import type { Dispatch, SetStateAction } from 'react'

type VaccineModalProps = {
  animals: string[]
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  onSubmit: (index: number, title: string) => void
}

export default function VaccineModal({
  animals,
  visible,
  setVisible,
  onSubmit,
}: VaccineModalProps) {
  const [animalIndex, setAnimalIndex] = useState(0)
  const [title, setTitle] = useState('')

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVisible(false)}
            activeOpacity={0.5}
          >
            <MaterialIcons name="close" size={32} color="#000" />
          </TouchableOpacity>

          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Vacina</Text>
          <Text style={{ fontSize: 16, color: '#555' }}>
            Selecione o animal e insira o título da vacina
          </Text>

          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#CCC',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 10,
            }}
          >
            <Picker selectedValue={animalIndex} onValueChange={(value) => setAnimalIndex(value)}>
              {animals.map((animal, index) => (
                <Picker.Item key={index} label={animal} value={index} />
              ))}
            </Picker>
          </View>

          <TextInput
            autoFocus
            placeholder="Vacina da Leishmaniose"
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 8, opacity: !title ? 0.5 : 1 }]}
            onPress={() => onSubmit(animalIndex, title)}
            activeOpacity={0.5}
            disabled={!title}
          >
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
  container: {
    backgroundColor: '#FFF',
    padding: 26,
    width: '100%',
    borderRadius: 10,
  },
  input: {
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
  },
  closeButton: { alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' },
  button: {
    backgroundColor: '#38a69d',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
})
