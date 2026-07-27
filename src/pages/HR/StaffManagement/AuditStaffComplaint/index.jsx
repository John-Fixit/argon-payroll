import PageHeader from '../../../../components/payroll_components/PageHeader'

const AuditStaffComplaint = () => {
  return (
    <div>
      <div className='py-4'>
        <PageHeader
          header_text={'HR Opration'}
          breadCrumb_data={[
            {
              name: 'HR',
            },
            {
              name: 'AuditStaffComplaint',
            },
          ]}
          btnAvailable={false}
        />
      </div>
    </div>
  )
}

export default AuditStaffComplaint
