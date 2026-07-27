import { PiCake } from 'react-icons/pi'
import { ArrowRight } from 'lucide-react'
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";


// const birthdayUsers = [
//     {
//         name: 'Sufiya Elija',
//         age: 20,
//         address:'Glasgow, Scotland',
//         message:'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//         id: 1,
//         userId:1
//     },
//     {
//         name: 'John Doe',
//         age: 27,
//         address:'Glasgow, Ireland',
//         message:'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//         id: 2,
//         userId:2
//     },
//     {
//         name: 'Abass Taiwan',
//         age: 20,
//         address:'Glasgow, China',
//         message:'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//         id: 3,
//         userId:3
//     },
//     {
//         name: 'Steph Johnson',
//         age: 40,
//         address:'Glasgow, Japan',
//         message:'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//         id: 4,
//         userId:4
//     },
// ]



const BirthdayCard = () => {
  return (
    <div className='relative'>
          <div className='rounded h-[22rem] w-full'>
            <img
              src='/assets/images/birthday-bg.jpg'
              alt='birthdaybg'
              className='absolute inset-0 h-full w-full object-cover z-2 align-middle rounded'
            />

            <div className='blur-up-cover rounded'></div>

            <div className='z-30  absolute text-white top-0 left-0 right-0 p-6 text-sm'>
              <div className='flex justify-between'>
                <div className='flex flex-col gap-1 leading-tight'>
                  <span className='font-bold'>Birthday !!!!</span>
                  <span className='text-xxs tracking-wide font-thin'>
                    Today Your College friend&apos;s Birthday
                  </span>
                </div>

                <div className='flex gap-x-2 items-start'>
                  <div className='p-1 h-fit rounded-full cursor-pointer lightbtn  z-10 group'>
                    <MdOutlineSkipPrevious className=' z-20 group-hover:text-cyan-200  text-gray-500' size={20} />
                  </div>

                  <div className='p-1 h-fit rounded-full cursor-pointer lightbtn  z-10 group'>
                    <MdOutlineSkipNext className=' z-20 group-hover:text-cyan-200 ' size={20} />
                  </div>
                </div>
              </div>

              <div className='flex justify-around mt-8 font-bold items-center'>
                <div className='lightbtn rounded-full w-10 h-10  flex items-center justify-center'>
                  <PiCake size={20} className='!font-bold' />
                </div>
                <div className='center-profile'>
                  <img
                    src='assets/images/center-profile.jpeg'
                    className='rounded-full z-30 absolute w-full h-full'
                    alt=''
                  />
                </div>
                <div className='lightbtn rounded-full w-10 h-10  flex items-center justify-center'>
                  <span>20+</span>
                </div>
              </div>

              <div className='mt-4'>
                <div className='flex flex-col justify-center items-center'>
                  <span className='font-semibold text-xl'>Sufiya Elija</span>
                  <span className='text-xs'>Glasgow, Scotland</span>
                </div>
              </div>
              <div className='mt-4'>
                <div className='flex flex-col justify-center items-center text-center text-gray-200'>
                  <span className='text-xs'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
              </div>

              <div className='mt-4'>
                <div className='flex flex-col justify-center h-full items-center w-full'>
                  <div className='flex items-center h-full  lightbtn rounded-md w-full'>
                    <input
                      name=''
                      id=''
                      className='outline-none border-none bg-transparent  px-4 w-full placeholder:text-xs py-3 placeholder:text-gray-300'
                      type='text'
                      placeholder='Wish Birthday To Your Friend'
                    />

                    <div className='ml-auto flex  h-full '>
                      <button className='px-3  py-3 outline-none border-l-[.1px] border-slate-100 h-full rounded'>
                        {' '}
                        <ArrowRight size={16} strokeWidth={2.5} />{' '}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default BirthdayCard
