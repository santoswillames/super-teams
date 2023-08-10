import { TouchableOpacityProps } from 'react-native'
import * as S from './styles'

type PropsGroupCard = TouchableOpacityProps & {
  title: string
}

export function GroupCard({ title, ...rest }: PropsGroupCard) {
  return (
    <S.Container {...rest}>
      <S.Icon />
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
