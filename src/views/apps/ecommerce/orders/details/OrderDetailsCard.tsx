'use client'

// React Imports
import { useState, useMemo, useContext } from 'react'

// MUI Imports
import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

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

// Component Imports
import { Skeleton } from '@mui/material'

import Link from '@components/Link'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import type { OrderDetail } from '@/types/api/common/Order'
import { getLocalizedUrl } from '@/utils/i18n'

// Types
import type { Locale } from '@configs/i18n'
import { SubOrderCxt } from './context'

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

// Column Definitions
const columnHelper = createColumnHelper<OrderDetail>()

const OrderTable = ({
  subOrders,
  productName,
  customPrintType
}: {
  customPrintType: boolean
  productName: string
  subOrders: OrderDetail[]
}) => {
  // States
  const { lang: locale, id } = useParams()
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[subOrders])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<OrderDetail, any>[]>(
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
      columnHelper.accessor('price', {
        header: 'Product',
        cell: ({ row }) => {
          const url = customPrintType ? `/apps/ecommerce/orders/details/${id}/${row.original.id}` : undefined

          return (
            <div className='flex items-center gap-3'>
              <div className='flex flex-col items-start'>
                <Typography component={Link} href={url} color='text.primary' className='font-medium'>
                  {productName ?? ''}
                </Typography>
                <Typography variant='body2'>{row.original?.product?.category?.name}</Typography>
              </div>
            </div>
          )
        }
      }),
      columnHelper.accessor('product.product_price.price', {
        header: 'Price',
        cell: ({ row }) => <Typography>{`${row.original?.price || '-'} $`}</Typography>
      }),
      columnHelper.accessor('qty', {
        header: 'Qty',
        cell: ({ row }) => <Typography>{`${row.original.qty}`}</Typography>
      }),
      {
        id: 'total',
        header: 'Total',
        cell: ({ row }) => {
          let total = row.original.product?.product_price?.price

          total = +row.original?.price * (row.original.qty ?? 1)

          return <Typography>{`${total} $`}</Typography>
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as OrderDetail[],
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

  return (
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
          <tbody className='border-be'>
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
  )
}

const OrderDetailsCard = () => {
  const { orderData: order, orderDataLoading } = useContext(SubOrderCxt)

  if (orderDataLoading) return <Skeleton variant='rounded' width={'100%'} height={'220px'} />

  return (
    <Card>
      <CardHeader
        title='Order Details'
        action={
          <Typography component={Link} color='primary.main' className='font-medium'>
            Edit
          </Typography>
        }
      />
      {order?.order_details && (
        <OrderTable
          customPrintType={order?.type_id == 3}
          productName={order?.product_name ?? ''}
          subOrders={order?.order_details ?? []}
        />
      )}
      <CardContent className='flex justify-end'>
        <div>
          <div className='flex items-center gap-12'>
            <Typography color='text.primary' className='min-is-[100px]'>
              Subtotal:
            </Typography>
            <Typography color='text.primary' className='font-medium'>
              {order?.total_price}
            </Typography>
          </div>
          <div className='flex items-center gap-12'>
            <Typography color='text.primary' className='min-is-[100px]'>
              Shipping Fee:
            </Typography>
            <Typography color='text.primary' className='font-medium'>
              0
            </Typography>
          </div>
          <div className='flex items-center gap-12'>
            <Typography color='text.primary' className='min-is-[100px]'>
              Tax:
            </Typography>
            <Typography color='text.primary' className='font-medium'>
              0
            </Typography>
          </div>
          <div className='flex items-center gap-12'>
            <Typography color='text.primary' className='font-medium min-is-[100px]'>
              Total:
            </Typography>
            <Typography color='text.primary' className='font-medium'>
              {order?.total_price}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderDetailsCard
