import * as S from './styles'
import logoImg from '@assets/logo.png'

type PropsHeader = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: PropsHeader) {
  return (
    <S.Container>
      {showBackButton && (
        <>
          <S.BackButton>
            <S.BackIcon />
          </S.BackButton>
        </>
      )}
      <S.Logo source={logoImg} />
    </S.Container>
  )
}
