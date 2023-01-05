import { NativeBaseProvider, StatusBar } from 'native-base';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { Signin } from './src/Screens/Signin';

export default function App () {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Signin /> : <Loading />}
    </NativeBaseProvider>
  );
}
