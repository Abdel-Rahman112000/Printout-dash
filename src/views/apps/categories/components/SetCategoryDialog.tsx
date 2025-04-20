'use client'

import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import type { TransitionProps } from '@mui/material/transitions'
import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'

import { toast } from 'react-toastify'

import { FilePond } from 'react-filepond'

import { z } from 'zod'

import { serialize } from 'object-to-formdata'

import Link from '@components/Link'

import { api } from '@/utils/api'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import AddLabelToEl from '@/components/AddLabelToEl'
import { CategoryCxt } from '../context/CategoryCxt'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function SetCategoryDialog(props: PropsType) {
  // Vars and States
  const { open, setOpen } = props
  const { handleRefreshCategoriesData, editedCategory, handleSetEditedCategory } = React.useContext(CategoryCxt)

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<FormSchema>({ mode: 'onTouched' })

  React.useEffect(() => {
    if (editedCategory) {
      reset({
        name: editedCategory?.name,
        featured: editedCategory?.featured ?? false
      })
    } else {
      reset({
        name: '',
        featured: false
      })
    }
  }, [open, editedCategory])

  const handleClose = () => {
    setOpen(false)
    handleSetEditedCategory(undefined)
  }

  const handleOnSubmit = handleSubmit(async data => {
    const headers = await getClientAuthHeaders()
    const isEdit = Boolean(editedCategory)
    const url = isEdit ? `dashboard/category/${editedCategory?.id}` : `dashboard/category`

    const body = {
      ...data,
      featured: data.featured ? 1 : 0, // Convert to 1 or 0
      image: data.image?.[0]
    }

    console.log('body', body)

    axios
      .post(api`${url}`, serialize(body), { headers })
      .then(() => {
        toast.success(`Category ${isEdit ? 'edited' : 'added'} successfully`)
        handleRefreshCategoriesData()
        handleClose()
      })
      .catch(() => {
        toast.error('Failed to add vendor')
      })
  })

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{Boolean(editedCategory) ? 'Edit' : 'Add'} Category</DialogTitle>
        <DialogContent>
          <Stack spacing={3} component={'form'} onSubmit={handleOnSubmit}>
            <Controller
              name='featured'
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                  }
                  label='Featured'
                />
              )}
            />
            <AddLabelToEl label='Category Name' error={errors.name?.message}>
              <TextField
                size='small'
                {...register('name')}
                error={Boolean(errors.name?.message)}
                fullWidth
                id='name'
                variant='outlined'
                disabled={isLoading}
              />
            </AddLabelToEl>

            <AddLabelToEl label='Image' error={errors.image?.message}>
              {editedCategory && editedCategory?.media?.length > 0 && (
                <Box p={1} my={1} border={'1px solid lightgray'} borderRadius={'8px'}>
                  <Typography
                    component={Link}
                    target='_blank'
                    href={editedCategory?.media?.[0]?.original_url}
                    color={'primary'}
                    className='opacity-[78]'
                    sx={{
                      ':hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {editedCategory?.media?.[0]?.file_name ?? 'existting file'}
                  </Typography>
                </Box>
              )}
              <Controller
                name='image'
                control={control}
                render={({ field }) => (
                  <FilePond
                    files={field.value}
                    onupdatefiles={files => {
                      field.onChange(files.map(filepondFile => filepondFile.file))
                    }}
                    disabled={isLoading}
                    allowMultiple={false}
                    acceptedFileTypes={['image/*']}
                  />
                )}
              />
            </AddLabelToEl>

            <Button disabled={isLoading} variant='contained' color='success' type='submit'>
              Save
            </Button>
            <Button disabled={isLoading} variant='contained' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

const SetVendorFormType = z.object({
  name: z.string().min(1, 'Category name is required'),
  featured: z.boolean().optional(),
  image: z.array(z.instanceof(File)).min(1, 'Please upload an image')
})

type FormSchema = z.infer<typeof SetVendorFormType>

type PropsType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
