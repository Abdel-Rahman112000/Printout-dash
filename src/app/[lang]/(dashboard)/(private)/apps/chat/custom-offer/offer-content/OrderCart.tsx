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
  Typography
} from '@mui/material'

import type { OrderCartType } from '@/types/api/common/OrderCart'

function OrderCart({ allOrders }: { allOrders: OrderCartType[] }) {
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
          <Button variant='text' color='error'>
            Delete
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '80px' }}></TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '16px' }}>Product</TableCell>
                <TableCell sx={{ width: '100px' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <img
                        src={`${order.media[0]?.original_url}`}
                        alt={order.product_name || ''}
                        className='bs-[40px]'
                      />
                      <Box sx={{ ml: 3 }}>
                        <Typography variant='h6'>{order.product_name}</Typography>
                        <Typography>Bakir</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{order.total_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ margin: '40px' }}>
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
        </Stack>
      </Paper>
    </Stack>
  )
}

export default OrderCart
