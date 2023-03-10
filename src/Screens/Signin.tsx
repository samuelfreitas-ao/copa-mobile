import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function Signin () {
  const { signIn, userIsLoading } = useAuth()

  return (
    <Center flex={1} bgColor="gray.900" p={5}>
      <Logo width={212} height={40} />.

      <Button
        title='ENTRAR COM O GOOGLE'
        leftIcon={<Icon as={Fontisto} name='google' />}
        type='SECONDARY'
        mt={12}
        onPress={signIn}
        isLoading={userIsLoading}
        _loading={{ _spinner: { color: 'white' } }}
      />

      <Text
        color="white"
        textAlign="center"
        mt={4}
      >
        Não utilizamos nenhuma informação além {'\n'}
        do seu email para criação da sua conta.
      </Text>
    </Center>
  )
}