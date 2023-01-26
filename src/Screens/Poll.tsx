import { Icon, VStack } from "native-base";
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Header } from "../components/Header";
import { Button } from "../components/Button";

export function Poll () {
  const { navigate } = useNavigation()

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" />
      <VStack mt={8} mx={5} alignItems="center">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>
    </VStack>
  )
}