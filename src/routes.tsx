import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Login from './pages/login'
import Welcome from './pages/welcome'
import Register from './pages/register'

import Main from './pages/main'
import Shop from './pages/shop'
import Appointment from './pages/appointment'
import Map from './pages/map'

import type { ParamList } from './pages/types'

const Stack = createNativeStackNavigator<ParamList>()

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={{ title: 'Reservar', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
