import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { Mail } from 'lucide-react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

export default function TeamCard() {
  return (
    <div>
      <Card className='w-[300px] border shadow rounded-md h-full'>
        <CardBody>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
              <div className='text-black text-4xl '>2</div>
              <div className=''>
                <p className='font-medium'>Team Members</p>
                <p className='font-light text-gray-400'>Joined this week</p>
              </div>
            </div>
            <div>
              <HiOutlineDotsHorizontal className='w-4 h-4 text-gray-400' />
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
              <div>
                <Avatar
                  alt='nextui logo'
                  height={30}
                  radius='full'
                  //   src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
                  width={30}
                />
              </div>
              <div className=''>
                <p className='font-medium'>Gilbert Barrett</p>
                <p className='font-light text-gray-400'>HR Manager</p>
              </div>
            </div>
            <div>
              <Mail className='w-4 h-4 text-gray-400' />
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
              <div>
                <Avatar
                  alt='nextui logo'
                  height={30}
                  radius='full'
                  width={30}
                />
              </div>
              <div className=''>
                <p className='font-medium'>Noah Allen</p>
                <p className='font-light text-gray-400'>HR Manager</p>
              </div>
            </div>
            <div>
              <Mail className='w-4 h-4 text-gray-400' />
            </div>
          </div>
        </CardBody>
        <Divider />
      </Card>
    </div>
  )
}
