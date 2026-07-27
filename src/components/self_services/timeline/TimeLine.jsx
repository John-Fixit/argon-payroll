// import { Card, CardBody } from '@nextui-org/react'

import { Fragment } from "react";
import PropTypes from "prop-types";

const History = ({ items }) => {
  return (
    <div className="py-4 relative bg-white rounded px-3 md:px-10">
      <h2 className=" text-[1rem]  font-[600] text-[#444e4e] uppercase ">
        Timeline
      </h2>
      <div className="relative">
        <div className="absolute w-[2px] h-[95%] bg-gray-200 start-[50%]"></div>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            className={`my-2 w-1/2 ${
              index % 2 === 0 ? "ml-auto ps-6" : "mr-auto pe-6"
            }`}
          >
            <div className="rounded bg-slate-50 p-3 shadow font-normal relative">
              <div
                className={`absolute h-5 w-5 rounded-full flex justify-center items-center ${
                  index % 2 === 0
                    ? "-start-[34px] bg-red-500"
                    : "-end-[34px] bg-btnColor"
                }`}
              >
                <p className="w-3 h-3 rounded-full border-2 border-white"></p>
              </div>
              <span
                className={`absolute ${
                  index % 2 === 0 ? "-start-[7rem]" : "-end-[7rem]"
                }`}
              >
                04:47 PM
              </span>
              <p className="text-sm text-red-500">Dec 16th, 2022</p>
              <p className="text-xs">
                Added Professional Body : Test Membership, joined on Dec 21 2022
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TimeLine() {
  return (
    <Fragment>
      <div className=" grid md:grid-cols-[20rem_1fr] gap-8 ">
        {/* <SummeryCard /> */}
        <History items={[1, 2, 3, 4, 5, 6]} />
      </div>
    </Fragment>
  );
}

History.propTypes = {
  items: PropTypes.array,
};
