import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export type AddButtonProps = {
  onPress: () => void
}

const AddButton = (props: AddButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress} activeOpacity={0.5}>
      <Ionicons name="ios-add" size={24} color="black" />
      <Text style={styles.title}>Adicionar Vacina</Text>
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#D8E9A8',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    color: '#323232',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 5,
  },
})
