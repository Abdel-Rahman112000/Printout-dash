'use client'

import { Controller, useFieldArray } from 'react-hook-form'
import type { FieldArrayWithId, UseFormReturn, UseFieldArrayRemove } from 'react-hook-form'

import type { GridProps } from '@mui/material'
import { Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import type { SchemaType } from '..'
import AddLabelToEl from '@/components/AddLabelToEl'
import { $CustomizationType } from '@/types/api/common/Product'
import ErrorTypography from '@/components/ErrorTypography'

const GridItem = (props: GridProps) => <Grid xs={12} md={6} item {...props} />

function CustomizationItem({
  form: {
    control,
    register,
    formState: { errors }
  },
  remove: removeCustomization,
  index,
  field
}: Props) {
  const { append, fields, remove } = useFieldArray({
    control,
    name: `customizations.${index}.choices`
  })

  return (
    <>
      <div className='flex gap-1'>
        <div>
          <IconButton
            onClick={() => {
              removeCustomization(index)
            }}
            color='error'
          >
            <RemoveCircleIcon fontSize='large' />
          </IconButton>
        </div>
        <Grid container spacing={6} key={field.id}>
          <GridItem>
            <AddLabelToEl label='Customization Name' error={errors.customizations?.[index]?.name?.message}>
              <TextField placeholder='Name' {...register(`customizations.${index}.name`)} />
            </AddLabelToEl>
          </GridItem>

          <GridItem>
            <AddLabelToEl label='Customization Type' error={errors.customizations?.[index]?.type_id?.message}>
              <Controller
                control={control}
                name={`customizations.${index}.type_id`}
                render={({ field }) => (
                  <TextField select placeholder='Customization Type' value={field.value} onChange={field.onChange}>
                    {Object.entries($CustomizationType).map(([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </AddLabelToEl>
          </GridItem>
          <Grid item xs={12}>
            {fields.map((field, choiceIndex) => (
              <div className='mb-2 px-4 flex items-center' key={field.id}>
                <div>
                  <IconButton
                    onClick={() => {
                      remove(choiceIndex)
                    }}
                    color='error'
                  >
                    <RemoveCircleIcon fontSize='large' />
                  </IconButton>
                </div>
                <Grid
                  container
                  spacing={4}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      placeholder='Choice Name'
                      {...register(`customizations.${index}.choices.${choiceIndex}.name`)}
                    />
                    <ErrorTypography>
                      {errors.customizations?.[index]?.choices?.[choiceIndex]?.name?.message}
                    </ErrorTypography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Price type</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Price type'
                        {...register(`customizations.${index}.choices.${choiceIndex}.type`)}
                      >
                        <MenuItem value={'per_page'}>Per Page</MenuItem>
                        <MenuItem value={'all_page'}>All Page</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      placeholder='Price'
                      type='number'
                      {...register(`customizations.${index}.choices.${choiceIndex}.price`)}
                    />
                    <ErrorTypography>
                      {errors.customizations?.[index]?.choices?.[choiceIndex]?.price?.message}
                    </ErrorTypography>
                  </Grid>
                </Grid>
                <ErrorTypography>{errors.customizations?.[index]?.choices?.[choiceIndex]?.message}</ErrorTypography>
              </div>
            ))}
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={8} md={6} lg={4}>
              <Button fullWidth variant='contained' color='secondary' onClick={() => append({ name: '', price: '' })}>
                Add New Choice
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider sx={{ my: 4 }} />
    </>
  )
}

type Props = {
  form: UseFormReturn<SchemaType>
  field: FieldArrayWithId<
    {
      customizations: SchemaType['customizations']
    },
    'customizations',
    'id'
  >
  remove: UseFieldArrayRemove
  index: number
}

export default CustomizationItem
