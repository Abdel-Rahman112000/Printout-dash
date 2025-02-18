'use client'
import { useEffect, useState } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material'

import axios from 'axios'

import { toast } from 'react-toastify'

import { useSettingsCxt } from './SettingCxt'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'

export default function DepositSetting() {
  const { settingItems } = useSettingsCxt()
  const depositSettingItem = settingItems?.find(ele => ele.type == 'order_deposit')
  const [deposit, setDeposit] = useState(depositSettingItem?.data?.value ?? '')
  const [dipositActive, setDipositActive] = useState(depositSettingItem?.data?.status == 1)

  useEffect(() => {
    if (depositSettingItem) {
      setDeposit(depositSettingItem?.data?.value ?? '')
      setDipositActive(depositSettingItem?.data?.status == 1)
    }
  }, [depositSettingItem])

  console.log('depositSettingItem', depositSettingItem, 'dipositActive', dipositActive, 'deposit', deposit)

  const handleStoreDeposit = async () => {
    const headers = await getClientAuthHeaders()

    axios
      .post(
        api`dashboard/setting`,
        {
          type: 'order_deposit',
          data: {
            key: 'Order deposit through Credit card / Visa',
            value: deposit,
            status: dipositActive ? 1 : 0
          }
        },
        { headers }
      )
      .then(() => {
        toast.success('Deposit value Updated Successfully')
      })
      .catch(err => {
        toast.error('Unexpected error')
      })
  }

  const handleChageDepositStatus = async (status: boolean) => {
    const headers = await getClientAuthHeaders()

    axios
      .post(
        api`dashboard/setting`,
        {
          type: 'order_deposit',
          data: {
            key: 'Order deposit through Credit card / Visa',
            value: deposit,
            status: status ? 1 : 0
          }
        },
        { headers }
      )
      .then(() => {
        toast.success('Deposit value Updated Successfully')
      })
      .catch(err => {
        toast.error('Unexpected error')
      })
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
        <Typography variant='h5'>Deposit Setting</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <FormControlLabel
            control={
              <Switch
                checked={dipositActive}
                onChange={(_, checked) => {
                  console.log('checkedchecked', checked)
                  handleChageDepositStatus(checked)
                  setDipositActive(prev => !prev)
                }}
              />
            }
            label={`Click to change deposit statue to ${!dipositActive ? 'active' : 'in-active'}`}
          />
          <Stack spacing={3}>
            <TextField
              id='deposit'
              fullWidth
              variant='outlined'
              disabled={!dipositActive}
              onChange={e => setDeposit(e.target.value)}
              label={depositSettingItem?.data?.key ?? 'deposit value'}
              defaultValue={depositSettingItem?.data?.value ?? ''}
            />
            <Button disabled={!dipositActive} fullWidth variant='contained' onClick={handleStoreDeposit}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
