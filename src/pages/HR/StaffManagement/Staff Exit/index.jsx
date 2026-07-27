import ExitTabs from '../../../../components/tabs/ExitTabs'
import { useState } from 'react'
import ExitStaffReportTable from '../../../../components/tables/ExitStaffReportTable'
import ExitStaffForm from '../../../../components/staff/ExitStaffForm'
import PageHeader from '../../../../components/payroll_components/PageHeader'

const StaffExit = () => {
  const [stepper, setstepper] = useState(1)

  return (
    <div>
      <div className='py-6'>
        <PageHeader
          header_text={'HR Opration'}
          breadCrumb_data={[
            {
              name: 'HR',
            },
            {
              name: 'StaffExit',
            },
          ]}
          btnAvailable={false}
        />
      </div>

      <div className=''>
        <ExitTabs step={setstepper} />

        {stepper === 1 && (
          <div className='space-y-5 py-4'>
            <ExitStaffForm />
          </div>
        )}
        {stepper === 2 && (
          <div className='space-y-5 py-4 '>
            <ExitStaffReportTable />
          </div>
        )}
      </div>
    </div>
  )
}

export default StaffExit
