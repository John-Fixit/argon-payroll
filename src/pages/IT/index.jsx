import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs'
import ITTabs from '../../components/tabs/ITTabs'
import { useState } from 'react'
import Documents from '../../components/it/Documents'
import HRRightTable from '../../components/it/HRRightTable'
import ResetPasswordForm from '../../components/it/ResetPasswordForm'

const It = () => {
  const [stepper, setstepper] = useState(1)

  return (
    <div>
      <div className='py-6'>
        <h1 className='text-[#1f1f1f] text-[30px] font-medium mb-2 '>
          Dashboard
        </h1>
        <Breadcrumbs
          separator='/'
          itemClasses={{
            separator: 'px-2',
          }}
          className='text-[#6c757d] text-[26px] font-medium '
        >
          <BreadcrumbItem>
            <p className='text-[15px] '>Dashboard</p>{' '}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {' '}
            <p className='text-[15px] uppercase'> IT</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className=''>
        <ITTabs step={setstepper} />

        {stepper === 1 && (
          <div className='space-y-5 py-4'>
            <ResetPasswordForm />
          </div>
        )}
        {stepper === 2 && (
          <div className='space-y-5 py-4 '>
            <Documents />
          </div>
        )}
        {stepper === 3 && (
          <div className='space-y-5 py-4 '>
            <HRRightTable />
          </div>
        )}
      </div>
    </div>
  )
}

export default It
