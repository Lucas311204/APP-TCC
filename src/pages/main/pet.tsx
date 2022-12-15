import { useEffect, useState, useMemo } from 'react'
import asyncStorage from '@react-native-async-storage/async-storage'

import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native'

import VaccineModal from '../../components/VaccineModal'
import AnimalModal from '../../components/AnimalModal'

import Animal from '../../components/Animal'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

type Vaccine = {
  name: string
  checked: boolean
}

type StorageAnimal = {
  name: string
  vaccines: Vaccine[]
}

export default function Pet() {
  const [animals, setAnimals] = useState<StorageAnimal[]>([])
  const animalsName = useMemo(() => animals.map((item) => item.name), [animals])

  useEffect(() => {
    async function getAnimalsFromStorage() {
      console.log('getAnimalsFromStorage')
      const storageAnimals = await asyncStorage.getItem('@animals')

      if (!storageAnimals) await asyncStorage.setItem('@animals', JSON.stringify(animals))
      else setAnimals(JSON.parse(storageAnimals))
    }

    getAnimalsFromStorage()
  }, [])

  const [animalModalVisible, setAnimalModalVisible] = useState(false)
  const [vaccineModalVisible, setVaccineModalVisible] = useState(false)

  async function onVaccineSubmit(animalIndex: number, name: string) {
    const animal = animals[animalIndex]
    animal.vaccines = [...animal.vaccines, { name, checked: false }]

    const nextAnimals = animals
    nextAnimals[animalIndex] = animal

    setAnimals(nextAnimals)
    setVaccineModalVisible(false)

    await asyncStorage.setItem('@animals', JSON.stringify(nextAnimals))
  }

  async function onAnimalSubmit(name: string) {
    const defaultVaccines: Vaccine[] = [
      { name: 'V8', checked: false },
      { name: 'V10', checked: false },
    ]
    const newAnimals = [...animals, { name, vaccines: defaultVaccines }]

    setAnimals(newAnimals)
    setAnimalModalVisible(false)

    await asyncStorage.setItem('@animals', JSON.stringify(newAnimals))
  }

  async function onVaccineChecked(animalIndex: number, vaccineIndex: number, checked: boolean) {
    const animal = animals[animalIndex]
    animal.vaccines[vaccineIndex].checked = checked

    const nextAnimals = animals
    nextAnimals[animalIndex] = animal

    setAnimals(nextAnimals)
    await asyncStorage.setItem('@animals', JSON.stringify(nextAnimals))
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={animals}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index: animalIndex }) => (
          <Animal
            {...item}
            onVaccinePress={(vaccineIndex, checked) =>
              onVaccineChecked(animalIndex, vaccineIndex, checked)
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={{ padding: 16, paddingVertical: 32 }}>
            <Text style={{ fontSize: 24, fontWeight: '500', color: '#888', textAlign: 'center' }}>
              Você ainda não cadastrou nenhum animal...
            </Text>
          </View>
        }
      />

      <VaccineModal
        animals={animalsName}
        visible={vaccineModalVisible}
        setVisible={setVaccineModalVisible}
        onSubmit={onVaccineSubmit}
      />
      <AnimalModal
        visible={animalModalVisible}
        setVisible={setAnimalModalVisible}
        onSubmit={onAnimalSubmit}
      />

      <TouchableOpacity
        style={[styles.button, { opacity: animals.length <= 0 ? 0.5 : 1 }]}
        disabled={animals.length <= 0}
        activeOpacity={0.5}
        onPress={() => setVaccineModalVisible(true)}
      >
        <MaterialCommunityIcons name="needle" size={24} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Adicionar Vacina</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginTop: 8 }]}
        onPress={() => setAnimalModalVisible(true)}
        activeOpacity={0.5}
      >
        <MaterialIcons name="pets" size={24} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Adicionar Animal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
