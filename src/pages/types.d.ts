import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { Servico } from '../services/api.types'

export type ParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  Main: undefined
  Shop: { id: string }
  Appointment: { id: string, servicos: Servico[], estabelecimentoId: string }
  Map: undefined
}

export type ShopScreenProps = NativeStackScreenProps<ParamList, 'Shop'>
export type MapScreenProps = NativeStackScreenProps<ParamList, 'Map'>
export type AppointmentScreenProps = NativeStackScreenProps<
  ParamList,
  'Appointment'
>
