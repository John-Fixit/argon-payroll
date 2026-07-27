// import { useContext } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import RequestRoomTable from '../components/tables/RequestRoomTable'

export default function RequestRoom() {
  return (
    <div className='max-w-[65rem] mx-auto'>
      <div className='py-6'>
        <h1 className='text-[#1f1f1f] text-[30px] font-medium mb-2 '>
          Request Room
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
            <p className='text-[15px] '>Request Room</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <RequestRoomTable />
    </div>
  )
}
