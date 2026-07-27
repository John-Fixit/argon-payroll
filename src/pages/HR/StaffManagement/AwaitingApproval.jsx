import AwaitingApprovalTable from '../../../components/tables/AwaitingApprovalTable'
import PageHeader from '../../../components/payroll_components/PageHeader'

export default function AwaitingApproval() {
  return (
    <div className='overflow-x-clip max-w-[80rem]'>
      <div className='py-6'>
        <PageHeader
          header_text={'HR Opration'}
          breadCrumb_data={[
            {
              name: 'HR',
            },
            {
              name: 'Awaiting Approval',
            },
          ]}
          btnAvailable={false}
        />
      </div>
      <AwaitingApprovalTable />
    </div>
  )
}
