'use client'

// MUI Imports
import { useContext } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import type { TimelineProps } from '@mui/lab/Timeline'

import { Skeleton } from '@mui/material'

import { SubOrderCxt } from './context'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    },
    '& .MuiTimelineContent-root:last-child': {
      paddingBottom: 0
    },
    '&:nth-last-child(2) .MuiTimelineConnector-root': {
      backgroundColor: 'transparent',
      borderInlineStart: '1px dashed var(--mui-palette-divider)'
    },
    '& .MuiTimelineConnector-root': {
      backgroundColor: 'var(--mui-palette-primary-main)'
    }
  }
})

const ShippingActivity = () => {
  const { orderData: order, orderDataLoading } = useContext(SubOrderCxt)

  if (orderDataLoading) return <Skeleton variant='rectangular' width={'100%'} height={'220px'} />

  return (
    <Card>
      <CardHeader title='Shipping Activity' />
      <CardContent>
        <Timeline>
          {order?.main_order?.order_status?.map((status, index, statusArr) => (
            <TimelineItem key={status.id}>
              <TimelineSeparator>
                <TimelineDot color={status.action === 1 ? 'primary' : 'secondary'} />
                {index < statusArr.length - 1 && (
                  <TimelineConnector color={status.action === 1 ? 'primary' : 'secondary'} />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Typography color='text.primary' className='font-medium'>
                    {status.status}
                  </Typography>
                  <Typography variant='caption'>
                    {status.updated_at ? new Date(status.updated_at).toLocaleString() : '-'}
                  </Typography>
                </div>
                <Typography className='mbe-2'>{status.action === 1 ? 'Completed' : 'Pending'}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ShippingActivity
