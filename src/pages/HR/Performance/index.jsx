import React, { useState } from "react";
import { FaFirstdraft } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { useDisclosure } from "@nextui-org/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import {
  useGetActivePerformance,
  useAdminListAper,
} from "../../../API/performance";
import { useGetRequestDetail } from "../../../API/api_urls/my_approvals";
import PerformanceDrawer from "../../Performance/PerformanceDrawer";
import PerformanceApprovalDrawer from "../../Approval/AperApprovalView";
import PerformanceTable from "../../../components/core/performance/PerformanceTable";
import RequestCard from "../../Approval/RequestCard";
import Separator from "../../../components/payroll_components/Separator";
import { errorToast } from "../../../utils/toastMsgPop";
import { IoIosArrowForward } from "react-icons/io";
import { ConfigProvider, DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";

const HrPerformance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewIndex, setViewIndex] = useState(null);
  const [aperData, setAperData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [detailsStatus, setDetailsStatus] = useState("pending");

  const { userData } = useCurrentUser();

  //===============get my APER =====================
  const {
    data: apers,
    isLoading: aperLoading,
    refetch,
  } = useAdminListAper({
    company_id: userData?.data?.COMPANY_ID,
    year: selectedYear,
    status: detailsStatus,
  });
  const {
    data: pendingApers,
    isLoading: pendingAperLoading,
    refetch: refetchPending,
  } = useAdminListAper({
    company_id: userData?.data?.COMPANY_ID,
    year: selectedYear,
    status: "pending",
  });
  const { data: draftApers, isLoading: draftAperLoading } = useAdminListAper({
    company_id: userData?.data?.COMPANY_ID,
    year: selectedYear,
    status: "draft",
  });
  const { data: completedApers, isLoading: completedAperLoading } =
    useAdminListAper({
      company_id: userData?.data?.COMPANY_ID,
      year: selectedYear,
      status: "completed",
    });

  const { mutate: mutateRequestDetail, isPending } = useGetRequestDetail();

  const { data: period } = useGetActivePerformance(userData?.data?.COMPANY_ID);

  // -------------------approval------------------------
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });
  const {
    isOpen: isAperOpen,
    onOpen: onAperOpen,
    onClose: onAperClose,
  } = useDisclosure();
  // -------------------approval------------------------

  const statusData = [
    {
      id: "pending",
      label: "Pending",
      icon: MdOutlinePending,
      b_color: "bg-amber-100",
      t_color: "text-amber-600",
    },
    {
      id: "draft",
      label: "Draft",
      icon: FaFirstdraft,
      b_color: "bg-purple-100",
      t_color: "text-purple-600",
    },
    {
      id: "completed",
      label: "Completed",
      icon: AiOutlineFileDone,
      b_color: "bg-green-100",
      t_color: "text-green-600",
    },
  ];

  const detailsNo = (value) => {
    if (value == "pending") {
      return pendingApers;
    } else if (value == "draft") {
      return draftApers;
    } else if (value == "completed") {
      return completedApers;
    }
  };

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const handleViewAper = (aper, index) => {
    setViewIndex(index);
    setSelectedTab(0);
    mutateRequestDetail(
      {
        request_id: aper?.request_id,
      },

      {
        onError: (err) => {
          const errMsg = err?.response?.data?.message || err?.message;
          errorToast(errMsg);
        },
        onSuccess: (res) => {
          const resData = res?.data?.data;

          if (Number(aper?.canApprove)) {
            handleViewApproval(resData, aper?.request_id);
          } else {
            setAperData({ ...resData, is_draft: aper?.is_draft });
            setIsOpen(true);
          }
        },
      },
    );
  };

  const handleViewApproval = (value, reqID) => {
    const approvers = value?.approvers;
    const attachments = value?.attachments;
    const requestData = value?.data;
    const notes = value?.notes;
    setDetails({
      ...details,
      approvers,
      attachments,
      notes,
      data: requestData,
      requestID: reqID,
    });
    onAperOpen();
  };

  const handleClose = (refreshSignnal) => {
    setIsOpen({ type: "", status: false });

    setDetails({
      approvers: [],
      attachments: [],
      data: null,
      notes: [],
      requestID: null,
    });

    if (refreshSignnal === "refresh") {
      refetch();
      refetchPending();
    }
  };

  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChange = (value) => {
    setRowsPerPage(value);
  };

  const hasSearchFilter = Boolean(searchValue?.trim());
  const filteredItems = React.useMemo(() => {
    let filteredData = apers?.length ? [...apers] : [];

    if (hasSearchFilter) {
      const value = searchValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = apers?.filter((item) => {
        const fullName = `${item?.first_name} ${item?.last_name}`.toLowerCase();

        const matches = [
          item?.APPRAISEE?.toLowerCase(),
          item?.first_name?.toLowerCase(),
          item?.last_name?.toLowerCase(),
          item?.STAFF_NUMBER?.toLowerCase(),
          item?.variation_name?.toLowerCase(),
          item?.current_payment?.toLowerCase(),
          item?.past_payment?.toLowerCase(),
          item?.directorate_name?.toLowerCase(),
          item?.department_name?.toLowerCase(),
          // toStringDate(item?.commence_date)?.toLowerCase(),
          fullName,
        ].some((field) => field?.includes(value));

        const fullNameMatches = searchTerms.every((term) =>
          fullName.includes(term),
        );

        return matches || fullNameMatches;
      });

      filteredData = updatedData.length ? updatedData : [];
    }

    return filteredData;
  }, [apers, hasSearchFilter, searchValue]);

  return (
    <div className="py-8 font-helvetica">
      <section>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <h2 className="font-helvetica font-bold text-3xl">Promotions</h2>
            <div>
              <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">
                HRIS <IoIosArrowForward className="text-md" /> Promotions
              </span>
            </div>
          </div>
          {/* <Button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica flex items-center gap-1 shadow" onClick={addNew}>
                 <IoMdAddCircle size={18} />
                 <span>
              Add Promotion
                 </span>
              </Button> */}
        </div>
      </section>
      <div className="mb-6">
        <Separator separator_text={"History"} />
        <RequestCard
          requestHistory={statusData}
          selectTab={selectTab}
          requestStatus={detailsStatus}
          requestNo={detailsNo}
        />
      </div>

      <div className="mb-3">
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: "#d9d9d9",
              colorPrimaryHover: "#d9d9d9",
            },
            components: {
              Input: {
                hoverBorderColor: "#d9d9d9",
                activeBorderColor: "#d9d9d9",
                activeShadow: "#d9d9d9",
              },
              Select: {
                hoverBorderColor: "#d9d9d9",
                activeBorderColor: "#d9d9d9",
                activeShadow: "#d9d9d9",
              },
            },
          }}
        >
          <div className="flex justify-between flex-wrap gap-y-2">
            <div className="flex gap-x-3 my-auto items-end">
              <div className="flex flex-col">
                <span className="font-helvetica">Search here</span>
                <Input
                  type="search"
                  placeholder="Search here...."
                  // size="large"
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="lg:w-[100%] md:w-[50%]"
                  allowClear
                />
              </div>
              <div className="flex flex-col">
                <span className="font-helvetica">Year</span>
                {/* <DatePicker
                  placeholder="Select year"
                  // size="large"
                  picker="year"
                  value={selectedYear ? dayjs(selectedYear) : null}
                  disabledDate={(current) =>
                    new Date().getFullYear()
                      ? current &&
                        current >
                          dayjs(new Date().getFullYear()).endOf("selectedYear")
                      : false
                  }
                  onChange={(dateString, date) => setSelectedYear(date)}
                /> */}
                <DatePicker
                  picker="year"
                  placeholder="Select year"
                  value={selectedYear ? dayjs(String(selectedYear)) : null}
                  disabledDate={(current) => {
                    if (!current) return false;

                    const year = current.year();

                    return year < 2022 || year > dayjs().year();
                  }}
                  onChange={(dateString, date) => setSelectedYear(date)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-helvetica">Rows per page:</span>
              <Select
                defaultValue="15"
                value={rowsPerPage}
                onChange={handleChange}
                options={[
                  {
                    value: "15",
                    label: "15",
                  },
                  {
                    value: "25",
                    label: "25",
                  },
                  {
                    value: "50",
                    label: "50",
                  },
                  {
                    value: "100",
                    label: "100",
                  },
                ]}
              />
            </div>
          </div>
        </ConfigProvider>
      </div>

      <PerformanceTable
        tableData={filteredItems?.map((item) => {
          return {
            ...item,
            status: detailsStatus,
          };
        })}
        handleViewAper={handleViewAper}
        tableStatus={detailsStatus}
        viewIndex={viewIndex}
        isPending={isPending}
        role={"hris"}
        selectedYear={selectedYear}
      />

      <PerformanceDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        aperData={aperData}
        setAperData={setAperData}
        period={period}
      />

      <PerformanceApprovalDrawer
        isOpen={isAperOpen}
        setIsOpen={() => onAperClose()}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        incomingData={details}
        handleClose={handleClose}
      />
    </div>
  );
};

export default HrPerformance;
