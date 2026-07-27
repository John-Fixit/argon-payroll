
import { useCallback, useMemo, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { GrContract } from "react-icons/gr";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetStaffDetails } from "../../../API/staff_details";
import PageHeader from "../../../components/payroll_components/PageHeader";
import Separator from "../../../components/payroll_components/Separator";
import RequestCard from "../../Approval/RequestCard";
import OnboardingTable from "../../../components/core/onboarding/OnboardingTable";

const statusData = [
  {
    id: "all",
    label: "All",
    icon: FaUserFriends,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
    id: "1",
    label: "Full Time",
    icon: MdWork,
    b_color: "bg-cyan-100",
    t_color: "text-cyan-400",
  },
  {
    id: "2",
    label: "Contract",
    icon: GrContract,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
  {
    id: "3",
    label: "Secondment",
    icon: BiTransfer,
    b_color: "bg-red-100",
    t_color: "text-red-300",
  },
  {
    id: "4",
    label: "Appointment",
    icon: AiOutlineSchedule,
    b_color: "bg-pink-100",
    t_color: "text-pink-400",
  },
];

const Onboarding = () => {
  const { userData } = useCurrentUser();

  const [detailsStatus, setDetailsStatus] = useState("all");

  const { data: get_all_staff, isLoading: all_loading } = useGetStaffDetails(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      status: "all",
    },
    "all"
  );
  const { data: get_fullTime_staff, isLoading: loading_1 } = useGetStaffDetails(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      status: "1",
    },
    "1"
  );
  const { data: get_contract_staff, isLoading: loading_2 } = useGetStaffDetails(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      status: "2",
    },
    "2"
  );
  const { data: get_secondment_staff, isLoading: loading_3 } =
    useGetStaffDetails(
      {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        status: "3",
      },
      "3"
    );
  const { data: get_appointment_staff, isLoading: loading_4 } =
    useGetStaffDetails(
      {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        status: "4",
      },
      "4"
    );

  const formatResponseData = useCallback((queryResponse) => {
    return queryResponse ? queryResponse?.data : {};
  }, []);

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const detailsNo = (value) => {
    if (value == "all") {
      return [] ?? formatResponseData(get_all_staff, "all")?.data;
    } else if (value == "1") {
      return [] ?? formatResponseData(get_fullTime_staff, "1")?.data;
    } else if (value == "2") {
      return [] ?? formatResponseData(get_contract_staff, "2")?.data;
    } else if (value == "3") {
      return [] ?? formatResponseData(get_secondment_staff, "3")?.data;
    } else if (value == "4") {
      return [] ?? formatResponseData(get_appointment_staff, "4")?.data;
    } else {
      return [];
    }
  };

  const isLoading = useMemo(() => {
    return detailsStatus === "all"
      ? all_loading
      : detailsStatus === "1"
      ? loading_1
      : detailsStatus === "2"
      ? loading_2
      : detailsStatus === "3"
      ? loading_3
      : detailsStatus === "4"
      ? loading_4
      : [];
  }, [all_loading, detailsStatus, loading_1, loading_2, loading_3, loading_4]);


  return (
    <div>
      <div className="py-6">
        <PageHeader header_text={"Staff Details"} buttonProp={[{}]} />

        <RequestCard
          requestHistory={statusData}
          selectTab={selectTab}
          requestStatus={detailsStatus}
          requestNo={detailsNo}
        />
        <Separator separator_text={"Onboarding"} />

      </div>
      <div>
        <OnboardingTable
          tableData={[]}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Onboarding;
