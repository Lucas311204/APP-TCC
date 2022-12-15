import React, { useState } from 'react'
import firebase from '../services/firebase'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import asyncStorage from '@react-native-async-storage/async-storage'

import Input from '../components/Input'
import { View as AnimatableView } from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

export default function SignIn({ navigation }) {
  const auth = getAuth(firebase)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleSubmit() {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, senha)
      const { uid } = user

      await asyncStorage.setItem('@uid', uid)
      navigation.navigate('Main')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <AntDesign style={styles.iconBack} name="left" size={26} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image
          style={{ width: 240 }}
          source={require('../static/logoLogin.png')}
          resizeMode="contain"
        />
      </View>
      <AnimatableView animation="fadeInUp" style={styles.content}>
        <Input
          iconName="envelope"
          keyboardType="email-address"
          placeholder="Endereço de e-mail"
          onChangeText={(Text) => setEmail(Text)}
          value={email}
          bottomMarginEnabled={true}
        />
        <Input
          iconName="lock"
          placeholder="Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={{ ...styles.button, marginTop: 30, marginBottom: 12 }}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonSecondaryText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </AnimatableView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#93C7C0',
  },
  iconBack: {
    padding: '5%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '15%',
    flex: 1,
  },
  footer: {
    padding: 1,
    width: 400,
  },
  fut: {
    padding: 1,
    width: 400,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: 40,
  },
  button: {
    backgroundColor: '#38a69d',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: '#38a69d',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
