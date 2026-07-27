/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Spinner,
  Pagination,
  User,
} from "@nextui-org/react";
import ActionIcons from "../core/shared/ActionIcons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toStringDate } from "../../utils/utitlities";
import { filePrefix } from "../../utils/filePrefix";
import { ConfigProvider, Input, Select } from "antd";
import StarLoader from "../core/loaders/StarLoader";

const tableHead = [
  { name: "NAME", column_name: "NAME" },
  { name: "EMPLOYMENT TYPE", column_name: "EMPLOYEE_TYPE" },
  { name: "EMPLOYEE NO", column_name: "STAFF_NUMBER" },
  { name: "DIRECTORATE", column_name: "DIRECTORATE" },
  { name: "DESIGNATION", column_name: "RANK" },
  { name: "GRADE", column_name: "GRADE" },
  { name: "GENDER", column_name: "GENDER" },
  { name: "DATE OF BIRTH", column_name: "DATE_OF_BIRTH" },
  { name: "DATE OF 1ST APP.", column_name: "DATE_OF_FIRST_APPOINTMENT" },
  { name: "CURRENT APP. DATE", column_name: "CURRENT_APPOINTMENT_DATE" },
  { name: "RETIREMENT DATE", column_name: "RETIREMENT_DATE" },
  { name: "AGE", column_name: "AGE" },
  { name: "STATE OF ORIGIN", column_name: "STATE_OF_ORIGIN" },
  { name: "ACTION", column_name: "ACTION" },
];

