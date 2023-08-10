import * as S from './styles'

type PropsListEmpty = {
  message: string
}

export function ListEmpty({ message }: PropsListEmpty) {
  return (
    <S.Container>
      <S.Message>{message}</S.Message>
    </S.Container>
  )
}
