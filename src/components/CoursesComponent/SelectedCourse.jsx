import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { IoCheckmark } from "react-icons/io5";
import {
  MdOutlineOndemandVideo,
  MdOutlineStar,
  MdOutlineStarHalf,
} from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { accordionData, lists, requirements } from "./data";
import { useState } from "react";

const SelectedCourse = ({ selectedCourse }) => {
  const [selected, setSelected] = useState(null);
  const myStyles = {
    backgroundImage: `url(${selectedCourse.image_src})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const Videos = ({ videos }) => {
    return (
      <ul className="">
        {videos.map((video, i) => (
          <li
            key={i}
            className={`${
              selected == i && "text-blue-500 bg-slate-200"
            } flex items-center justify-between text-xs leading-[2rem] cursor-pointer hover:bg-slate-100 px-2 rounded`}
            onClick={() => setSelected(i)}
          >
            <div className="flex items-center gap-2">
              <MdOutlineOndemandVideo />
              <p>{video.title}</p>
            </div>
            <p>{video.duration}</p>
          </li>
        ))}
      </ul>
    );
  };

  Videos.propTypes = {
    videos: PropTypes.array,
  };

  return (
    <div className="font-poppins bg-white shadow">
      <div style={myStyles} className="mt-3 min-h-[15rem] md:min-h-[20rem]">
        <div className=" bg-black bg-opacity-70 text-white px-6 py-4 md:py-8 md:px-10 min-h-[15rem] md:min-h-[20rem]">
          <p className="text-xl leading-5 font-medium md:text-3xl">
            {selectedCourse.title}
          </p>
          <p className="sm:text-medium lg:text-lg text-gray-200">
            Master Project Management by building community projects in 100
            days. Learn rist management, commercial economics,decision making,
            resource mangement, business ethics and information systems
          </p>

          <div className="sm:flex items-center gap-2 mt-6">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <Button color="primary" className="rounded-sm py-4 px-3 h-0">
                Best Seller
              </Button>
              <p className="text-blue-500">{selectedCourse.rating}</p>
              <div className="flex items-center">
                {Array(4)
                  .fill("start")
                  .map((_, i) => (
                    <MdOutlineStar key={i} className="text-blue-500" />
                  ))}
                <MdOutlineStarHalf className="text-blue-500" />
              </div>
            </div>
            <span>20,000 students</span>
          </div>

          <div className="my-4">
            <p className="font-medium tracking-wide text-medium">
              created by {selectedCourse.host}
            </p>
            <div className="sm:flex items-center mt-4 sm:mt-2 sm:gap-4">
              <div className="flex items-center gap-1">
                <FaCircleExclamation />
                <p>Last updated: {selectedCourse.date}</p>
              </div>
              <div className="flex items-center gap-1 mt-1 sm:mt-0">
                <TbWorld />
                <p>English</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 px-6  md:px-10 text-black">
        <div>
          <h1>What you will learn:</h1>
          <ul className="grid md:grid-cols-2">
            {lists.map((list, i) => (
              <li
                className="flex items-center gap-2 my-2 text-sm text-gray-500"
                key={i}
              >
                <IoCheckmark size={18} />
                <p>{list}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-4">
          <h1>Course contents</h1>
          <div className="md:flex items-center justify-between my-2">
            <div className="flex items-center gap-1">
              <span>25 sections</span>
              <p className="rounded-full bg-black h-[5px] w-[5px] m-0"></p>
              <span>50 lectures</span>
              <p className="rounded-full bg-black h-[5px] w-[5px] m-0"></p>
              <span>50h 30m total length</span>
            </div>
            <p className="text-blue-500 font-medium">Expand all sections</p>
          </div>
        </div>
        <div className="border rounded-lg my-2">
          <Accordion>
            {accordionData.map((item, i) => (
              <AccordionItem
                key={i}
                aria-label="Accordion 1"
                title={
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm capitalize tracking-wide">
                      {item.topic}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span>{item.lectures}</span>
                      <p className="rounded-full bg-gray-500 h-[5px] w-[5px] m-0"></p>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                }
              >
                <Videos videos={item.videos} />
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="my-6">
          <h1>Requirements</h1>
          <ul className="my-2">
           {requirements.map((requirement,i)=>(
            <li className="flex items-center gap-2 leading-7" key={i}>
              <span className="rounded-full bg-black h-[6px] w-[6px]"></span>
              <span>{requirement}</span>
            </li>
           ))}
          </ul>
        </div>

        <Button color="primary" className="font-medium my-4 w-full">
          Buy now
        </Button>
      </div>
    </div>
  );
};

export default SelectedCourse;

SelectedCourse.propTypes = {
  selectedCourse: PropTypes.object,
};
