'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { useRouter } from 'next/navigation'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// Component Imports
import { z } from 'zod'

import { useQuery } from '@tanstack/react-query'

import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'

import LoadingButton from '@mui/lab/LoadingButton'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type { Role } from '@/types/api/common/Role'
import { getPermisions } from '@/utils/api/permissions/getPermissions'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import ErrorTypography from '@/components/ErrorTypography'

const createRoleSchema = z.object({
  name: z.string().min(1),
  permissions: z.array(z.string()).min(1)
})

type SchemaType = z.infer<typeof createRoleSchema>

const RoleDialog = ({ role, setOpen, open }: Props) => {
  const initialValue: SchemaType = { name: role?.name || '', permissions: role?.permissions?.map(x => x.name) || [] }

  const onClose = () => setOpen(false)

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SchemaType>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: initialValue
  })

  const { data: permissions } = useQuery({
    queryKey: ['All Permissions'],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()

      return await getPermisions(headers)
    }
  })

  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    try {
      const headers = await getServerAuthHeaders()

      const res = await axios.request({
        headers,
        data,
        ...(role
          ? {
              url: api`dashboard/role/${role.id}`,
              method: 'PUT'
            }
          : {
              url: api`dashboard/role`,
              method: 'POST'
            })
      })

      router.refresh()
      onClose()
    } catch (error: any) {
      console.log(error.response)
    }
  })

  useEffect(() => {
    if (!role && open === true) reset(initialValue)
  }, [open, !!role])

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={Boolean(open)}
      onClose={onClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {role ? 'Edit Role' : 'Add Role'}
        <Typography component='span' className='flex flex-col text-center'>
          Set Role Permissions
        </Typography>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent className='overflow-visible flex flex-col gap-6 pbs-0 sm:pli-16'>
          <CustomTextField
            label='Role Name'
            variant='outlined'
            fullWidth
            placeholder='Enter Role Name'
            {...register('name')}
          />
          <ErrorTypography>{errors.name?.message}</ErrorTypography>
          <Typography variant='h5' className='min-is-[225px]'>
            Role Permissions
          </Typography>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <tbody>
                <tr className='border-bs-0'>
                  <th className='pis-0'>
                    <Typography color='text.primary' className='font-medium whitespace-nowrap flex-grow min-is-[225px]'>
                      Administrator Access
                    </Typography>
                  </th>
                  <th className='!text-end pie-0'></th>
                </tr>
                <Controller
                  control={control}
                  name='permissions'
                  render={({ field }) => {
                    const handleSelectPermission = (permissionName: string, checked: boolean) => {
                      if (checked) {
                        field.onChange([...field.value, permissionName])
                      } else {
                        field.onChange(field.value.filter(x => x !== permissionName))
                      }
                    }

                    return (
                      <>
                        {permissions?.map(permission => {
                          return (
                            <tr key={permission.id} className='border-be'>
                              <td className='pis-0'>
                                <Typography
                                  className='font-medium whitespace-nowrap flex-grow min-is-[225px]'
                                  color='text.primary'
                                >
                                  {permission.name}
                                </Typography>
                              </td>
                              <td className='!text-end pie-0'>
                                {
                                  <FormGroup className='flex-row justify-end flex-nowrap gap-6'>
                                    <FormControlLabel
                                      className='mie-0'
                                      control={
                                        <Checkbox
                                          checked={field.value.includes(permission.name)}
                                          onChange={(e, checked) => handleSelectPermission(permission.name, checked)}
                                        />
                                      }
                                      label=''
                                    />
                                  </FormGroup>
                                }
                              </td>
                            </tr>
                          )
                        })}
                      </>
                    )
                  }}
                />
                <ErrorTypography>{errors.permissions?.message}</ErrorTypography>
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <LoadingButton loading={isSubmitting} variant='contained' type='submit'>
            Submit
          </LoadingButton>
          <Button variant='tonal' type='reset' color='secondary' onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  role?: Role
}

export default RoleDialog
