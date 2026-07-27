/* eslint-disable react/prop-types */
const CommentReply = ({name, image}) => {
  return (
    <div className="flex justify-between px-9 ml-[3.7rem] py-3">
            <div className="flex gap-x-5">
              <div>
                <span className="h-10 w-10 rounded-full flex items-center relative">
                  <img
                    src={image}
                    alt="User"
                    className="rounded-full w-[2.5rem] h-[2.5rem]"
                  />
                </span>
              </div>
              <div className="flex flex-col text-sm space-y-1">

                <span className="font-bold text-gray-600 text-sm">
                  {name}
                </span>
                <div className=" space-y-3">
                  <span>Thank You So Much ❤❤</span>

                  <div className=" text-mainColor flex gap-x-8">
                    {/* reply */}
                    <div className=" cursor-pointer"><span>Like</span></div>
                    <div className=" cursor-pointer"><span>Reply</span></div>
                    <div className=" cursor-pointer"><span>Translate</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block min-w-20">
              <span className="text-mainColor block text-sm ">50 mins ago</span>
            </div>
          </div>
  )
}

export default CommentReply
