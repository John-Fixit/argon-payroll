import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { MdOutlineStar } from "react-icons/md";

const Course = ({ course }) => {
  return (
    <div className=" bg-white rounded-md cursor-pointer font-poppins">
      <div className="h-[12rem]">
        <img
          src={course.image_src}
          alt=""
          className="rounded-t-md object-cover w-full h-full"
        />
      </div>
      <div className="px-4 py-2 relative">
        <div className="rounded-full inline-flex gap-1 items-center">
          <img src={course.logo} height={20} width={20} alt="" />
          <p className="m-0 font-medium text-md">{course.host}</p>
        </div>
        <p className="text-[15px] leading-5 font-medium">{course.title}</p>
        <p className="my-2 text-xs tracking-wider text-gray-500">
          {course.description.length > 80
            ? course.description.substring(0, 80) + "..."
            : course.description}
        </p>

        <div className="flex items-center gap-2">
          <p className="font-bold">{course.rating}</p>
          <MdOutlineStar className="text-blue-500" />
          <span>({course.reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-xs flex-wrap">
          <p>{course.level}</p>
          <p className="rounded-full bg-gray-500 h-[4px] w-[4px] m-0"></p>
          <span>{course.certification}</span>
          <p className="rounded-full bg-gray-500 h-[4px] w-[4px] m-0"></p>
          <span>{course.duration}</span>
        </div>

        <div className="flex justify-between items-center my-2">
          <p className="font-medium">{course.amount}</p>
          <Button size="sm" color="primary" className="font-medium">
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Course;
Course.propTypes = {
  course: PropTypes.object,
};
