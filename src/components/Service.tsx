import { useCurrency } from '../hooks'
import { Text, TouchableOpacity, View } from 'react-native'
import type { Servico } from '../services/api.types'

type ServiceProps = { data: Servico; estabelecimentoServicos: Servico[]; estabelecimentoId: string ; onAppointmentPress: (id: string, estabelecimentoServicos: Servico[], estabelecimentoId: string) => void}

export default function Service({ data, onAppointmentPress, estabelecimentoServicos, estabelecimentoId }: ServiceProps) {
  const priceBrl = useCurrency(data.preco)

  return (
    <View
      style={{
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
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{data.nome}</Text>
        <Text style={{ fontSize: 16, color: '#888' }}>{priceBrl}</Text>
      </View>
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onAppointmentPress(data.id, estabelecimentoServicos, estabelecimentoId)}
        >
          <View
            style={{
              backgroundColor: '#38A69D',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>
              Reservar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
