/* eslint-disable react/prop-types */
import { Chip } from "@nextui-org/chip";

export default function AttachmentDetail({role}){


    const details = [

        
        { label: "Attachment", value: <Chip
        className='text-red-500 text-tiny capitalize cursor-pointer'
        size='sm'
        variant='flat'
        classNames={{
          base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
          content: 'drop-shadow shadow-black text-white',
        }}
      >
      Bachelor_Transcript.Pdf
      </Chip> },
      ];


    return(
        <>
            <div className="bg-white py-4 px-6 shadow rounded">
      <h2 className="mb-5 text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">Attachment</h2>
        <ul className="flex flex-col gap-5 my-4">
          {details.map((detail, i) => (
            <li
              className="grid grid-cols-3 gap-4 border p-2"
              key={i}
            >
              <p className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize">{detail.label}</p>
              <span className="col-span-2 text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize">{detail.value}</span>
            </li>
          ))}
        </ul>

      </div>
      {
        role !== 'request' &&
        <div className="flex justify-between mt-3">
            <button className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Reject</button>

            <button className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Approve</button>
        </div>
      }
        
        </>
    )
}