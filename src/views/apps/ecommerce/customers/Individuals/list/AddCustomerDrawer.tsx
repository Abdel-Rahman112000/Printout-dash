// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'

// Type Imports
import { toast } from 'react-toastify'

import { useQueryClient } from '@tanstack/react-query'

import type { Customer } from '@/types/apps/ecommerceTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import useCreateNewClient from '@/utils/api/Customers/postNewCustomers'
import { getClientAuthHeaders } from '@/utils/headers/authClient'

type Props = {
  open: boolean
  handleClose: () => void
  setData: (data: Customer[]) => void
  customerData?: Customer[]
}

export type FormValidateType = {
  user_name: string
  email: string
  company_name: string
  commerce_registration: string
  password: string
  tax: string
  phone: string
  type: string
}

type FormNonValidateType = {
  phone: string
  company_name: string
  commerce_registration: string
  password: string
  tax: string
}

const initialData: FormNonValidateType = {
  phone: '',
  company_name: '',
  commerce_registration: '',
  password: '',
  tax: ''
}

const AddCustomerDrawer = (props: Props) => {
  const { open, handleClose } = props

  const [formData, setFormData] = useState<FormNonValidateType>(initialData)

  const {
    control,
    reset: resetForm,
    handleSubmit,

    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      user_name: '',
      email: '',
      phone: '',
      company_name: '',
      commerce_registration: '',
      password: '',
      tax: ''
    }
  })

  const { mutate: mutateCreateNewClient } = useCreateNewClient()
  const queryClient = useQueryClient()

  const onSubmit = async (data: FormValidateType) => {
    const headers = await getClientAuthHeaders()

    const createNewClients = {
      user_name: data?.user_name,
      email: data?.email,
      phone: data?.phone,
      company_name: data?.company_name,
      commerce_registration: data?.commerce_registration,
      password: data?.password,
      type: data?.type,
      tax: data?.tax
    }

    mutateCreateNewClient(
      { headers: headers, payload: createNewClients },
      {
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({ queryKey: ['clients'] })
          resetForm()
          setFormData(initialData)
          handleClose()
          // window.location.reload()
          toast.success(res?.message || 'Customer added successfully')
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || 'Something went wrong')
        }
      }
    )
  }

  const handleReset = () => {
    handleClose()
    resetForm()
    setFormData(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Add a Customer</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
        <div className='p-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <Typography color='text.primary' className='font-medium'>
              Basic Information
            </Typography>

            <Controller
              name='user_name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Name'
                  placeholder='John Doe'
                  {...(errors.user_name && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='johndoe@gmail.com'
                  {...(errors.email && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />

            <Controller
              name='phone'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Phone'
                  placeholder='+(123) 456-7890'
                  {...(errors.phone && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />

            <Controller
              name='company_name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Company Name'
                  placeholder='Tech Inc.'
                  {...(errors.company_name && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='commerce_registration'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Commerce Registration'
                  placeholder='CR123456'
                  {...(errors.commerce_registration && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Password'
                  placeholder='******'
                  type='password'
                  {...(errors.password && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />

            <Controller
              name='type'
              control={control}
              defaultValue='individual'
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Type'
                  placeholder='individual'
                  InputProps={{
                    readOnly: true
                  }}
                />
              )}
            />
            <Controller
              name='tax'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Tax'
                  placeholder='TAX987654'
                  {...(errors.tax && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />

            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit'>
                Add
              </Button>
              <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
                Discard
              </Button>
            </div>
          </form>
        </div>
      </PerfectScrollbar>
    </Drawer>
  )
}

export default AddCustomerDrawer
