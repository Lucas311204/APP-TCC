import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type ParamList = {
  Shop: { id: string }
  Map: undefined
  Explore: undefined
  Profile: undefined
  Pet: undefined
  Welcome: undefined
}

export type ExploreScreenProps = BottomTabScreenProps<ParamList, 'Explore'>
export type ProfileScreenProps = BottomTabScreenProps<ParamList, 'Profile'>
export type PetScreenProps = BottomTabScreenProps<ParamList, 'Pet'>
