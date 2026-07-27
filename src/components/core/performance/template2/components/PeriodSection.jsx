import { Card, CardBody } from '@nextui-org/react'
import { DatePicker } from 'antd'

const PeriodSection = () => {
  return (
    <>
        <Card className="shadow-sm my-4">
          <h2 className="text-[17px] font-normal  px-4 text-[#212529]">
            Period
          </h2>
          <CardBody className="p-4 w-full  grid  gap-3">
          {/* md:grid-cols-2 */}
            <div className="p-2 gap-2 grid ">
              <label>From:</label>
              <DatePicker placeholder="Start date" />
            </div>
            <div className=" grid gap-2 p-2">
              <label>To:</label>
              <DatePicker placeholder="End Date" />
            </div>
          </CardBody>
        </Card>
    </>
  )
}

export default PeriodSection