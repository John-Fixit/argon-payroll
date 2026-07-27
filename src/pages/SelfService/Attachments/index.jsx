import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import AttachmentTables from '../../../components/self_services/attachments/AttachemntTable'

const Attachments = () => {
  return (
    <div>
      <div className='py-6'>
        <h1 className='text-[#1f1f1f] font-helvetica font-bold text-2xl sm:text-3xl '>
          Attachments
        </h1>
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
            <p className='text-[15px] '>Attachments</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <AttachmentTables />
    </div>
  )
}

export default Attachments
