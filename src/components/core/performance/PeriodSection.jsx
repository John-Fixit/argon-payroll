/* eslint-disable react/prop-types */
import { Card, CardBody } from "@nextui-org/react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { School } from "lucide-react";
import moment from "moment";

const PeriodSection = ({ getValues, appraisee }) => {

  return (
    <>
      <Card className="shadow-sm my-4">
        <h2 className="text-[17px] font-normal  px-4 text-[#212529]">Period</h2>
        <CardBody className="p-4 w-full  grid  gap-3">
          {/* md:grid-cols-2 */}
          <div className="p-2 gap-2 grid ">
            <label>From:</label>
            <DatePicker
              size="large"
              value={dayjs(getValues()?.start_date)}
              placeholder="Start date"
              disabled={true}
            />
          </div>
          <div className=" grid gap-2 p-2">
            <label>To:</label>
            <DatePicker
              size="large"
              value={dayjs(getValues()?.end_date)}
              placeholder="End Date"
              disabled={true}
            />
          </div>
        </CardBody>

{
  !appraisee && (
        <CardBody>
          <div className="flex flex-col py-4">
            <div className=" flex flex-col gap-2 p-2 ">
              <h2 className="text-[1rem] font-medium font-helvetica uppercase text-start text-gray-500">
                Academic and Year
              </h2>
              {[
                {
                  academic: getValues("academic_one"),
                  year: getValues("academic_one_year"),
                },
                {
                  academic: getValues("academic_two"),
                  year: getValues("academic_two_year"),
                },
                {
                  academic: getValues("academic_three"),
                  year: getValues("academic_three_year"),
                },
                {
                  academic: getValues("academic_four"),
                  year: getValues("academic_four_year"),
                },
                {
                  academic: getValues("academic_five"),
                  year: getValues("academic_five_year"),
                },
                {
                  academic: getValues("academic_six"),
                  year: getValues("academic_six_year"),
                },
              ]?.map((item, index) => {
                return (
                  item?.academic && (
                    <div
                      className="flex gap-2 items-center px-4 py-3 rounded bg-gray-100"
                      key={index + "__academic"}
                    >
                      <div className="bg-[#daeceaf7] rounded p-2">
                        <School className="text-[#75d8e7f8]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 font-semibold text-sm">
                          {item?.academic}
                        </span>
                        <span className="text-default-400 font-medium text-sm">
                          {item?.year &&
                            moment(item?.year)?.format("DD MMM YYYY")}
                        </span>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </CardBody>
  )
}
      </Card>
    </>
  );
};

export default PeriodSection;
