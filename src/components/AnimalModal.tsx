import { useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import type { Dispatch, SetStateAction } from 'react'

type AnimalModalProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  onSubmit: (name: string) => void
}

export default function AnimalModal({ visible, setVisible, onSubmit }: AnimalModalProps) {
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

          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Animal</Text>
          <Text style={{ fontSize: 16, color: '#555' }}>
            Insira o nome do seu animal de estimação
          </Text>

          <TextInput
            autoFocus
            placeholder="Paçoca"
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 8, opacity: !title ? 0.5 : 1 }]}
            onPress={() => onSubmit(title)}
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
    marginTop: 20,
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
