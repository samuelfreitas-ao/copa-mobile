import { useState, useEffect } from "react"
import { HStack, useToast, VStack } from "native-base"
import { useRoute } from '@react-navigation/native'
import { Share } from 'react-native'

import { Header } from "../components/Header"
import { PollPros } from "../components/PollCard"
import { api } from "../services/api"
import { Loading } from "../components/Loading"
import { PollHeader } from "../components/PollHeader"
import { EmptyMyPollList } from "../components/EmptyMyPoolList"
import { Option } from "../components/Option"
import { Guesses } from "../components/Guesses"

interface RouteParams {
  id: string
}

export function Detais () {
  const [isLoading, setIsLoading] = useState(true)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [poll, setPoll] = useState<PollPros>({} as PollPros)

  const toast = useToast()

  const route = useRoute()
  const { id } = route.params as RouteParams

  async function handleShare () {
    await Share.share({
      message: poll.code
    })
  }

  async function fetchPollDetails () {
    try {
      setIsLoading(true)
      const response = await api.get(`/polls/${id}`)

      setPoll(response.data.poll);

    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível carregar bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPollDetails()
  }, [id])

  if (isLoading) return <Loading />

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poll.title}
        showBackButton
        showShareButton
        onShare={handleShare} />
      {
        poll._count?.participants > 0 ?
          <VStack flex={1} px={5}>
            <PollHeader data={poll} />

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={3}>
              <Option
                title="Seus palpites"
                isSelected={optionSelected === 'guesses'}
                onPress={() => setOptionSelected('guesses')}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === 'ranking'}
                onPress={() => setOptionSelected('ranking')}
              />
            </HStack>
            <Guesses pollId={poll.id} code={poll.code} />
          </VStack>
          : <EmptyMyPollList code={poll.code} />
      }
    </VStack>
  )
}