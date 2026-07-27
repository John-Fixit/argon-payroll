// import React from 'react'

const SideContents = () => {
  return (
    //  <div  className="xl:w-1/3">
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col min-w-0 rounded break-words border bg-white shadow">
        <div className="flex-auto p-6">
          <div className="pb-2">
            <h4 className="mb-2 text-[20.889px] font-[500]">About</h4>
            <p>
              Hi I'm Jansh, has been the industry's standard dummy text To an
              English person, it will seem like simplified.
            </p>
            <ul className="ps-3 mb-0 list-disc">
              <li className="">
              <p >It will seem like simplified.</p>
              </li>
              <li className="">
              <p >To achieve this, it would be necessary to have uniform
                pronunciation</p>
              </li>
            </ul>
            {/* <!-- end ul --> */}
          </div>
          <hr />
          <div className="pt-2">
            <h4 className="mb-2 text-[20.889px] font-[500]">My Skill</h4>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-block text-center font-semibold text-gray-500 text-sm align-baseline leading-none rounded bg-gray-100 p-2">
                HTML
              </span>
              <span className="inline-block text-center font-semibold text-gray-500 text-sm align-baseline leading-none rounded bg-gray-100 p-2">
                Bootstrap
              </span>
              <span className="inline-block text-center font-semibold text-gray-500 text-sm align-baseline leading-none rounded bg-gray-100 p-2">
                Scss
              </span>
              <span className="inline-block text-center font-semibold text-gray-500 text-sm align-baseline leading-none rounded bg-gray-100 p-2">
                Javascript
              </span>
              <span className="inline-block text-center font-semibold text-gray-500 text-sm align-baseline leading-none rounded bg-gray-100 p-2">
                React
              </span>
              <span className="inline-block text-center font-semibold text-gray-500 text-sm align-baseline leading-none rounded bg-gray-100 p-2">
                Angular
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 rounded break-words border bg-white shadow">
        <div className="flex-auto p-6">
          <div>
            <h4 className="mb-2 text-[20.889px] font-[500]">Personal Details</h4>
            <div className="block w-full overflow-auto scrolling-touch">
              <table className="w-full max-w-full my-4 border">
                <tbody className="my-4 py-4">
                  <tr className="border-b p-4">
                    <th className="pr-4 border-r">Name</th>
                    <td className="ps-4">Jansh Wells</td>
                  </tr>
                  {/* <!-- end tr --> */}
                  <tr className="border-b p-4">
                    <th className="pr-4 border-r">Location</th>
                    <td className="ps-4">California, United States</td>
                  </tr>
                  {/* <!-- end tr --> */}
                  <tr className="border-b p-4">
                    <th className="pr-4 border-r">Language</th>
                    <td className="ps-4">English</td>
                  </tr>
                  {/* <!-- end tr --> */}
                  <tr className="border-b p-4">
                    <th className="pr-4 border-r">Website</th>
                    <td className="ps-4">abc12@probic.com</td>
                  </tr>
                  {/* <!-- end tr --> */}
                </tbody>
                {/* <!-- end tbody --> */}
              </table>
              {/* <ul className="flex flex-col gap-5 my-4">
                  <li className="flex gap-4">
                    <p className="font-semibold border-r pr-5">Name</p>
                    <span className="">Jansh Wells</span>
                  </li>
                  <li className="flex gap-4">
                    <p className="font-semibold border-r pr-5">Location</p>
                    <span className="">California, United States</span>
                  </li>
              </ul> */}
              {/* <!-- end table --> */}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 rounded break-words border bg-white shadow">
        <div className="flex-auto p-4">
          <div className="">
            <h4 className="mb-2 text-[20.889px] font-[500]">Work Experince</h4>
            <ul className="list-unstyled border-s-2 border-gray-200 ms-12">
              <li className="mb-5 ms-4 relative">
                <div className="my-4">
                  <span className="absolute top-[18px] text-xs -start-[75px] font-semibold text-gray-500">2020-21</span>
                  <span className="absolute w-[10px] h-[10px] bg-white border-2 border-blue-500 rounded-full -start-[22px] top-5"></span>
                  <div className="text-gray-400">
                   <h6 className="lh-base mb-0 text-gray-600">ABC Company</h6>
                <p className="font-size-13 mb-2">Web Designer</p>
                <p className="mb-0">
                 To achieve this, it would be necessary to have uniform
                  grammar, and more common words.
                </p>
                  </div>
                </div>
              </li>
              <li className="mb-5 ms-4 relative">
              <div className="border border-dashed"></div>
              </li>
              <li className="mb-5 ms-4 relative">
                <div className="my-4">
                  <span className="absolute top-[18px] text-xs -start-[75px] font-semibold text-gray-500">2019-20</span>
                  <span className="absolute w-[10px] h-[10px] bg-white border-2 border-blue-500 rounded-full -start-[22px] top-5"></span>
                  <div className="text-gray-400">
                   <h6 className="lh-base mb-0 text-gray-600">XYZ Company</h6>
                <p className="font-size-13 mb-2">Graphic Designer</p>
                <p className="mb-0">
                  It will be as simple as occidental in fact, it will be
                  Occidental person, it will seem like simplified.
                </p>
                  </div>
                </div>
              </li>
            </ul>
            {/* <!-- end ul --> */}
          </div>
        </div>
        {/* <!-- end card-body --> */}
      </div>
      {/* <!-- end card --> */}
    </div>
  );
};

export default SideContents;
