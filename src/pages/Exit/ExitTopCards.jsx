import { useMemo } from 'react'
import RequestCard from '../Approval/RequestCard';
import useExitData from './useExit_data';
import PropTypes from "prop-types";
import { MdOutlineCancel, MdOutlineCheckCircle, MdOutlinePending } from 'react-icons/md';

const ExitTopCards = ({detailsStatus, setDetailsStatus}) => {

    const { selectTab, detailsNo, loadings, detailsStatus: StateDetailsStatus } = useExitData(detailsStatus, setDetailsStatus);


    const statusData = useMemo(
        () => [
          {
            id: "1",
            label: "Pending",
            icon: MdOutlinePending,
            b_color: "bg-cyan-100",
            t_color: "text-cyan-400",
          },
          {
            id: "2",
            label: "Approval",
            icon: MdOutlineCheckCircle,
            b_color: "bg-green-100",
            t_color: "text-green-500",
          },
          {
            id: "3",
            label: "Decline",
            icon: MdOutlineCancel,
            b_color: "bg-red-100",
            t_color: "text-red-400",
          },
        ],
        []
      );


  return (
    <>
        <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={StateDetailsStatus}
        requestNo={detailsNo}
        loading={loadings}
      />

    </>
  )
}

export default ExitTopCards



ExitTopCards.propTypes = {
    detailsStatus: PropTypes.string,
    setDetailsStatus: PropTypes.func,
}