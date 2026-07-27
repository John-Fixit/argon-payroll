/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Table,
  Pagination,
  TableCell,
  // Dropdown,
  // DropdownTrigger,
  // DropdownMenu,
  // DropdownItem,
  // Button,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  Avatar,
  Tooltip,
  useDisclosure,

} from "@nextui-org/react";
import { Button, DatePicker } from "antd";

import { useGetAttendanceRecord, useGetFirstPunchRecord, useGetUserImageRecord, useSearchAttendanceRecord } from "../../../API/attendance";
import { formatDateToDateandTimeAMPM, formatTimeMeridian } from "../../../utils/utitlities";
// import { VerticalDotsIcon } from "../../VerticalDotsIcon";
import propTypes from "prop-types";
import ImageModal from "../../modals/ImageModal";
import { GiAlarmClock } from "react-icons/gi";
import ActionIcons from "../shared/ActionIcons";
import useRemoveLastStaffId from "../../../hooks/useRemovelastquery";
// import ImageWithFallback from "../shared/ImageWithFallback";

import { IoRefreshOutline } from "react-icons/io5";
import { filePrefix } from "../../../utils/filePrefix";
// import { filter } from "lodash";

const AttendanceDetails = ({ staffId , query}) => {
  const {onClose, onOpen, isOpen} = useDisclosure()
  const [capturedImage, setCapturedImage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFilter, setCurrentPageFilter] = useState(1);
  const [filterPagination, setFilterPagination] = useState(null);

  const [attendanceRecordFilter, setAttendanceRecordFilter] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const {refetch,  data: attendanceData } = useGetAttendanceRecord(
    staffId?.STAFF_ID, { page: currentPage}
  );
  const {refetch:getImageUlr ,  data: userImage } = useGetUserImageRecord(
    staffId?.STAFF_ID
  );

  const {data: attendanceFirstPunch} = useGetFirstPunchRecord(staffId?.STAFF_ID) 
  const removeLastStaffId = useRemoveLastStaffId();

  const { mutateAsync: search } =
  useSearchAttendanceRecord();
  const  q = query ? `&${query}` : ''

  const q2 = removeLastStaffId(`STAFF_ID=${staffId?.STAFF_ID}${q}`)
  const filterLastQuery = useRef(`${q2}`);
  // const filterLastQuery = useRef(`STAFF_ID=${staffId?.STAFF_ID}`);
  



  const { data: records, pagination } = attendanceData || { data: [], pagination: { totalPages: 1 } };

  useEffect(() => {
    getImageUlr()
   
  }, [staffId])
  

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
     search(`${filterLastQuery.current}&page=${currentPageFilter}`);
     handleSearch(`${filterLastQuery.current}&page=${currentPageFilter}`)
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
        handleSearch(`date=${date}&STAFF_ID=${staffId?.STAFF_ID}`);
        break;
      case "month":
        handleSearch(
          `month=${monthFormat}&STAFF_ID=${staffId?.STAFF_ID}`
        );
        break;
      case "year":
        handleSearch(`year=${year}&STAFF_ID=${staffId?.STAFF_ID}`);
        break;
    }
  };

  const handleSearch = async (query) => {
    const res = await search(query);
    if (res) {
        filterLastQuery.current = query;
        setFilterPagination(res?.pagination)
        setAttendanceRecordFilter(res?.data);
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








const openCapturedImage = (image)=>{

    if(!image)return

    setCapturedImage(image)
    onOpen()
}


const firstPunchInToday = useMemo(() => {
  if(staffId){
    const first = attendanceFirstPunch?.firstPunchInTime
     if(!first) return null;
    //  const formatted = formatDateToDateandTimeAMPM(first)

  //  const timeMeridian = formatted?.split(',')[1]?.slice(0, 6)
   const timeMeridian2 = first?.split(' ')[1]?.slice(0, 5)

  //  const formattedTimeMeridian = formatTimeMeridian(timeMeridian)
   const formattedTimeMeridian2 = formatTimeMeridian(timeMeridian2)
  
    //  const formatted = formatDateToDateandTimeAMPM(first)
    //  const timeMeridian2 = formatted?.split(',')[1]?.slice(0, 9)

    // console.log(timeMeridian2)

    const tt = formattedTimeMeridian2?.time  +' '+ formattedTimeMeridian2?.meridian
    
     return tt;
  }
},  [attendanceFirstPunch, staffId])


const loadToday = ()=>{
  setIsFilter(false)
  filterLastQuery.current = `STAFF_ID=${staffId?.STAFF_ID}`
}

  return (
    <div className="p-8 py-2">
         <h2 className="font-helvetica font-bold text-xl md:text-3xl mb-4">
                 Attendance Details
        </h2>
        <div className="flex gap-5 flex-wrap font-helvetica ">
            <div>
              <img src={userImage ?`${filePrefix}${userImage?.FILE_NAME}` : "/assets/images/profiles/user-2.png" }    alt="user image"  className="rounded-md"
                style={{width:"200px", height: "200px"}}  />

            {/* <ImageWithFallback
                src={`${filePrefix}${userImage?.FILE_NAME}` }
                alt="user image" 
                fallbackSrc={"/assets/images/profiles/user-2.png"}
                className="rounded-md"
                style={{width:"200px", height: "200px"}}
            /> */}


             
                {/* <img src={!staffId?.STAFF ? "/assets/images/profiles/user-2.png" : `${filePrefix}${staffId?.STAFF?.PASSPORT_ATTACHMENT_URL}` } alt="user image" style={{width:"200px", height: "200px"}} className="rounded-md"  /> */}
            </div>
            <div className="pt-2 font-helvetica">
                <p className="font-helvetica text-default-500"> <strong className="text-default-800">Staff Name</strong>  :  {!staffId?.STAFF ? 'N/A' : `${staffId?.STAFF?.LAST_NAME} ${staffId?.STAFF?.FIRST_NAME}` }  </p>
                <p className="font-helvetica text-default-500"> <strong className="text-default-800">Staff ID</strong>  : {staffId?.STAFF_ID}</p>
                <p className="font-helvetica text-default-500"> <strong className="text-default-800">EMAIL</strong>  : {!staffId?.STAFF ? 'N/A' : staffId?.STAFF?.EMAIL }</p>

                <div className="flex items-center gap-1 my-1">
                <GiAlarmClock size={16} strokeWidth={2} className="bottom-0 right-0 text-black"  /> 
                <p className="font-helvetica  text-default-500"> <strong className="text-default-800"> Punched In Today</strong>  : {firstPunchInToday ?? 'N/A'}</p>
                </div>
            </div>
        </div>
      
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

          {
            filterLastQuery.current.includes('month') || filterLastQuery.current.includes('date') &&
          <Button  onClick={loadToday} className=" px-6 bg-btnColor !py-[1.5rem] text-white">
            <IoRefreshOutline/> Load Today
          </Button>
          }
          {/* <DatePicker
            onChange={(e) => onDateSelected(e, "year")}
            className=" w-full border h-[50px] rounded-md focus:outline-none font-medium"
            picker="year"
          /> */}
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
          <TableColumn>PUNCH OUT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={<div className="flex items-center justify-center text-2xl"> Empty data</div>}>
          {(isFilter > 0 ? attendanceRecordFilter?.data :records)?.map((record) => (
            <TableRow key={record?.ATTENDANCE_ID}>
              <TableCell>
                <Tooltip
                showArrow={true}
                placement="bottom"
                content={`${staffId?.STAFF?.LAST_NAME}  ${staffId?.STAFF?.FIRST_NAME}`}
                classNames={{ content: 'whitespace-nowrap' }}
                >
                <Avatar size="md" src={ record?.IMAGE_LINK ?   record?.IMAGE_LINK : "/assets/images/profiles/user-2.png"} name={record?.STAFF_ID} />
                </Tooltip>
            </TableCell>
              <TableCell className="text-default-500">
                {formatDateToDateandTimeAMPM(record?.PUNCH_IN_TIME) || "N/A"}
              </TableCell>
              <TableCell className="text-default-500">
                {formatDateToDateandTimeAMPM(record?.PUNCH_OUT_TIME) || "N/A"}
              </TableCell>
              <TableCell>
              <div className="pl-4 flex items-center">
              <ActionIcons variant={"VIEW"} action={()=>openCapturedImage(record?.IMAGE_LINK ?  record?.IMAGE_LINK : "/assets/images/profiles/user-2.png")}   />
                  {/* <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem onClick={()=>openCapturedImage(record?.IMAGE_LINK ?  filePrefix + record?.IMAGE_LINK : "/assets/images/profiles/user-2.png")}>View Image Capture</DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
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

      <ImageModal  src={capturedImage} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

AttendanceDetails.propTypes = {
    staffId: propTypes.any,
    query: propTypes.any,
};

export default AttendanceDetails;
