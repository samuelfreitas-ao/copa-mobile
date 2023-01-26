import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { New } from '../Screens/New'
import { Poll } from '../Screens/Poll'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes () {
  return (
    <Navigator>
      <Screen name='new' component={New} />
      <Screen name='polls' component={Poll} />
    </Navigator>
  )
}