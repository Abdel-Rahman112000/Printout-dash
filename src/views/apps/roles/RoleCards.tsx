'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import type { TypographyProps } from '@mui/material/Typography'
import type { CardProps } from '@mui/material/Card'

// Component Imports
import { Chip, ListItem, ListItemText, MenuItem, MenuList } from '@mui/material'

import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import Link from '@components/Link'
import type { WithRoles } from '.'
import RoleDialog from './AddRoleDialog'

const RoleCards = ({ roles }: WithRoles) => {
  // Vars
  const typographyProps: TypographyProps = {
    children: 'Edit Role',
    component: Link,
    color: 'primary',
    onClick: e => e.preventDefault()
  }

  const CardProps: CardProps = {
    className: 'cursor-pointer bs-full',
    children: (
      <Grid container className='bs-full'>
        <Grid item xs={5}>
          <div className='flex items-end justify-center bs-full'>
            <img alt='add-role' src='/images/illustrations/characters/5.png' height={130} />
          </div>
        </Grid>
        <Grid item xs={7}>
          <CardContent>
            <div className='flex flex-col items-end gap-4 text-right'>
              <Button variant='contained' size='small'>
                Add Role
              </Button>
              <Typography>
                Add new role, <br />
                if it doesn&#39;t exist.
              </Typography>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        {roles.map(role => (
          <Grid item xs={12} sm={6} lg={4} key={role.id}>
            <Card sx={{ height: 1 }}>
              <CardContent className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col items-start gap-1'>
                    <Typography variant='h5'>{role.name}</Typography>
                    <OpenDialogOnElementClick
                      element={Typography}
                      elementProps={typographyProps}
                      dialog={RoleDialog}
                      dialogProps={{ role: role }}
                    />
                  </div>
                </div>
              </CardContent>
              {role.permissions && (
                <CardContent>
                  <Typography variant='h6'>Permissions</Typography>
                  <div className='flex flex-wrap gap-2'>
                    {role.permissions.map(permission => (
                      <Chip key={permission.id} variant='tonal' color='primary' label={permission.name} />
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} lg={4}>
          <OpenDialogOnElementClick element={Card} elementProps={CardProps} dialog={RoleDialog} dialogProps={{}} />
        </Grid>
      </Grid>
    </>
  )
}

export default RoleCards
