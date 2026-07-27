/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from "react";
import {
  Table,
  Pagination,
  Card,
  TableCell,
  // Dropdown,
  // DropdownTrigger,
  // DropdownMenu,
  // DropdownItem,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  // Button,
  User,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  useGetAttendanceChartData,
  useGetAttendanceRecordForHR,
  useSearchAttendanceRecordForHR,
} from "../../../API/attendance";

import { formatDateToDateandTimeAMPM } from "../../../utils/utitlities";
// import { VerticalDotsIcon } from "../../VerticalDotsIcon";
import propTypes from "prop-types";
import { DatePicker } from "antd";
// import SearchComponents from "./searchComponents";
import ActionIcons from "../shared/ActionIcons";
import StaffInputV2 from "./SearchComp";
import ExpandedDrawerWithButton from "../../modals/ExpandedDrawerWithButton";
import AttendanceDetails from "./AttendanceDetails";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import AttendanceStatusCards from "./AttendanceStatus";
import ImageModal from "../../modals/ImageModal";
// import AttendanceBarChart from "../../AttendanceComponent/AttendanceBarChart";
// import AttendancePieChart from "../../AttendanceComponent/AttendancePieChart";

const AdminAttendancePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenImg,
    onOpen: onOpenImg,
    onClose: onCloseImg,
  } = useDisclosure();
  const [currentAttendance, setCurrentAttendance] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFilter, setCurrentPageFilter] = useState(1);
  const [attendanceRecordFilter, setAttendanceRecordFilter] = useState([]);
  const [filterPagination, setFilterPagination] = useState(null);

  const [isFilter, setIsFilter] = useState(false);
  const { refetch, data: attendanceData } = useGetAttendanceRecordForHR({
    page: currentPage,
    size: 20,
  });
  const { data: attendanceChartData, isLoading: attendanceLoading } =
    useGetAttendanceChartData();
  const { mutateAsync: search } = useSearchAttendanceRecordForHR();
  const filterLastQuery = useRef("");
  const [staffValue, setStaffValue] = useState([]);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  const [capturedImage, setCapturedImage] = useState(null);

  const { data: records, pagination } = attendanceData || {
    data: [],
    pagination: { totalPages: 1 },
  };
  const { barChartData, pieChartData } = attendanceChartData || {
    barChartData: [],
    pieChartData: [],
  };
  const COLORS = ["#00BCC2", "#FFBB28", "#FFBB28", "#FF8042"];

  const handleClose = () => {
    setCurrentAttendance(null);
    onClose();
  };

  const handleAttendanceDetail = (staff) => {
    setCurrentAttendance(staff);
    onOpen();
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    search(`${filterLastQuery.current}&page=${currentPageFilter}`);
  }, [currentPageFilter, search]);

  // const onStaffSelected = (StaffID)=>{
  //   if(!StaffID){
  //    setIsFilter(false);
  //       return
  //   }
  //   const query = `STAFF_ID=${StaffID}`
  //   handleSearch(query);
  // }

  const onSelected = (StaffID, val) => {
    if (StaffID) {
      const q1 =
        filterLastQuery.current.includes("date") ||
        filterLastQuery.current.includes("month")
          ? `&${filterLastQuery.current}`
          : "";
      handleSearch(`STAFF_ID=${StaffID}${q1}`);
    }
    setStaffValue(val);

    // if(!StaffID){
    //  setIsFilter(false);
    //     return
    // }
    // const query = `STAFF_ID=${StaffID}`
    // handleSearch(query);
  };

  const clearSTAFF = () => {
    filterLastQuery.current = "";
    setIsFilter(false);
    setDate1(null);
    setDate2(null);
    refetch();
    // console.log(filterLastQuery.current, 'here')
  };

  const onDateSelected = (e, type) => {
    if (e === null) {
      setIsFilter(false);
      return;
    }
    // console.log(e)
    const year = e?.$y;
    const month = formatMonth((e?.$M + 1)?.toString());
    const day = formatDay(e?.$D?.toString());
    const date = `${year}-${month}-${day}`;
    const monthFormat = `${year}-${month}`;

    if (!year) return;

    const q1 = filterLastQuery.current.includes("STAFF_ID")
      ? `&STAFF_ID=${staffValue?.value}`
      : "";

    switch (type) {
      case "date":
        setDate1(e);
        handleSearch(`date=${date}&size=${20}${q1}`);
        break;
      case "month":
        setDate2(e);
        handleSearch(`month=${monthFormat}&size=${20}${q1}`);
        break;
    }
  };

  const handleSearch = async (query) => {
    const res = await search(query);
    if (res) {
      filterLastQuery.current = query;
      setAttendanceRecordFilter(res?.data);
      setFilterPagination(res?.pagination);
      setIsFilter(true);
    }
  };

  const formatDay = (value) => {
    if (!value) return null;
    if (value.length == 1) return `0${value}`;
    return value;
  };
  const formatMonth = (value) => {
    if (!value) return null;
    if (value.length === 1) return `0${value}`;
    return value;
  };

  // const filePrefix = 'http://lamp3.ncaa.gov.ng/pub/'

  const handletest = () => {
    handleSearch(`STAFF_ID=${1}`);
  };

  const attendanceStatus = [
    {
      id: "ontime",
      label: "On Time",
      icon: MdOutlineCheckCircle,
      b_color: "bg-green-100",
      t_color: "text-green-500",
    },
    {
      id: "late",
      label: "Late",
      icon: MdOutlineCheckCircle,
      b_color: "bg-amber-100",
      t_color: "text-amber-500",
    },
    {
      id: "absent",
      label: "Absent",
      icon: MdOutlineCancel,
      b_color: "bg-gray-200",
      t_color: "text-gray-500",
    },
  ];

  const openCapturedImage = (image) => {
    if (!image) return;

    setCapturedImage(image);
    onOpenImg();
  };

  return (
    <div className="p-8">
      <AttendanceStatusCards
        statuses={attendanceStatus}
        data={barChartData}
        loading={attendanceLoading}
      />

      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        <Card shadow="sm ">
          {/* <div className="flex text-lg p-2 font-semibold text-gray-500">
            Today Analysis
          </div> */}
          <ResponsiveContainer
            width="100%"
            height={barChartData?.length > 0 ? 400 : 100}
            className="py-2"
          >
            <BarChart data={barChartData} title={"Today Attendance"}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00BCC2" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card shadow="sm">
          {/* <div className="flex text-lg p-2 font-semibold text-gray-500">
            Today Analysis
          </div> */}
          <ResponsiveContainer
            width="100%"
            height={pieChartData?.length > 0 ? 400 : 100}
          >
            <PieChart title={"Today Attendance"}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        {/* <AttendanceBarChart/>
      <AttendancePieChart/> */}
      </div>

      {/* <Button onClick={handletest}>test</Button> */}

      <div className="flex justify-center items-center flex-col md:flex-row gap-4 mt-12 mb-4">
        <DatePicker
          placeholder="2024-07-31"
          // defaultValue={}
          value={date1}
          onChange={(e) => onDateSelected(e, "date")}
          onReset={() => console.log("cleared")}
          onEmptied={() => console.log("cleared!")}
          className=" w-full border h-[45px] rounded-md focus:outline-none font-medium"
        />
        <DatePicker
          value={date2}
          onChange={(e) => onDateSelected(e, "month")}
          className=" w-full border h-[45px] rounded-md focus:outline-none font-medium"
          picker="month"
        />

        {/* <SearchComponents selectedStaffId={onStaffSelected} /> */}
        <StaffInputV2
          setChange={onSelected}
          label={"staff"}
          value={staffValue}
          onClear={clearSTAFF}
        />
      </div>
      <Table
        aria-label="Attendance Table"
        isHeaderSticky
        isStriped
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          <TableColumn>STAFF</TableColumn>
          <TableColumn>PUNCH IN</TableColumn>
          {/* <TableColumn>PUNCH OUT</TableColumn> */}
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex items-center justify-center text-2xl">
              {" "}
              Empty data
            </div>
          }
        >
          {(isFilter > 0 ? attendanceRecordFilter?.data : records)?.map(
            (record) => (
              <TableRow key={record?.ATTENDANCE_ID}>
                <TableCell>
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: record?.IMAGE_LINK
                        ? record?.IMAGE_LINK
                        : "/assets/images/profiles/user-2.png",
                    }}
                    name={`${record?.STAFF?.LAST_NAME || ""} ${
                      record?.STAFF?.FIRST_NAME || ""
                    }`}
                  >
                    {record?.STAFF?.EMAIL}
                  </User>
                </TableCell>
                <TableCell className="text-default-500">
                  {formatDateToDateandTimeAMPM(record?.PUNCH_IN_TIME) || "N/A"}
                </TableCell>
                {/* <TableCell className="text-default-500">
                {formatDateToDateandTimeAMPM(record?.PUNCH_OUT_TIME) || "N/A"}
              </TableCell> */}
                <TableCell align="center">
                  <div className="flex ">
                    <div className="pl-4 flex items-center">
                      <ActionIcons
                        variant={"VIEW-IMAGE"}
                        action={() =>
                          openCapturedImage(
                            record?.IMAGE_LINK
                              ? record?.IMAGE_LINK
                              : "/assets/images/profiles/user-2.png"
                          )
                        }
                      />
                    </div>
                    <div className="pl-4 flex items-center">
                      <ActionIcons
                        variant={"VIEW"}
                        action={() => handleAttendanceDetail(record)}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        {isFilter ? (
          <Pagination
            total={filterPagination?.totalPages}
            initialPage={1}
            page={currentPageFilter}
            onChange={(page) => setCurrentPageFilter(page)}
          />
        ) : (
          <Pagination
            total={pagination.totalPages}
            initialPage={1}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      <ExpandedDrawerWithButton
        key={currentAttendance}
        isOpen={isOpen}
        onClose={handleClose}
      >
        {currentAttendance && (
          <AttendanceDetails
            key={currentAttendance}
            staffId={currentAttendance}
            query={filterLastQuery.current}
          />
        )}
      </ExpandedDrawerWithButton>

      <ImageModal src={capturedImage} isOpen={isOpenImg} onClose={onCloseImg} />
    </div>
  );
};

AdminAttendancePage.propTypes = {
  onDetails: propTypes.func,
};

export default AdminAttendancePage;

//   const barChartData = [
//     { name: "On Time", value: 75 },
//     { name: "Late", value: 20 },
//     { name: "Absent", value: 5 },
//   ];

//   const pieChartData = [
//     { name: "Present", value: 95 },
//     { name: "Absent", value: 5 },
//   ];

{
  /* <div className="flex gap-4 mb-4 items-center">
        <div className="w-72">
          <Input
            placeholder="Search by staff name"
            value={searchTerm}
            variant="faded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button variant="faded" size="lg" className="h-[3.5rem] min-w-32">
          <Dropdown>
            <DropdownTrigger flat className=" text-default-600">
              {dateFilter}
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Date filter"
              onAction={(key) => setDateFilter(key)}
            >
              <DropdownItem key="Search by Date">Search by Date</DropdownItem>
              <DropdownItem key="today">Today</DropdownItem>
              <DropdownItem key="week">This Week</DropdownItem>
              <DropdownItem key="month">This Month</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Button>
      </div> */
}
//   function removePageParameter(queryString) {
//     return queryString.replace(/&page=\d+/, '');
//   }

{
  /* <div className="w-72">
          <Input
            placeholder="Search by staff name"
            value={searchTerm}
            variant="faded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */
}
