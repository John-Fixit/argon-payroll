
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  useGetAttendanceRecord,
  useSearchAttendanceRecord,
} from "../../API/attendance";
import { formatDateToDateandTimeAMPM, toStringDate } from "../../utils/utitlities";
import { DatePicker } from "antd";

const AttendanceTable = () => {
  const { userData } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFilter, setCurrentPageFilter] = useState(1);
  const [filterPagination, setFilterPagination] = useState(null);
  const [attendanceRecordFilter, setAttendanceRecordFilter] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const {refetch,  data: attendanceRecord } = useGetAttendanceRecord(
    userData?.data?.STAFF_ID, { page: currentPage});

  const { mutateAsync: search } =
    useSearchAttendanceRecord();
  const filterLastQuery = useRef(`STAFF_ID=${userData?.data?.STAFF_ID}`);
    



const { data: records, pagination } = attendanceRecord || { data: [], pagination: { totalPages: 1 } };


useEffect(() => {
  refetch();
}, [currentPage, refetch]);

useEffect(() => {
  search(`${filterLastQuery.current}&page=${currentPageFilter}`);
}, [currentPageFilter, search]);



  const onDateSelected = (e, type) => {
    if(e === null){
      setIsFilter(false)
      return
  }
    const year = e?.$y;
    const month = formatMonth((e?.$M + 1)?.toString());
    const day = formatDay(e?.$D?.toString());
    const date = `${year}-${month}-${day}`;
    const monthFormat = `${year}-${month}`;

    if (!year) return;

    switch (type) {
      case "date":
        handleSearch(`date=${date}&STAFF_ID=${userData?.data?.STAFF_ID}`);
        break;
      case "month":
        handleSearch(
          `month=${monthFormat}&STAFF_ID=${userData?.data?.STAFF_ID}`
        );
        break;
      case "year":
        handleSearch(`year=${year}&STAFF_ID=${userData?.data?.STAFF_ID}`);
        break;
    }
  };

  const handleSearch = async (query) => {
    const res = await search(query);
    if (res) {
      filterLastQuery.current = query;
      setAttendanceRecordFilter(res?.data);
      setFilterPagination(res?.pagination)
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

  return (
    <Fragment>
      <div className="">
        <div className="flex justify-center items-center flex-col md:flex-row gap-4 mt-12 mb-4 md:w-[80%]">
          <DatePicker
            placeholder="2024-07-31"
            onChange={(e) => onDateSelected(e, "date")}
            className=" w-full border h-[50px] rounded-md focus:outline-none font-medium"
          />
          <DatePicker
            onChange={(e) => onDateSelected(e, "month")}
            className=" w-full border h-[50px] rounded-md focus:outline-none font-medium"
            picker="month"
          />
        </div>

        <div>
          <Table
            isHeaderSticky
            isStriped
            aria-label="Attendance Table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <TableHeader>
              <TableColumn>DATE</TableColumn>
              <TableColumn>PUNCH IN</TableColumn>
              <TableColumn>PUNCH OUT</TableColumn>
            </TableHeader>
              <TableBody emptyContent={<div className="flex items-center justify-center text-2xl"> Empty data</div>}>
                {(isFilter > 0 ? attendanceRecordFilter?.data : records)?.map(
                  (record) => (
                    <TableRow key={record?.ATTENDANCE_ID}>
                      <TableCell>
                        {record.PUNCH_IN_TIME
                          ? toStringDate(
                              record.PUNCH_IN_TIME
                            )?.split(",")[0]
                          : toStringDate(
                              record.PUNCH_OUT_TIME
                            )?.split(",")[0]}
                      </TableCell>
                      <TableCell className="text-default-500">
                        {record.PUNCH_IN_TIME
                          ? formatDateToDateandTimeAMPM(
                              record.PUNCH_IN_TIME
                            )?.split(",")[1]
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-default-500">
                        {record.PUNCH_OUT_TIME
                          ? formatDateToDateandTimeAMPM(
                              record.PUNCH_OUT_TIME
                            )?.split(",")[1]
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
          </Table>

          <div className="flex justify-center mt-4">
              {
            isFilter ? 
            <Pagination
              total={filterPagination?.totalPages}
              initialPage={1}
              page={currentPageFilter}
              onChange={(page) => setCurrentPageFilter(page)}
            />
            : 
            <Pagination
              total={pagination.totalPages}
              initialPage={1}
              page={currentPage}
              onChange={(page) => setCurrentPage(page)}
            />
        }
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AttendanceTable;


