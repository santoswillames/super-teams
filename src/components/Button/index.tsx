import { TouchableOpacityProps } from 'react-native'
import * as S from './styles'

type Props = TouchableOpacityProps & {
  title: string
  type?: S.ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <S.Button type={type} {...rest}>
      <S.Text>{title}</S.Text>
    </S.Button>
  )
}
