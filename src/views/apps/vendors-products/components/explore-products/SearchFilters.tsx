import { useContext } from 'react'

import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'

import { VendorsProductsCxt } from '../../context'

export default function SearchFilters() {
  const { vendorsProductsLookups, handleStoreSearchParams, searchParams } = useContext(VendorsProductsCxt)

  return (
    <Grid container>
      <Grid item xs={12} md={4} p={2}>
        <FormControl fullWidth>
          <InputLabel id='type-select-label'>Type</InputLabel>
          <Select
            size='small'
            labelId='type-select-label'
            id='type-select'
            label='Type'
            value={searchParams?.type_id}
            onChange={e => {
              handleStoreSearchParams({ ...searchParams, type_id: e.target.value as string })
            }}
          >
            <MenuItem value={undefined}>All</MenuItem>
            {Array.isArray(vendorsProductsLookups?.types) &&
              vendorsProductsLookups?.types?.map(ele => (
                <MenuItem key={ele.id} value={ele.id}>
                  {ele.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4} p={2}>
        <FormControl fullWidth>
          <InputLabel id='category-select-label'>Category</InputLabel>
          <Select
            size='small'
            labelId='category-select-label'
            id='category-select'
            label='Category'
            value={searchParams?.category_id}
            onChange={e => {
              handleStoreSearchParams({ ...searchParams, category_id: e.target.value as string })
            }}
          >
            <MenuItem value={undefined}>All</MenuItem>
            {Array.isArray(vendorsProductsLookups?.categories) &&
              vendorsProductsLookups?.categories?.map(ele => (
                <MenuItem key={ele.id} value={ele.id}>
                  {ele.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4} p={2}>
        <FormControl fullWidth>
          <InputLabel id='brand-select-label'>Brand</InputLabel>
          <Select
            size='small'
            labelId='brand-select-label'
            id='brand-select'
            label='Brand'
            value={searchParams?.brand_id}
            onChange={e => {
              handleStoreSearchParams({ ...searchParams, brand_id: e.target.value as string })
            }}
          >
            <MenuItem value={undefined}>All</MenuItem>
            {Array.isArray(vendorsProductsLookups?.brands) &&
              vendorsProductsLookups?.brands?.map(ele => (
                <MenuItem key={ele.id} value={ele.id}>
                  {ele.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
