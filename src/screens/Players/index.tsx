import { useState } from 'react'
import { FlatList } from 'react-native'
import * as S from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

export function Players() {
  const [team, setTeam] = useState('time React')
  const [players, setPlayers] = useState([
    'Willames Santos',
    'Jean Carlos',
    'Luan Cesar',
    'Manoel Machado',
  ])

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      <S.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
          showsHorizontalScrollIndicator
          horizontal
        />
        <S.NumbersOfTeams>{players.length}</S.NumbersOfTeams>
      </S.HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => console.log('remove')} />
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
