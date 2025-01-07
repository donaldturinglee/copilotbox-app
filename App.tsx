import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AuthStackNavigator } from "./src/navigations/stack/AuthStackNavigator"
import { StartUpScreen } from "@/screens/StartUpScreen"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <StartUpScreen />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  )
}