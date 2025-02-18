import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'

function ErrorTypography(props: TypographyProps) {
  return <Typography variant='subtitle2' color={'error'} {...props} />
}

export default ErrorTypography
