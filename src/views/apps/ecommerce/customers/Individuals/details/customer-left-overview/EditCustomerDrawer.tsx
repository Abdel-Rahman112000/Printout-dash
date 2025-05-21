import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

import CustomTextField from '@core/components/mui/TextField'

import type { Customer } from '@/types/apps/ecommerceTypes'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import useUpdateClient from '@/utils/api/Customers/updateCustomers'
// Assuming you have an update API hook like this (you need to implement this):
// import useUpdateClient from '@/utils/api/Customers/updateCustomer'

type Props = {
  open: boolean
  handleClose: () => void
  //   setData: (data: Customer[]) => void
  customerData?: Customer // single customer, not array
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

const EditCustomerDrawer = (props: Props) => {
  const { open, handleClose, customerData } = props
  const queryClient = useQueryClient()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      user_name: '',
      email: '',
      phone: '',
      company_name: '',
      commerce_registration: '',
      password: '', // optional on edit
      type: 'individual',
      tax: ''
    }
  })

  // Reset form whenever customerData changes or drawer opens
  useEffect(() => {
    if (customerData) {
      reset({
        user_name: customerData.user_name || '',
        email: customerData.email || '',
        phone: customerData.phone || '',
        company_name: customerData.company_name || '',
        commerce_registration: customerData.commerce_registration || '',
        password: '', // blank for edit
        type: customerData.type || 'individual',
        tax: customerData.tax || ''
      })
    }
  }, [customerData, reset])

  const params = useParams()

  // Assume you have an update mutation hook (you should implement one similar to create)
  const { mutate: mutateUpdateClient } = useUpdateClient()

  const onSubmit = async (data: FormValidateType) => {
    if (!customerData?.id) {
      toast.error('Customer ID is missing.')

      return
    }

    const headers = await getClientAuthHeaders()

    const editClients = {
      user_name: data?.user_name,
      email: data?.email,
      phone: data?.phone,
      company_name: data?.company_name,
      commerce_registration: data?.commerce_registration,
      password: data?.password,
      type: data?.type,
      tax: data?.tax
    }

    mutateUpdateClient(
      { id: customerData?.id, headers: headers, payload: editClients },
      {
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({ queryKey: ['clients'] })
          handleClose()
          toast.success(res?.message || 'Customer Updated successfully')
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || 'Something went wrong')
        }
      }
    )
  }

  const handleReset = () => {
    handleClose()
    reset()
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
        <Typography variant='h5'>Edit a Customer</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
        <div className='p-6'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <Typography color='text.primary' className='font-medium'>
              Basic Information
            </Typography>

            <Controller
              name='user_name'
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Name'
                  placeholder='John Doe'
                  error={!!errors.user_name}
                  helperText={errors.user_name?.message}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='johndoe@gmail.com'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name='phone'
              control={control}
              rules={{ required: 'Phone is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Phone'
                  placeholder='+(123) 456-7890'
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
            <Controller
              name='company_name'
              control={control}
              rules={{ required: 'Company name is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Company Name'
                  placeholder='Tech Inc.'
                  error={!!errors.company_name}
                  helperText={errors.company_name?.message}
                />
              )}
            />
            <Controller
              name='commerce_registration'
              control={control}
              rules={{ required: 'Commerce registration is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Commerce Registration'
                  placeholder='CR123456'
                  error={!!errors.commerce_registration}
                  helperText={errors.commerce_registration?.message}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              // password is optional on edit, no rules
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Password'
                  placeholder='******'
                  type='password'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name='type'
              control={control}
              defaultValue='individual'
              render={({ field }) => (
                <CustomTextField {...field} fullWidth label='Type' InputProps={{ readOnly: true }} />
              )}
            />
            <Controller
              name='tax'
              control={control}
              rules={{ required: 'Tax is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Tax'
                  placeholder='TAX987654'
                  error={!!errors.tax}
                  helperText={errors.tax?.message}
                />
              )}
            />

            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit'>
                Update
              </Button>
              <Button variant='tonal' color='error' type='button' onClick={handleReset}>
                Discard
              </Button>
            </div>
          </form>
        </div>
      </PerfectScrollbar>
    </Drawer>
  )
}

export default EditCustomerDrawer
