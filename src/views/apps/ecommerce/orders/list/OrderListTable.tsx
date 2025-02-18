'use client'
// React Imports
import { useState, useEffect, useMemo, useContext } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import axios from 'axios'

import moment from 'moment'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import { toast } from 'react-toastify'

import { Avatar, Badge, Box, FormControl, IconButton, InputLabel, Select, Stack } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

import type { Locale } from '@configs/i18n'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type { Order } from '@/types/api/common/Order'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import { PaymentStatus } from '@/constants/PaymentStatus'

// Images
import MasterCardImg from '@/assets/images/mastercard.png'
import { SingleMainOrderCxt } from './context/SingleMainOrderCxt'
import type { User } from '@/types/api/common/User'
import OptionMenu from '@/@core/components/option-menu'

// Icons

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<Order>()

const OrderListTable = () => {
  // extract data from context
  const router = useRouter()
  const { mainOrderData, deliveryMen, refreshMainOrderData, isAdmin } = useContext(SingleMainOrderCxt)

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  // Methods
  const handleChangeStatus = async (id: number, key: string) => {
    const body = { status: key }
    const headers = await getClientAuthHeaders()

    // send request
    axios
      .post(api`dashboard/order/status/${id}`, body, { headers })
      .then(() => {
        toast.success('Status Changed Successfully')
        refreshMainOrderData()
      })
      .catch(() => {})
  }

  const columns = useMemo<ColumnDef<Order, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('id', {
        header: 'Order',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`/apps/ecommerce/orders/details/${row.original.id}`, locale as Locale)}
            color='primary'
          >{`#${row.original.id}`}</Typography>
        )
      }),
      columnHelper.accessor('created_at', {
        header: 'Date',
        cell: ({ row }) => <Typography>{moment(row.original.created_at).format('MMM DD YYYY, h:mm')}</Typography>
      }),
      columnHelper.accessor('client', {
        header: 'Client',
        cell: ({ row }) => (
          <Stack direction={'row'} spacing={2}>
            <Avatar
              alt={row.original.client?.user_name ?? 'user name'}
              src={row.original.client?.media?.original_url ?? ''}
            />
            <div>
              <Typography variant='h6'>
                {row.original.client?.user_name || row.original.client?.company_name}
              </Typography>
              <Typography variant='body2'>{row.original.client?.email}</Typography>
              <Typography variant='body2'>{row.original.client?.phone}</Typography>
            </div>
          </Stack>
        )
      }),
      {
        id: 'vendors',
        header: isAdmin == undefined ? '' : isAdmin ? 'Vendors' : 'Vendor Status',
        cell: ({ row }) => {
          if (isAdmin == undefined) return <>Loading...</>

          if (isAdmin) {
            if (row.original.vendor_id != null) {
              const badgeContentText =
                row.original.status_vendor == -1 ? 'pending' : row.original.status_vendor == 1 ? 'accepted' : 'done'

              return (
                <Badge badgeContent={badgeContentText} color='primary'>
                  <Chip label={row.original.vendor?.name ?? ''} />
                </Badge>
              )
            }

            const handleChange = async (str: string) => {
              const headers = await getClientAuthHeaders()

              axios
                .post(api`dashboard/order/assign-vendor/${row.original.id}`, { vendor_id: str }, { headers })
                .then(() => {
                  toast.success('Order assigned to Vendor successfully')
                  refreshMainOrderData()
                })
                .catch(() => {
                  toast.error('Unexpected error :(')
                })
            }

            if (Array.isArray(row.original?.product?.vendors) && row.original?.product?.vendors?.length > 0)
              return (
                <FormControl fullWidth>
                  <Select size='small' placeholder='vendor' onChange={e => handleChange(e.target.value as string)}>
                    {row.original?.product?.vendors?.map(ele => (
                      <MenuItem key={ele.id} value={ele.id}>
                        {ele.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )

            return <Typography variant='body2'>There are no vendors available for this order.</Typography>
          }

          // vendor
          const handleAccept = async () => {
            const headers = await getClientAuthHeaders()

            axios
              .post(api`dashboard/vendor/accept-order/${row.original?.id}`, undefined, { headers })
              .then(() => {
                toast.success('Vendor status changed')
                refreshMainOrderData()
              })
              .catch(() => {})
          }

          console.log('row.original?.status_vendor', row.original?.status_vendor)

          return (
            <Button
              variant='outlined'
              onClick={handleAccept}
              disabled={row.original?.status_vendor == 2}
              color={row.original?.status_vendor == -1 ? 'secondary' : 'success'}
            >
              {row.original?.status_vendor == -1
                ? 'Click to Accepted'
                : row.original?.status_vendor == 2
                  ? 'Done'
                  : 'Click to Done'}
            </Button>
          )
        }
      },
      {
        id: 'Delivery',
        header: 'Delivery', //deliveryMen delivery_id
        cell: ({ row }) => {
          if (isAdmin == undefined) return <>Loading...</>

          if (isAdmin) {
            const handleChange = async (str: string) => {
              const headers = await getClientAuthHeaders()

              axios
                .post(api`dashboard/order/assign-delivery/${row.original.id}`, { delivery_id: str }, { headers })
                .then(() => {
                  toast.success('Order assigned to Delivery successfully')
                  refreshMainOrderData()
                })
                .catch(() => {
                  toast.error('Unexpected error :(')
                })
            }

            if (Array.isArray(deliveryMen) && deliveryMen?.length > 0)
              return (
                <FormControl fullWidth>
                  <Select
                    defaultValue={row.original.delivery_id}
                    size='small'
                    placeholder='delivery'
                    onChange={e => handleChange(e.target.value as string)}
                  >
                    {deliveryMen?.map(ele => (
                      <MenuItem key={ele.id} value={ele.id}>
                        {ele.user_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )

            return <Typography variant='body2'>There are no delivery available for this order.</Typography>
          }

          // vendor

          return <Typography variant='body2'>{row.original?.delivery?.user_name ?? '_'}</Typography>
        }
      },
      columnHelper.accessor('payment', {
        header: 'status',
        cell: ({ row }) => {
          const key = row.original?.payment.toString() as '0' | '1' | '-1'
          const paymentStatus = PaymentStatus[key]
          const shapeStyles = { bgcolor: 'primary.main', width: 12, height: 12 }
          const shapeCircleStyles = { borderRadius: '50%' }
          const circle = <Box component='span' sx={{ ...shapeStyles, ...shapeCircleStyles }} />

          return (
            <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
              {circle}
              <Typography color='primary' variant='body2' className='self-start rounded-sm'>
                {paymentStatus ?? ''}
              </Typography>
            </Stack>
          )
        }
      }),
      columnHelper.accessor('status_show', {
        header: 'status',
        cell: ({ row }) => (
          <Chip
            label={row.original?.status_show?.name ?? 'test'}
            size='small'
            color='primary'
            variant='tonal'
            className='self-start rounded-sm'
            disabled={row.original?.status_show?.by !== 'admin'}
            onClick={() => {
              if (row.original?.status_show?.by === 'admin') {
                handleChangeStatus(row.original?.main_order?.id, row.original?.status_show?.key ?? '')
              }
            }}
          />
        )
      }),
      {
        id: 'payment-method',
        header: 'Method',
        cell: ({ row }) => (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <Avatar alt='payment method' src={MasterCardImg.src} sx={{ width: 24, height: 24 }} />
            <Typography variant='body2'>...2356</Typography>
          </Stack>
        )
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => {
          return (
            <IconButton>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={[
                  {
                    text: 'Tracking Order On Map',
                    icon: 'map-discount',
                    handleClick: () => {
                      router.push(`/en/apps/tracking-map?delivery_id=${mainOrderData?.delivery_id}`)
                    }
                  }
                ]}
              />
            </IconButton>
          )
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mainOrderData?.orders, isAdmin]
  )

  const table = useReactTable({
    data: (mainOrderData?.orders ?? []) as Order[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  if (isAdmin == undefined) return <>Loading...</>

  return (
    <Card>
      <CardContent className='flex justify-between max-sm:flex-col sm:items-center gap-4'>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Order'
          className='sm:is-auto'
        />
        <div className='flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px] max-sm:is-full'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
            <MenuItem value='100'>100</MenuItem>
          </CustomTextField>
          <Button
            variant='tonal'
            color='secondary'
            startIcon={<i className='tabler-upload' />}
            className='max-sm:is-full is-auto'
          >
            Export
          </Button>
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default OrderListTable
