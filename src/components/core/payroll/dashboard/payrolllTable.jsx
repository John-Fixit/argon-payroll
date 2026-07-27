/* eslint-disable no-unused-vars */
import React from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import ActionIcons from "../../shared/ActionIcons";
import { filePrefix } from "../../../../utils/filePrefix";
import { Select } from "antd";

const tableColumns = [
  { name: "Name", uid: "name" },
  { name: "Position", uid: "dateAdded" },
  { name: "Gross pay", uid: "expiryDate" },
  { name: "Tax", uid: "tax" },
  { name: "Total", uid: "total" },
  { name: "Status", uid: "status" },
  { name: "Action", uid: "actions" },
];

const PayrollTable = ({ tableData, handleOpenDrawer, isPending }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const pages = useMemo(() => {
    return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
  }, [tableData]);

  const classNames = React.useMemo(
    () => ({
      // wrapper: ["max-h-[382px]", "max-w-3xl"],
      thead: ["rounded-none"],
      th: [
        "bg-transparent",
        "text-default-500",
        "border-b",
        "border-divider",
        // Remove border radius from header
        "first:rounded-none",
        "last:rounded-none",
      ],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <div className="mt-3 border">
      <div className="flex justify-between border-b p-3">
        <div className="flex gap-2 items-center">
          <h3 className="font-helvetica text-lg">Request</h3>
          <p className="text-default-500 font-helvetica opacity-60">
            16 Employees
          </p>
        </div>
        {/* <div>
              <Select />
            </div> */}
      </div>
      <Table
        removeWrapper={true}
        radius="none"
        isCompact={true}
        // classNames={{
        //   thead: [
        //     // "bg-red-500",
        //     "text-default-500",
        //     "border-0",
        //     "rounded-none",
        //     "shadow-none",
        //   ],
        //   th: [
        //     "bg-transparent",
        //     "text-default-500",
        //     "border-0",
        //     "rounded-none",
        //   ],
        //   td: [
        //     // changing the rows border radius
        //     // first
        //     "group-data-[first=true]/tr:first:before:rounded-none",
        //     "group-data-[first=true]/tr:last:before:rounded-none",
        //     // middle
        //     "group-data-[middle=true]/tr:before:rounded-none",
        //     // last
        //     "group-data-[last=true]/tr:first:before:rounded-none",
        //     "group-data-[last=true]/tr:last:before:rounded-none",
        //   ],
        // }}
        classNames={classNames}
        className="p-"
        aria-label="Attribute Table"
        isHeaderSticky
        isStriped
        css={{
          "thead th": {
            borderRadius: "0 !important", // Removes all border radius
          },
          height: "auto",
          minWidth: "100%",
          "thead th:first-child": {
            borderTopLeftRadius: "0",
          },
          "thead th:last-child": {
            borderTopRightRadius: "0",
          },
        }}
      >
        <TableHeader className="bg-red-500 rounded-none">
          {tableColumns?.map((column, index) => {
            return (
              <TableColumn
                key={index + "____Table_head"}
                className="capitalize font-helvetica text-[0.80rem] opacity-70 rounded-none tracking-wider"
              >
                {column?.name}
              </TableColumn>
            );
          })}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex items-center justify-center text-2xl font-helvetica">
              Empty data
            </div>
          }
        >
          {tableData?.map((row, rowIndex) => (
            <TableRow key={rowIndex + "__table_row"}>
              <TableCell className="text-default-500">
                <User
                  avatarProps={{
                    radius: "full",
                    src: row?.FILE_NAME ? filePrefix + row?.FILE_NAME : "",
                    className:
                      "w-10 h-10 object-cover rounded-full border-default-200 border",
                  }}
                  name={`${row?.LAST_NAME || ""} ${row?.FIRST_NAME || ""}`}
                  classNames={{
                    description: "w-48 truncat",
                    name: "w-48 font-helvetica text-xs uppercase",
                  }}
                  description={
                    <div className="flex flex-col gap-y-1 justify-center">
                      <p className="font-helvetica my-auto text-black opacity-50 capitalize">
                        {row?.DEPARTMENT?.toLowerCase()}
                      </p>
                      <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                        {row?.UNIT}
                      </p>
                    </div>
                  }
                />
              </TableCell>
              <TableCell>
                <p className="font-helvetica">{"Position"}</p>
                <small className="text-default-500">abc</small>
              </TableCell>
            </TableRow>
          ))}

          {tableData?.map((row, rowIndex) => (
            <TableRow key={rowIndex + "__table_row"}>
              {tableColumns?.map((column, index) => (
                <TableCell
                  key={rowIndex + "__table_column" + index + "___"}
                  className=""
                >
                  <div
                    className={`font-helvetica ${
                      column?.uid !== "actions" && "opacity-60"
                    } text-[0.80rem] ${column?.uid !== "code" && "capitalize"}`}
                  >
                    {column?.uid === "actions" ? (
                      <div className="flex ">
                        <div className="pl-4 flex items-center">
                          <ActionIcons
                            variant={"VIEW"}
                            action={() => handleOpenDrawer}
                          />
                          <ActionIcons
                            variant={"DELETE"}
                            action={() => handleOpenDrawer}
                          />
                          {/* {viewIndex === i && isPending ? (
                          <StarLoader size={20} />
                        ) : record?.status === "draft" ? (
                          <ActionIcons
                            variant={"EDIT"}
                            action={() =>
                              console.log(row)
                            }
                          />
                        ) : (
                          <ActionIcons
                            variant={"VIEW"}
                            action={() => handleViewAper(record, i)}
                          />
                        )} */}
                        </div>
                      </div>
                    ) : (
                      row[column?.uid]?.toLowerCase()
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex mt-4">
        <Pagination
          total={pages}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

PayrollTable.propTypes = {
  tableData: PropTypes.array,
  handleOpenDrawer: PropTypes.func,
  isPending: PropTypes.bool,
};

export default PayrollTable;
