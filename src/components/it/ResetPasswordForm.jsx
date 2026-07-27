// import 'react-datepicker/dist/react-datepicker.css'
import { Input, Button, Card } from '@nextui-org/react'

export default function ResetPasswordForm() {
  return (
    <Card className='grid gap-2 w-full py-8 p-4 shadow '>
      <h2 className='text-[22px] font-normal text-[#212529] '>
        Reset Password
      </h2>
      <p className='text-gray-500 text-md '>
        Staff number must be in NCAA/P.XXX format
      </p>
      <form action=''>
        <div className='grid grid-cols-2 py-4 items-center w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Input
            size='sm'
            type='text'
            className='rounded-sm '
            label='Staff Number'
            labelPlacement='outside'
            placeholder=' Name'
          />
        </div>
        <div className='  '>
          <Button
            color='success'
            className='my-4  text-white rounded'
            // onClick={handleAddNote}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Card>
  )
}
