import Separator from '../payroll_components/Separator'
import AttachmentTable from '../tables/AttachmentTable'

export default function Attachment() {
  return (
    <div className='my-8'>
      <Separator separator_text={'Attachment'} />

      <AttachmentTable />
    </div>
  )
}
