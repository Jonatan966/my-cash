import { FC } from 'react'

import { MaskInput } from 'components/Input'

import { AmountInputProps } from './types'

const maskOptions: Record<string, IMask.AnyMaskedOptions> = {
  num: {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    min: 0.01,
    max: 999999999.99,
    padFractionalZeros: true,
    radix: ',',
    mapToRadix: ['.'],
  },
}

export const AmountInput: FC<AmountInputProps> = ({ onChange, value }) => {
  return (
    <MaskInput
      mask="R$ num"
      lazy={false}
      title="Valor"
      inputMode="numeric"
      overwrite="shift"
      value={String(value)}
      onAccept={(_, input) => {
        onChange(Number(input.unmaskedValue))
      }}
      blocks={maskOptions}
    />
  )
}
