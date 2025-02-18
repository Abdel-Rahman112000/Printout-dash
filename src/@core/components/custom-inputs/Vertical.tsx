'use client'
// MUI Imports
import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import axios from 'axios'

import type { CustomInputVerticalProps } from './types'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { User } from '@/types/api/common/User'

const Root = styled('div', {
  name: 'MuiCustomInputVertical',
  slot: 'root'
})(({ theme }) => ({
  display: 'flex',
  blockSize: '100%',
  cursor: 'pointer',
  position: 'relative',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexDirection: 'column',
  padding: theme.spacing(4),
  borderRadius: 'var(--mui-shape-borderRadius)',
  border: '1px solid var(--mui-palette-customColors-inputBorder)',
  color: 'var(--mui-palette-text-primary)',
  transition: theme.transitions.create(['border-color'], {
    duration: theme.transitions.duration.shorter
  }),

  '&:hover': {
    borderColor: 'var(--mui-palette-action-active)'
  },
  '&.active': {
    borderColor: 'var(--mui-palette-primary-main)',
    '& > svg, & > i': {
      color: 'var(--mui-palette-primary-main) !important'
    }
  },
  '&.radio-only .MuiRadio-root': {
    marginTop: theme.spacing(-2)
  },
  '&.checkbox-only .MuiCheckbox-root': {
    marginTop: theme.spacing(-2)
  }
}))

const Title = styled(Typography, {
  name: 'MuiCustomInputVertical',
  slot: 'title'
})(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: 'var(--mui-palette-text-primary) !important'
}))

const Content = styled(Typography, {
  name: 'MuiCustomInputVertical',
  slot: 'content'
})(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center'
}))

const RadioInput = styled(Radio, {
  name: 'MuiCustomInputVertical',
  slot: 'input'
})(({ theme }) => ({
  marginBottom: theme.spacing(-2)
}))

const CheckboxInput = styled(Checkbox, {
  name: 'MuiCustomInputVertical',
  slot: 'input'
})(({ theme }) => ({
  marginBottom: theme.spacing(-2)
}))

const CustomInputVertical = (props: CustomInputVerticalProps) => {
  // Props
  const { type, data, name, selected, gridProps, handleChange, color = 'primary', disabled = false } = props

  // handle side effects
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    console.log('breakpoint101')
    isCurrentAdmin()
  }, [])

  async function isCurrentAdmin() {
    const headers = await getClientAuthHeaders()

    const currentUser = await axios.get<Root>(api`dashboard/auth/me`, {
      headers
    })

    setIsAdmin(currentUser.data.data?.user_type == 'admin')
  }

  // Vars
  const { title, value, content, asset } = data

  const renderComponent = () => {
    return (
      <Grid item {...gridProps}>
        <Root
          onClick={() => handleChange(value)}
          className={classnames({
            'radio-only': type === 'radio' && !asset && !title && !content,
            'checkbox-only': type === 'checkbox' && !asset && !title && !content,
            active: type === 'radio' ? selected === value : selected.includes(value)
          })}
        >
          {asset || null}
          {title ? typeof title === 'string' ? <Title>{title}</Title> : title : null}
          {content ? typeof content === 'string' ? <Content>{content}</Content> : content : null}
          {type === 'radio' ? (
            <RadioInput
              disabled={data.title == 'Custom print Type' && !isAdmin}
              name={name}
              color={color}
              value={value}
              onChange={handleChange}
              checked={selected === value}
            />
          ) : (
            <CheckboxInput
              color={color}
              name={`${name}-${value}`}
              checked={selected.includes(value)}
              onChange={() => handleChange(value)}
            />
          )}
        </Root>
      </Grid>
    )
  }

  return data ? renderComponent() : null
}

interface Root {
  status: boolean
  message: string
  data: User
}

export default CustomInputVertical
