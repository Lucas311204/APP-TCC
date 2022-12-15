import { useMemo, useState } from 'react'
import { post } from '../services/api'

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import dayjs from 'dayjs'

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'

import type { AppointmentScreenProps } from './types'
import type { Servico } from '../services/api/index.d'
import { useCurrency, useId } from '../hooks'

const currentDay = new Date()

export default function Appointment({ navigation, route }: AppointmentScreenProps) {
  const token = useId()
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<Date>()

  const { id, estabelecimentoId, servicos: services } = route.params
  const [servicesIds, setServicesIds] = useState([id])

  const chosenServices = useMemo(
    () => services.filter((item) => servicesIds.indexOf(item.id) !== -1),
    [servicesIds]
  )
  const notChosenServices = useMemo(
    () => services.filter((item) => servicesIds.indexOf(item.id) === -1),
    [servicesIds]
  )

  function setDatetime(event: DateTimePickerEvent, value: Date, type: 'date' | 'time') {
    if (event.type == 'set' && type == 'date') {
      setDate(value)
    } else if (event.type == 'set' && type == 'time') {
      setTime(value)
    }
  }

  function showCalendar(type: 'date' | 'time') {
    DateTimePickerAndroid.open({
      minimumDate: currentDay,
      value: currentDay,
      mode: type,
      onChange: (event, date) => setDatetime(event, date, type),
    })
  }

  function getTotalToPay() {
    const initialValue = 0
    return chosenServices.reduce((lastValue, service) => lastValue + service.preco, initialValue)
  }

  function addService(itemId: string) {
    setServicesIds([...servicesIds, itemId])
  }

  function removeService(itemId: string) {
    const servicesWithoutThat = servicesIds.filter((info) => info != itemId)
    setServicesIds(servicesWithoutThat)
  }

  function getTimestamp() {
    const stringDate = `${dayjs(date).format('YYYY-MM-DD')}T${dayjs(time).format('HH:mm')}:00.000Z`
    return dayjs(stringDate).valueOf()
  }

  async function setAppointment() {
    const timestamp = getTimestamp()

    await post(
      `estabelecimento/${estabelecimentoId}/reserva`,
      { Authorization: token },
      {
        data: {
          data_horario: timestamp,
          servicos: servicesIds,
        },
      }
    )
    navigation.navigate('Main')
  }

  return (
    <View>
      <View style={styles.container}>
        <>
          <Text style={styles.servicesTitle}>Horário</Text>
          <View style={styles.timeContainer}>
            <TouchableOpacity onPress={() => showCalendar('date')}>
              <View style={styles.dateBtn}>
                <FontAwesome5 name={'calendar'} size={22} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 7 }}>
                  {dayjs(date).format('DD/MM/YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showCalendar('time')}>
              <View style={styles.dateBtn}>
                <FontAwesome5 name={'clock'} size={22} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 7 }}>{dayjs(time).format('HH:mm')}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.servicesTitle}>Serviços</Text>
          <FlatList
            style={styles.listService}
            data={chosenServices}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }}></View>}
            renderItem={({ item }) => (
              <ServiceToManipulate
                iconName="close"
                iconColor="#ef4444"
                btnManipulation={removeService}
                item={item}
              />
            )}
            showsVerticalScrollIndicator={false}
          />

          {notChosenServices.length > 0 && (
            <>
              <Text style={styles.servicesTitle}>Adicionar mais serviços</Text>
              <FlatList
                style={styles.listService}
                data={notChosenServices}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }}></View>}
                renderItem={({ item }) => (
                  <ServiceToManipulate
                    iconName="add"
                    iconColor="#38A69D"
                    btnManipulation={addService}
                    item={item}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </>

        <View
          style={{
            backgroundColor: '#FFF',
            borderColor: '#DEDEDE',
            borderWidth: 1,
            padding: 16,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 14,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{useCurrency(getTotalToPay())}</Text>
          </View>

          <TouchableOpacity
            onPress={setAppointment}
            style={{
              width: '50%',
            }}
          >
            <View
              style={{
                backgroundColor: '#38A69D',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                Reservar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

type ServiceToManipulateProps = {
  iconName: 'close' | 'add'
  iconColor: string
  item: Servico
  btnManipulation: (x: string) => void
}

function ServiceToManipulate({
  iconName,
  iconColor,
  item,
  btnManipulation,
}: ServiceToManipulateProps) {
  const priceBrl = useCurrency(item.preco)

  return (
    <View
      style={{
        backgroundColor: '#FFF',
        paddingHorizontal: 14,
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <View>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.nome}</Text>
        <Text style={{ fontSize: 16, color: '#888' }}>{priceBrl}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.5} onPress={() => btnManipulation(item.id)}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 6,
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name={iconName} size={20} color={iconColor} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 12,
    justifyContent: 'space-between',
  },
  servicesTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 18,
  },
  dateBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  listService: {
    width: '100%',
    height: 200,
  },
  timeContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
})
