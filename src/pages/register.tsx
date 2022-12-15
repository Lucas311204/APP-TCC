import { useState } from 'react'
import { createUser } from '../services/api/user'
import asyncStorage from '@react-native-async-storage/async-storage'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native'

import Input from '../components/Input'
import { AntDesign } from '@expo/vector-icons'

export default function Register({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)

    try {
      const uid = await createUser(name, email, password)
      await asyncStorage.setItem('@uid', uid)

      navigation.navigate('Main')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <AntDesign style={styles.iconBack} name="left" size={26} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image
          source={require('../static/logoCadastro.png')}
          style={{ width: 240 }}
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView style={styles.content}>
        <Input
          iconName={'user'}
          placeholder="Nome completo"
          value={name}
          onChangeText={(value) => setName(value)}
          bottomMarginEnabled={true}
        />
        <Input
          iconName={'envelope'}
          keyboardType="email-address"
          placeholder="Endereço de e-mail"
          value={email}
          onChangeText={(value) => setEmail(value)}
          bottomMarginEnabled={true}
        />
        <Input
          iconName={'lock'}
          secureTextEntry
          placeholder="Senha"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            marginTop: 30,
            marginBottom: 12,
            opacity: loading ? 0.5 : 1.0,
          }}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size={28} />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonSecondaryText}>Já tem uma conta? Entre</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38a69d',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 65,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: '1%',
    flex: 1,
  },
  txtHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 45,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
})
