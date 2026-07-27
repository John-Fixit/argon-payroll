import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import imgpic from '../../assets/images/user-5.jpg'

export default function LeaveHandOverCard() {
  return (
    <>
      <Card className='relative group py-4 cursor-pointer shadow w-[19rem] px-2 '>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h4 className='font-bold text-large'>Frontend Radio</h4>
          <p className='text-tiny uppercase font-bold'>Leave Handover</p>
          <small className='text-default-500'>12/02/2020</small>
        </CardHeader>
        <CardBody className='overflow-visible py-2'>
          <Image
            alt='Card background'
            className='object-cover rounded-xl'
            src={imgpic}
            width={270}
          />
          <div className='absolute inset-0 flex items-center z-30  justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <Button className='bg-[#00bcc2]  text-white px-4 py-2 rounded'>
              View
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
