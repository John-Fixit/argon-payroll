import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useState } from 'react'
import MyRequest from '../../../components/self_services/aper/MyRequest'
import PendingApproval from '../../../components/self_services/aper/PendingApproval'
import TreatedApproval from '../../../components/self_services/aper/TreatedApproval'
import ApresTabs from '../../../components/tabs/ApresTabs'
import NewAppraisalForm from '../../../components/self_services/aper/NewAppraisalForm'

const Aper = () => {
  const [stepper, setstepper] = useState(1)

  return (
    <div>
      <div className='py-6'>
        <h1 className='text-[#1f1f1f] font-helvetica font-bold text-2xl sm:text-3xl '>
          APRAISAL
        </h1>
        {/* <h1 className='text-[#1f1f1f] text-[30px] font-medium mb-2 '>
          APRAISAL
        </h1> */}
        <Breadcrumbs
          separator='/'
          itemClasses={{
            separator: 'px-2',
          }}
          className='text-[#6c757d] text-[26px] font-medium '
        >
          <BreadcrumbItem>
            {/* <p className='text-[15px] '>SELF SERVICE</p>{' '} */}
            <p className='text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica '>
              SELF SERVICE
            </p>{' '}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {' '}
            <p className='text-[15px] '>Apraisal</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className=''>
        <div className=''>
          <ApresTabs step={setstepper} />

          {stepper === 1 && (
            <div className='space-y-5 py-4'>
              <MyRequest />
            </div>
          )}
          {stepper === 2 && (
            <div className='space-y-5 py-4 '>
              <PendingApproval />
            </div>
          )}
          {stepper === 3 && (
            <div className='space-y-5 py-4 '>
              <TreatedApproval />
            </div>
          )}
          {stepper === 4 && (
            <div className='space-y-5 py-4 '>
              <NewAppraisalForm />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Aper
