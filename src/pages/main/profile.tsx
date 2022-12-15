import { useEffect, useState } from 'react'
import { useId } from '../../hooks'
import { get } from '../../services/api'

import asyncStorage from '@react-native-async-storage/async-storage'

import { signOut, getAuth } from 'firebase/auth'

import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import type { ProfileScreenProps } from './types'
import type { Servico } from '../../services/api/index.d'
import dayjs from 'dayjs'
import FullLoadingScreen from '../../components/FullLoadingScreen'

type ServicoWithDate = Servico & { data_horario: string }

type Appointment = {
  id_usuario: number
  data_horario: string
  servicos: Servico[]
}

type AppointmentsResponse = {
  id_usuario: string
  reservas: Appointment[]
}

export default function Profile({ navigation }: ProfileScreenProps) {
  const auth = getAuth()
  const uid = useId()

  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<ServicoWithDate[]>()

  navigation.addListener('focus', () => {
    fetchAppointments()
  })

  useEffect(() => {
    fetchAppointments()
  }, [uid])

  async function fetchAppointments() {
    setLoading(true)
    if (!uid || uid === '') return

    const appointments = await get<AppointmentsResponse>('usuario/reservas', {
      Authorization: uid,
    })

    const services: ServicoWithDate[] = []
    appointments.reservas.forEach((appointment) => {
      appointment.servicos.forEach((service) =>
        services.push({ ...service, data_horario: appointment.data_horario })
      )
    })

    setServices(services)
    setLoading(false)
  }

  async function handleLogoutPressed() {
    await signOut(auth)
    await asyncStorage.removeItem('@uid')

    navigation.navigate('Welcome')
    console.log('Deslogado')
  }

  if (loading)
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <FullLoadingScreen />
        <TouchableOpacity
          style={{
            backgroundColor: '#FFF',
            padding: 12,
            borderRadius: 8,
            borderColor: '#DDD',
            borderWidth: 1,
          }}
          onPress={handleLogoutPressed}
          activeOpacity={0.8}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="logout" color="#38a69d" size={24} />
            <Text style={{ color: '#38a69d', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
              Desconectar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={services}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 2 }}></View>}
        ListEmptyComponent={() => (
          <View style={{ paddingVertical: 14 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#888', textAlign: 'center' }}>
              Não encontramos reservas em seu perfil...
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <AppointmentPreview title={item.nome} date={parseInt(item.data_horario)} />
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#DDD',
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleLogoutPressed}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="logout" color="#38a69d" size={24} />
          <Text style={{ color: '#38a69d', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
            Desconectar
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

type AppointmentPreviewProps = {
  title: string
  date: number
}

function AppointmentPreview({ title, date }: AppointmentPreviewProps) {
  const dayjsDate = dayjs(date)
  const dateFormatted = dayjsDate.format('DD/MM/YYYY')
  const hourFormatted = `${dayjsDate.hour() + 3}:${dayjsDate.minute()}`

  return (
    <View
      style={{
        backgroundColor: '#FFF',
        padding: 12,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ fontSize: 18 }}>
          {dateFormatted.toString()} - {hourFormatted}
        </Text>
      </View>
    </View>
  )
}
