import { Icon, VStack } from "native-base";
import { Octicons } from '@expo/vector-icons'

import { Header } from "../components/Header";
import { Button } from "../components/Button";

export function Poll () {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" />
      <VStack mt={8} mx={5} alignItems="center">
        <Button
          title="Buscar boão por código"
          leftIcon={<Icon as={Octicons} />}
        />
      </VStack>
    </VStack>
  )
}