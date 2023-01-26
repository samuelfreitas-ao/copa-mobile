import { useCallback, useState } from 'react'
import { FlatList, Icon, useToast, VStack } from "native-base";
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { Loading } from '../components/Loading';
import { PollCard, PollPros } from '../components/PollCard';
import { EmptyPollList } from '../components/EmptyPoolList';

export function Poll () {
  const [isLoading, setIsLoading] = useState(true)
  const [polls, setPolls] = useState<PollPros[]>([])

  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchPolls () {
    try {
      setIsLoading(true)
      const response = await api.get('/polls')
      setPolls(response.data.polls);

    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPolls()
  }, []))


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

      {isLoading ?
        <Loading /> :
        <FlatList
          data={polls}
          keyExtractor={poll => poll.id}
          renderItem={({ item }) => <PollCard data={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyPollList />}
          _contentContainerStyle={{ pb: 10 }}
          px={5}
        />
      }
    </VStack>
  )
}