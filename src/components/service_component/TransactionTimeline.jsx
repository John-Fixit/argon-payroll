// import { Timeline } from "flowbite-react";
// import { IoCheckmark } from "react-icons/io5";
import { Steps } from 'antd';

export default function TransactionTimeline() {
const description = 'This is a description.';
const items = [
  {
    title: 'Finished',
    description,
  },
  {
    title: 'In Progress',
    description,
  },
  {
    title: 'Waiting',
    description,
  },
];
  return (
    <>
      {/* <Timeline horizontal={true}>
        <Timeline.Item>
          <Timeline.Point icon={IoCheckmark} className="bg-[#3F83F8]" />
          <Timeline.Content>
            <Timeline.Title className="text-[14px] font-poppins font-medium">
              Payment successful
            </Timeline.Title>
            <Timeline.Time>08-03 7:38:14 PM</Timeline.Time>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={IoCheckmark} />
          <Timeline.Content>
            <Timeline.Title className="text-[14px] font-poppins font-medium">
              Processing by bank
            </Timeline.Title>
            <Timeline.Time>08-03 7:38:14 PM</Timeline.Time>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={IoCheckmark} />
          <Timeline.Content >
            <Timeline.Title className="text-[14px] font-poppins font-medium">
              Received by bank
            </Timeline.Title>
            <Timeline.Time>08-03 7:38:14 PM</Timeline.Time>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline> */}
    <Steps current={3} com responsive={true} labelPlacement="vertical" items={items} />
    </>
  );
}
