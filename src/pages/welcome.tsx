import { useEffect } from 'react'
import { useId } from '../hooks'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import * as Animatable from 'react-native-animatable'

export default function Welcome({ navigation }) {
  const uid = useId()

  useEffect(() => {
    if (!!uid) navigation.navigate('Main')
  }, [uid])

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../static/gato.png')}
          style={{ width: '100%', opacity: 0.65 }}
        />
      </View>
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.title}>Bem vindo ao PEAT!</Text>
        <Text style={styles.subtitle}>
          Vou te ajudar a cuidar do seu animalzinho!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  containerForm: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF',
  },
  subtitle: {
    color: '#DCDCDC',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#38a69d',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
