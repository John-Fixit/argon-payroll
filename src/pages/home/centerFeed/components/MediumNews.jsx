import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { IoMdMore } from "react-icons/io"
import { LuCopy } from "react-icons/lu"

const MediumNews = () => {
  return (
    <div className="bg-white w-[300px] relative rounded-xl flex flex-col ml-3 shadow border pb-4">
    <div className="flex h-[5rem] px-[1.8rem] items-center justify-between">
      <div className="flex  gap-3 w-[190px]">
        <div className=" overflow-hidden  h-10   flex items-end">
          <img
            src="/assets/images/profiles/avatar-07.jpg"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-600 text-sm">@jdoee</span>
          <span className=" text-gray-500 text-sm">2 days</span>
        </div>
      </div>

      <div>
        <Popover placement="bottom">
          <PopoverTrigger>
            <div className=" hover:bg-slate-300 p-1 cursor-pointer rounded-full">
              <IoMdMore size={20} className="text-slate-900" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex  flex-wrap w-30 justify-center  items-center ">
              <Button color="">
                <LuCopy size={18} />
                <span className="text-gray-600"> Copy Link</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>

    <div className="w-full h-[10rem] overflow-hidden relative border-b border-slate-50">
      <img
        src="/assets/images/opay.png"
        className=" object-center  w-full h-full"
        alt=""
      />

      <div className="absolute bottom-4 left-7 bg-gray-300 rounded-2xl px-3 py-[0.22rem]">
        <span className="text-gray-900">Nairametrics</span>
      </div>
    </div>

    <div className="px-7 text-gray-500  flex flex-col gap-y-2 pt-4 pb-2">
      <div>
        <b className=" text-lg text-gray-700">
            OPay Tightens Security: NIN Linkage or Say Bye-Bye to Your Account
        </b>
      </div>
    </div>

  </div>
  )
}

export default MediumNews
