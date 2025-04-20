'use client'

// React Imports
import { useContext, useMemo, useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import type { StepProps } from '@mui/material/Step'

// Third-party Imports
import classnames from 'classnames'

import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'
import ProductDetailsForm from './steps/details'
import type { Category } from '@/types/api/common/Product'
import ProductCustomizationForm from './steps/customizations'
import { ProductContext, ProductContextProvider } from './context'
import ProductPricingForm from './steps/price'
import { CreateProductCxtProvider } from './context/CreateProductCxt'

const Step = styled(MuiStep)<StepProps>({
  '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  }
})

const CreateProjectComponent = ({ categories }: Props) => {
  // States
  const {
    query: { data: product },
    fetchCounts
  } = useContext(ProductContext)

  const [activeStep, setActiveStep] = useState<number>(0)
  const acualStep = product ? activeStep : 0

  // Vars
  const steps = useMemo(
    () => [
      {
        icon: 'tabler-users',
        title: 'Product Details',
        subtitle: 'Category /Name',
        Content: () => (
          <ProductDetailsForm
            key={fetchCounts}
            categories={categories}
            handleNext={(id: number) => setActiveStep(id)}
          />
        )
      },
      {
        icon: 'tabler-copy',
        title: 'Customizations',
        subtitle: 'Set available customizations',
        Content: () => <ProductCustomizationForm key={fetchCounts} handleNext={(id: number) => setActiveStep(id)} />
      },
      {
        icon: 'tabler-currency-dollar',
        title: 'Price Details',
        subtitle: 'Expected Price',
        Content: () => <ProductPricingForm key={fetchCounts} handleNext={() => {}} />
      }
    ],
    [categories, fetchCounts]
  )

  const getStepContent = (step: number) => {
    const Component = steps[step]?.Content

    return <Component />
  }

  return (
    <Card className='flex flex-col lg:flex-row'>
      <CardContent className='max-lg:border-be lg:border-ie lg:min-is-[300px]'>
        <StepperWrapper>
          <Stepper
            activeStep={acualStep}
            orientation='vertical'
            connector={<></>}
            className='flex flex-col gap-4 min-is-[220px]'
          >
            {steps.map((label, index) => {
              return (
                <Step key={index} onClick={() => setActiveStep(index)}>
                  <StepLabel icon={<></>} className='p-1 cursor-pointer'>
                    <div className='step-label'>
                      <CustomAvatar
                        variant='rounded'
                        skin={acualStep === index ? 'filled' : 'light'}
                        {...(acualStep >= index && { color: 'primary' })}
                        {...(acualStep === index && { className: 'shadow-primarySm' })}
                        size={38}
                      >
                        <i className={classnames(label.icon as string, '!text-[22px]')} />
                      </CustomAvatar>
                      <div className='flex flex-col'>
                        <Typography color='text.primary' className='step-title'>
                          {label.title}
                        </Typography>
                        <Typography className='step-subtitle'>{label.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <CardContent className='flex-1 pbs-6'>{getStepContent(acualStep)}</CardContent>
    </Card>
  )
}

type Props = {
  categories: Category[]
  productId?: string | number
}

export default function CreateProject(props: Props) {
  return (
    <ProductContextProvider productId={props.productId}>
      <CreateProductCxtProvider>
        <CreateProjectComponent {...props} />
      </CreateProductCxtProvider>
    </ProductContextProvider>
  )
}
