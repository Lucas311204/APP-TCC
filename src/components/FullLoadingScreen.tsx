import { ActivityIndicator, View } from 'react-native'
import BackButton from './BackButton'

type FullLoadingScreenProps = {
  backButtonVisible?: boolean
  onBackButtonPress?: () => void
}

export default function FullLoadingScreen({
  backButtonVisible = false,
  onBackButtonPress,
}: FullLoadingScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {backButtonVisible && <BackButton onPress={onBackButtonPress} />}
      <ActivityIndicator size="large" color="#38A69D" />
    </View>
  )
}
