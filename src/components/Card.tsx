import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import type { Shop } from '../services/api/index.d'

type CardProps = {
  data: Shop
  onPress: () => void
}

export default function Card({ data, onPress }: CardProps) {
  const thumbnailImageUrl = data.nome_imagens?.length > 0 ? data.nome_imagens[0] : ''

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View>
        <Image style={styles.image} source={{ uri: thumbnailImageUrl }} resizeMode="cover" />
        <Text style={styles.name} numberOfLines={1}>
          {data.nome}
        </Text>
        <Text style={styles.subtitle}>
          {data.logradouro}, {data.numero} - {data.bairro}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#71717a',
  },
})
