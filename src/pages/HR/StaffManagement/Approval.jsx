import ApprovalTable from '../../../components/tables/ApprovalTable'
import PageHeader from '../../../components/payroll_components/PageHeader'

export default function HRApproval() {
  return (
    <div className=''>
     
      <div className='py-6'>
        <PageHeader
          header_text={'HR Opration'}
          breadCrumb_data={[
            {
              name: 'HR',
            },
            {
              name: 'Approval',
            },
          ]}
          btnAvailable={false}
        />
      </div>
      <ApprovalTable />
    </div>
  )
}
