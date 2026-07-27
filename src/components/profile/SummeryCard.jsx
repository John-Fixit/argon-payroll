/* eslint-disable react/prop-types */

const SummeryCard = () => {
  return (
    <>
      <div className=' w-full h-80 bg-white rounded-2xl bg-gradientto-b from[#fff] to[#111] text-center text-[#888] max-sm:w-full'>
        <h3 className='text-[1rem] capitalize  font-[600] text-[#444e4e]'>
          Your Timeline
        </h3>
        <div className='w-24 bg-gradient-to-b from-[#f1f1f1] to-transparent rounded-full mx-auto my-2'>
          <h1 className='pt-6 text-4xl text-black'>76</h1>
          <h4 className='text-gray-400 text-xs'></h4>
        </div>
        <h2 className='text-lg p-3 font-semibold'>Great</h2>
        <p className='text-md w-4/6 mx-auto pb-8 text-[#888]'>
          You scored higher than 65% of the people who have taken these tests.
        </p>
      </div>
    </>
  )
}

export default SummeryCard
