import { useState, useEffect, useRef, useCallback } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import * as S from './styles'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('time React')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trimEnd().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar',
      )
    }

    const newPlayer = {
      name: newPlayerName.trim(),
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adiconar uma nova pessoa.')
      }
    }
  }

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado',
      )
    }
  }, [group, team])

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [fetchPlayersByTeam])

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['time React', 'time vue']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <S.NumberOfTeams>{players.length}</S.NumberOfTeams>
      </S.HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover Turma" type="SECONDARY" />
    </S.Container>
  )
}
