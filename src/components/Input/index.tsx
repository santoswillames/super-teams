import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import * as S from './styles'

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme()
  return (
    <S.Input ref={inputRef} placeholderTextColor={COLORS.GRAY_300} {...rest} />
  )
}
