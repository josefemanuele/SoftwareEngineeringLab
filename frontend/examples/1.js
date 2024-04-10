import { AppRegistry, Text } from 'react-native';
import { PaperProvider, Button } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={HomeComponent} />
          <Tab.Screen name='Settings' component={SettingsComponent} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function HomeComponent() {
  return (
    <Text>
      Home
    </Text>
  )
}

function SettingsComponent() {
  return (
    <Text>
      Settings
    </Text>
  )
}

AppRegistry.registerComponent('Prenotalo', () => App)
