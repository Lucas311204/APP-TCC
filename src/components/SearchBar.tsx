import { View, TextInput, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

type SearchBarProps = {
  searchText: string
  setSearchText: (value: string) => void
}

export default function SearchBar({
  searchText,
  setSearchText,
}: SearchBarProps) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Feather
          name="search"
          size={20}
          color="#777"
          style={{ paddingHorizontal: 12 }}
        />
        <TextInput
          placeholder="O que você está procurando?"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.search}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    padding: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
  },
  search: {
    padding: 8,
    backgroundColor: '#fff',
    flex: 1,
  },
})
