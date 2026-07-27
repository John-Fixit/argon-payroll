import HRReportTabs from '../../../../components/tabs/HRReportTabs'
import { useState } from 'react'
import HRComprehesiveTable from '../../../../components/tables/HRComprehesiveTable'
import HRPromotionReportTable from '../../../../components/tables/HRPromotionReportTable'
import HRGenerateReportForm from '../../../../components/staff/HRGenerateReportForm'
import PageHeader from '../../../../components/payroll_components/PageHeader'

const Reports = () => {
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
              name: 'Reports',
            },
          ]}
          btnAvailable={false}
        />
      </div>

      <div className=''>
        <HRReportTabs step={setstepper} />

        {stepper === 1 && (
          <div className='space-y-5 py-4'>
            <HRGenerateReportForm />
          </div>
        )}
        {stepper === 2 && (
          <div className='space-y-5 py-4 '>
            <HRComprehesiveTable />
          </div>
        )}
        {stepper === 3 && (
          <div className='space-y-5 py-4 '>
            <HRPromotionReportTable />
          </div>
        )}
      </div>
    </div>
  )
}

export default Reports
