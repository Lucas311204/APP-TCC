import { useEffect, useState } from 'react'
import { getShop } from '../services/api'

import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import Service from '../components/Service'
import BackButton from '../components/BackButton'
import FullLoadingScreen from '../components/FullLoadingScreen'

import type { EstabelecimentoWithServicos, Servico } from '../services/api/index.d'
import type { ShopScreenProps } from './types'

export default function Shop({ route, navigation }: ShopScreenProps) {
  const { id } = route.params
  const [data, setData] = useState<EstabelecimentoWithServicos>(undefined)

  useEffect(() => {
    async function fetchShop() {
      const shop = await getShop(id)
      setData(shop)
    }

    fetchShop()
  }, [])

  function handleAppointmentPress(id: string, servicos: Servico[], estabelecimentoId: string) {
    console.log(id)
    navigation.navigate('Appointment', { id, servicos, estabelecimentoId })
  }

  if (!data)
    return (
      <FullLoadingScreen
        backButtonVisible={true}
        onBackButtonPress={() => navigation.navigate('Main')}
      />
    )

  return (
    <View>
      <BackButton onPress={() => navigation.goBack()} />
      <Image style={styles.image} source={{ uri: data?.nome_imagens[0] || '' }} />
      <View style={{ padding: 12 }}>
        <Text style={styles.name}>{data.nome}</Text>
        <Text style={styles.address}>
          {data.logradouro}, {data.numero} - {data.bairro}
        </Text>
        <View>
          <Text style={styles.servicesTitle}>Serviços</Text>
          <FlatList
            data={data.servicos}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }}></View>}
            renderItem={({ item }) => (
              <Service
                data={item}
                estabelecimentoServicos={data.servicos}
                estabelecimentoId={data.id}
                onAppointmentPress={handleAppointmentPress}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  address: {
    fontSize: 16,
    color: '#888888',
  },
  servicesTitle: {
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 12,
    fontSize: 18,
  },
})