const StaffDetailsTable = ({ tableData, isLoading }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  // ===============functions to handle filter============================

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = () => {
      if (searchValue?.trim()) {
        const value = searchValue?.toLowerCase();
        const updatedData = tableData?.filter((item) => {
          const matches = [
            item?.FIRST_NAME?.toLowerCase(),
            item?.LAST_NAME?.toLowerCase(),
            item?.EMPLOYEE_TYPE?.toLowerCase(),
            item?.STAFF_NUMBER?.toLowerCase(),
            item?.DIRECTORATE?.toLowerCase(),
            item?.DEPARTMENT?.toLowerCase(),
            item?.DESIGNATION?.toLowerCase(),
            String(item?.GRADE)?.toLowerCase(),
            item?.STATE?.toLowerCase(),
            toStringDate(item?.DATE_OF_BIRTH)?.toLowerCase(),
          ].some((field) => field?.includes(value));
          return matches;
        });

        setFilteredData(updatedData.length ? updatedData : []);
      } else {
        // If search is cleared, show full data
        setFilteredData(tableData);
      }
    };

    filterData();
  }, [searchValue, tableData]);

  // console.log(filteredData)

  //====================== ends here ====================

  const rowsData = searchValue?.length ? filteredData : tableData;

  const pages = Math.ceil(rowsData?.length / rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [rowsData]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rowsData?.slice(start, end);
  }, [page, rowsData, rowsPerPage]);

  const navigateToProfile = (staffID) => {
    navigate(`/self/profile_details/${staffID}`);
  };

  const handleChange = (value) => {
    setRowsPerPage(value);
  };

  //==================== Table mouse scrolling by dragging horizontally ======================

  const tableRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tableContainerRef = useRef(null);
  const scrollbarRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(true);
    setStartX(e.pageX - tableContainerRef.current.getBoundingClientRect().left);
    setScrollLeft(tableContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent default behavior
    const x = e.pageX - tableContainerRef.current.getBoundingClientRect().left;
    const walk = (x - startX) * 2; // Adjust scroll speed as needed
    tableContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const syncScroll = (sourceRef, targetRef) => {
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const updateScrollbarWidth = () => {
      if (scrollbarRef.current && tableContainerRef.current) {
        const columnCount = tableHead.length; // Number of columns
        const columnWidth = 150; // Approximate column width, adjust as needed
        const totalWidth = columnCount * columnWidth;

        scrollbarRef.current.firstChild.style.width = `${totalWidth}px`;
      }
    };

    updateScrollbarWidth();
    window.addEventListener("resize", updateScrollbarWidth);

    return () => {
      window.removeEventListener("resize", updateScrollbarWidth);
    };
  }, [items]); // Watch for changes in both the data and the columns

  //===================== ends here =================================

  return (
    <>
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
          <Input
            type="search"
            placeholder="Search...."
            size="large"
            onChange={(e) => setSearchValue(e.target.value)}
            className="lg:w-[30%] md:w-[50%]"
          />
          <div className="flex gap-x-3 my-auto items-center">
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
                {
                  value: tableData?.length,
                  label: "All",
                },
              ]}
            />
          </div>
        </div>
      </ConfigProvider>

      <div className="relative">
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onScroll={() => syncScroll(tableContainerRef, scrollbarRef)}
          // Add padding to avoid overlap with the scrollbar
          // className="table_default_hor_scrollbar pt-3 pb-10 overflow-x-scroll bg-white shadow-sm border border-gray-100 ps-4 pe-5 rounded-[14px] mt-4 md:max-w-[900px w-[1000px lg:max-w-[1000px xl:max-w-[1200px]"
          className="pb-10 overflow-x-scroll pe-5 rounded-b-[14px] md:max-w-[900px] xl:max-w-[1350px] bg-white p-3 mt-3 rounded-lg"
        >
          <Table isStriped aria-label="staff_data Table" removeWrapper={true}>
            <TableHeader>
              {tableHead?.map((head, index) => (
                <TableColumn key={index + "___table_head" + head?.column_name}>
                  <p className="font-helvetica text-black text-[0.80rem] opacity-80">
                    {head?.name}
                  </p>
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody
              emptyContent={
                isLoading ? (
                  <StarLoader />
                ) : (
                  <p className="font-helvetica">No Data Available</p>
                )
              }
            >
              {items?.length &&
                items?.map((data, index) => (
                  <TableRow
                    key={index + "datas____"}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    {tableHead?.map((head, index) => (
                      <TableCell
                        key={index + "_____cell_data" + head?.column_name}
                        className={
                          index === 0
                            ? "rounded-tl-lg rounded-bl-lg"
                            : index === tableHead?.length - 1
                            ? "rounded-tr-lg rounded-br-lg"
                            : ""
                        }
                      >
                        {head?.column_name === "NAME" ? (
                          <>
                            <User
                              avatarProps={{
                                radius: "full",
                                src: data?.FILE_NAME
                                  ? filePrefix + data?.FILE_NAME
                                  : "",
                                className:
                                  "w-10 h-10 object-cover rounded-full border-default-200 border",
                              }}
                              name={`${data?.LAST_NAME || ""} ${
                                data?.FIRST_NAME || ""
                              }`}
                              classNames={{
                                description: "w-48 truncat",
                                name: "w-48 font-helvetica text-xs uppercase",
                              }}
                              description={
                                <div className="flex flex-col gap-y-1 justify-center">
                                  <p className="font-helvetica my-auto text-black opacity-50 capitalize">
                                    {data?.DEPARTMENT?.toLowerCase()}
                                  </p>
                                  <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                                    {data?.UNIT}
                                  </p>
                                </div>
                              }
                            />
                          </>
                        ) : head?.name?.includes("DATE_OF_BIRTH") ? (
                          <h5 className="font-helvetica text-xs opacity-65">
                            {data[head?.column_name]
                              ? toStringDate(data[head?.column_name])
                              : "N/A"}
                          </h5>
                        ) : head?.column_name === "ACTION" ? (
                          <div className="flex">
                            <ActionIcons
                              variant={"VIEW"}
                              action={() => navigateToProfile(data?.STAFF_ID)}
                            />
                          </div>
                        ) : (
                          <h5
                            className={`font-helvetica text-xs opacity-65 ${
                              head?.name?.includes(
                                "DIRECTORATE" || "DESIGNATION"
                              )
                                ? "w-48"
                                : ""
                            }`}
                          >
                            {data[head?.column_name] ?? "N/A"}
                          </h5>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <div className="flex w-full justify-center mt-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>

        <div
          ref={scrollbarRef}
          className="fixed bottom-0 left-0 overflow-x-scroll right-0 h-4 bg-red-50"
          onScroll={() => syncScroll(scrollbarRef, tableContainerRef)}
        >
          <div className="!w-[2000px h-4"></div>{" "}
        </div>
      </div>
    </>
  );
};

export default StaffDetailsTable;
