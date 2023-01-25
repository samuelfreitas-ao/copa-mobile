import { NativeBaseProvider, StatusBar } from 'native-base';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { Find } from './src/Screens/Find';
import { AuthContextProvider } from './src/context/AuthContext';

export default function App () {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <Find /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
