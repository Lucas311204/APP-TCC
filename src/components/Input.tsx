import { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import type { TextInputProps } from 'react-native'

type InputProps = {
  iconName: string
  bottomMarginEnabled?: boolean
  bottomMarginSize?: number
} & TextInputProps

export default function Input({
  iconName,
  bottomMarginEnabled,
  bottomMarginSize = 14,
  ...props
}: InputProps) {
  const [hidden, setHidden] = useState(props.secureTextEntry)

  return (
    <View
      style={{
        ...styles.container,
        marginBottom: bottomMarginEnabled ? bottomMarginSize : 0,
      }}
    >
      <TextInput
        underlineColorAndroid="transparent"
        secureTextEntry={hidden}
        style={styles.input}
        {...props}
      />
      <FontAwesome5
        style={styles.icon}
        name={iconName}
        size={24}
        color="black"
      />
      {props.secureTextEntry && (
        <TouchableOpacity onPress={() => setHidden((value) => !value)}>
          <FontAwesome5
            style={styles.iconSec}
            name={hidden ? 'eye' : 'eye-slash'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    padding: 12,
    paddingLeft: 48,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    borderRadius: 8,
  },

  icon: {
    position: 'absolute',
    left: 12,
    top: 14,
  },
  iconSec: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
})
