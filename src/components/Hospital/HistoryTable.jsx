/* eslint-disable no-unused-vars */

import React, { Fragment, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  AvatarGroup,
  Spinner,
} from "@nextui-org/react";
import { tableHeader, columns, status } from "./data";
import PropTypes from "prop-types";
import ActionButton from "../forms/FormElements/ActionButton";
import { useGetProfile } from "../../API/profile";
import { API_URL } from "../../API/api_urls/api_urls";
import { filePrefix } from "../../utils/filePrefix";
import { Rate } from "antd";
import StarLoader from "../core/loaders/StarLoader";

const HistoryTable = ({ seeFeedBack, makeComment }) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(tableHeader)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "date",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const { data: profile } = useGetProfile({
    path: API_URL.getProfile,
    key: "profile",
  });
  const { data: hospital_data, isLoading } = useGetProfile({
    path: API_URL.getHospital,
    key: "hospital",
  });

  const hospitalData = useMemo(() => {
    return hospital_data?.data?.hospitals?.length
      ? hospital_data?.data?.hospitals
          .map((item, index) => ({
            ...item,
            _id: index + "hospital",
            is_family: item?.RELATIONSHIP ? true : false,
            NAME: item?.RELATIONSHIP
              ? `${item?.STAFF_FAMILY_FIRST_NAME} ${item?.STAFF_FAMILY_LAST_NAME}`
              : `${profile?.BIODATA?.FIRST_NAME} ${profile?.BIODATA?.LAST_NAME}`,
            PICTURE: item?.RELATIONSHIP
              ? item?.FILE_NAME
              : profile?.PROFILE_PICTURE?.FILE_NAME,
          }))
          .filter((item) => item.is_family) // Filter by is_family
      : [];
  }, [hospital_data, profile]);

  const hasSearchFilter = Boolean(filterValue);

  const viewFeedback = (hospital) => {
    seeFeedBack(hospital?.HOSPITAL_ID);
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredFamilies = [...hospitalData];

    if (hasSearchFilter) {
      filteredFamilies = filteredFamilies.filter(
        (family) =>
          family.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          family.hospital.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== status.length
    ) {
      filteredFamilies = filteredFamilies.filter((family) =>
        Array.from(statusFilter).includes(family.status)
      );
    }

    return filteredFamilies;
  }, [hospitalData, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((family, columnKey) => {
    const cellValue = family[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <Avatar
              src={family?.PICTURE ? filePrefix + family?.PICTURE : null}
            />
            <div className="flex flex-col">
              <span className="font-helvetica capitalize text-sm text-default-400">
                {family?.NAME}
              </span>
              <span className="text-xs text-gray-400">
                {family?.RELATIONSHIP}
              </span>
            </div>
          </div>
        );
      case "hospital":
        return (
          <p className="w-36 capitalize text-sm text-default-400">
            {family?.HOSPITAL_NAME}
          </p>
        );
      case "rating":
        return (
          <div className="w-36">
            <Rate disabled allowHalf defaultValue={family?.RATINGS} />
          </div>
        );
      case "actions":
        return (
          <div className="text-center flex md:flex-row flex-col gap-2">
            <ActionButton className="" onClick={() => viewFeedback(family)}>
              Feedback
            </ActionButton>
            <ActionButton
              className="shadow"
              onClick={() => makeComment(family?.HOSPITAL_ID)}
            >
              comment
            </ActionButton>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  return (
    <Fragment>
      <div className="">
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[550px]",
            }}
            sortDescriptor={sortDescriptor}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            className="lg:col-span-4"
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column?.sortable}
                  className={`font-medium ${
                    column.uid === "actions" && "text-center"
                  }`}
                >
                  <span className="font-helvetica text-black text-[0.80rem] opacity-80">
                    {column.name}
                  </span>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={
          isLoading? (
            <StarLoader />
          ): (
            <p className="font-helvetica">No Data Available</p>
          )
        } items={sortedItems}>
              {(item) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
      </div>
    </Fragment>
  );
};
export default HistoryTable;

HistoryTable.propTypes = {
  setCurrentViewfamily: PropTypes.func,
  seeFeedBack: PropTypes.func,
  makeComment: PropTypes.func,
  isLoading: PropTypes.bool
};
