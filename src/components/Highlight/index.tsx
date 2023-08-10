import * as S from './styles'

type PropsHighliht = {
  title: string
  subtitle: string
}

export function Highlight({ title, subtitle }: PropsHighliht) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Container>
  )
}
