import { useEffect, useState } from 'react'
import { getShops } from '../../services/api'

import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Card from '../../components/Card'
import MapButton from '../../components/MapButton'
import SearchBar from '../../components/SearchBar'
import LineSeparator from '../../components/LineSeparator'

import type { Shop } from '../../services/api/index.d'
import type { ExploreScreenProps } from './types'

export default function Home({ navigation }: ExploreScreenProps) {
  const [shops, setShops] = useState<Shop[]>()
  const [filteredShops, setFilteredShops] = useState<Shop[]>([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    async function fetchShops() {
      const shopsResponse = await getShops()
      setShops(shopsResponse)
      setFilteredShops(shopsResponse)
    }

    fetchShops()
  }, [])

  useEffect(() => {
    if (!shops) return

    if (searchText !== '') {
      const filter = shops.filter((item) =>
        item.nome.toLowerCase().includes(searchText.toLowerCase())
      )
      setFilteredShops(filter)
    } else setFilteredShops(shops)
  }, [searchText])

  function handleCardPressed(id: string) {
    navigation.navigate('Shop', { id })
  }

  if (!shops) {
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#38A69D" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <MapButton onPress={() => navigation.navigate('Map')} />
      <View style={{ flex: 1 }}>
        {filteredShops.length > 0 ? (
          <FlatList
            data={filteredShops}
            ItemSeparatorComponent={() => <LineSeparator />}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card data={item} onPress={() => handleCardPressed(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          />
        ) : (
          <View style={{ padding: 16 }}>
            <Text style={{ color: '#888888', fontSize: 18, textAlign: 'center' }}>
              Ops! Não encontramos nada sobre "{searchText}"
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
