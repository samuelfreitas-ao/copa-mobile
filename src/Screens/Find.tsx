import { useState } from "react"
import { Heading, useToast, VStack } from "native-base"
import { useNavigation } from '@react-navigation/native'

import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { api } from "../services/api"

export function Find () {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const { navigate } = useNavigation()
  const toast = useToast()

  async function handleJoinPoint () {
    try {
      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      setIsLoading(true)

      await api.post('/polls/join', { code })

      setIsLoading(false)
      setCode('')

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('polls')
    } catch (error) {
      setIsLoading(false)
      console.log(error)

      let title = error.response?.data?.message

      switch (error.response?.data?.message) {
        case 'Poll not found.':
          title = 'Bolão não encontrado.'
          break
        case 'You alread joined this poll.':
          title = 'Já estás participando deste bolão .'
          break
        default:
          title = 'Não foi possível encontrar o bolão';
          break
      }
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign='center'>
          Encontre um bolão através de {'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder='Qual é o código do bolão?'
          value={code}
          onChangeText={setCode}
          autoCapitalize='characters'
        />

        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPoint}
        />
      </VStack>
    </VStack>
  )
}