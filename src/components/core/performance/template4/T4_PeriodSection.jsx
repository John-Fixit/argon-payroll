/* eslint-disable no-unused-vars */

import { Card, CardBody } from '@nextui-org/react'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'

const T4_PeriodSection = ({register, setValue, getValues, formState, onNext}) => {
  return (
    <>
        <Card className="shadow-sm my-4">
          <h2 className="text-[17px] font-normal  px-4 text-[#212529]">
            Period
          </h2>
          <CardBody className="p-4 w-full gap-3">
            <div className="p-2 gap-2 grid ">
              <label>From:</label>
              <DatePicker 
              status={formState.errors.start_date && "error"}
               {...register("start_date", {
                required: "This is required"
              })}
              onChange={(date, dateString)=>setValue("start_date", dateString)}
              size="large" placeholder="Start date" />
            </div>
            <div className=" grid gap-2 p-2">
              <label>To:</label>
              <DatePicker
              status={formState.errors.end_date && "error"}
              {...register("start_date", {
                required: "This is required"
              })}
              onChange={(date, dateString)=>setValue("end_date", dateString)}
              size="large" placeholder="End Date" />
            </div>
            {/* <div className="flex justify-end py-3">
        <button
        onClick={onNext}
          className="bg-btnColor px-4 py-1 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
        >
          Next
        </button>
      </div> */}
          </CardBody>
        </Card>
    </>
  )
}
T4_PeriodSection.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func
}

export default T4_PeriodSection