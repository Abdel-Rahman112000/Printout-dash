import { useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'

import axios from 'axios'

import { toast } from 'react-toastify'

import type { OrderCartType } from '@/types/api/common/OrderCart'
import { api } from '@/utils/api'
import { getClientAuthHeaders } from '@/utils/headers/authClient'

function OrderCart({ allOrders, getOrderCart }: { allOrders: OrderCartType[]; getOrderCart: () => void }) {
  const [checkedId, setCheckedId] = useState<number>()
  const [checked, setChecked] = useState<boolean>(false)

  async function handleDelete(id: string | number) {
    const headers = await getClientAuthHeaders()

    axios
      .delete(api`dashboard/order/${id}`, {
        headers
      })
      .then(res => {
        toast.success('success Delete')
        getOrderCart()
        setChecked(false)
      })
      .catch(err => {
        toast.error('Error in delete order')
      })
  }

  if (!allOrders.length)
    return (
      <>
        <Typography variant='h6'>No have Orders</Typography>
      </>
    )

  return (
    <Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h5' sx={{ fontWeight: 600, fontSize: '18px' }}>
          Cart
        </Typography>
        <Box>
          <Button variant='text'>Edit</Button>
          <Button variant='text' color='error' disabled={!checked} onClick={() => checkedId && handleDelete(checkedId)}>
            Delete
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '16px' }}>Product</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      onChange={event => {
                        if (event.target.checked) {
                          setChecked(true)
                          setCheckedId(order.id)
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <img
                        src={`${order.media[0]?.original_url}`}
                        alt={order.product_name || ''}
                        className='bs-[30px]'
                        style={{ objectFit: 'cover', height: '50px', width: '50px' }}
                      />
                      <Box sx={{ ml: 3 }}>
                        <Tooltip title={order.product_name} arrow>
                          <Typography variant='h6'>
                            {(order.product_name as string).length > 12
                              ? `${(order.product_name as string).slice(0, 12)}...`
                              : order.product_name}
                          </Typography>
                        </Tooltip>

                        {/* <Typography>Bakir</Typography> */}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{order.total_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Stack sx={{ margin: '40px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Subtotal : </Typography>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              EGP 2,093
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Shipping fee : </Typography>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              EGP 2,093
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Tax : </Typography>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              EGP 2,093
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Total : </Typography>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              EGP 2,093
            </Typography>
          </Box>
        </Stack> */}
      </Paper>
    </Stack>
  )
}

export default OrderCart
