import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { getShops } from '../services/api'

import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import BackButton from '../components/BackButton'
import FullLoadingScreen from '../components/FullLoadingScreen'
import { MaterialIcons } from '@expo/vector-icons'

import type { MapScreenProps } from './types'
import type { Region } from 'react-native-maps'
import type { MapEvent } from 'react-native-maps'
import type { Shop } from '../services/api.types'

type MarkerPressEvent = MapEvent<{ action: 'marker-press'; id: string }>

export default function Map({ navigation }: MapScreenProps) {
  const [shops, setShops] = useState<Shop[]>()
  const [region, setRegion] = useState<Region>()
  const [userPosition, setUserPosition] = useState({ longitude: 0, latitude: 0 })

  useEffect(() => {
    async function fetchShops() {
      const shopsResponse = await getShops()
      setShops(shopsResponse)
    }

    async function setupLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      console.log(`permission status: ${status}`)

      if (status !== 'granted') {
        console.log('location denied')
        navigation.goBack()
        navigation.navigate
        return
      }

      let location = await Location.getCurrentPositionAsync({})

      setUserPosition({ ...location.coords })
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      })
    }

    setupLocation()
    fetchShops()
  }, [])

  function handleMarkerPress(e: MarkerPressEvent) {
    console.log(e)
  }

  if (!region || !shops)
    return (
      <FullLoadingScreen
        backButtonVisible={true}
        onBackButtonPress={() => navigation.navigate('Main')}
      />
    )

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <MapView
        initialRegion={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        style={styles.map}
      >
        <Marker coordinate={userPosition} onPress={(e) => handleMarkerPress(e)}>
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: '#0d9488',
              borderWidth: 2,
              borderColor: '#0f766e',
              borderRadius: 16,
            }}
          />
        </Marker>
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            pinColor="#38a69d"
            coordinate={{ latitude: shop.coordenadas.lat, longitude: shop.coordenadas.long }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  backgroundColor: '#FFF',
                  padding: 4,
                  borderRadius: 4,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {shop.nome}
              </Text>
              <View
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: '#38A69D',
                  borderRadius: 30 / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialIcons name="pets" size={18} color="#FFF" />
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
      {/* <Text>Longitude: {region.longitude}</Text>
      <Text>Latitude: {region.latitude}</Text>
      <Text>Longitude Delta: {region.longitudeDelta}</Text>
      <Text>Latitude Delta: {region.latitudeDelta}</Text> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backGroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
})
