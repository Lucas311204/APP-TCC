import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Pet from './pet'
import Explore from './explore'
import Profile from './profile'

import { MaterialIcons } from '@expo/vector-icons'

const BottomTab = createBottomTabNavigator()

export default function MainContainer() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#38a69d',
        tabBarStyle: { height: 56 },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 4,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Explore}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={28} color="#000" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pet"
        component={Pet}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="pets" size={28} color="#000" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={28} color="#000" />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
