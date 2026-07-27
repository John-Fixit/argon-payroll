/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import React, { useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Pagination,
} from "@nextui-org/react";
import { useClassNames } from "../../../utils/tableClassNames";
import { toStringDate } from "../../../utils/utitlities";
import ActionIcons from "../../../components/core/shared/ActionIcons";
import { filePrefix } from "../../../utils/filePrefix";
import StarLoader from "../../../components/core/loaders/StarLoader";



const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export default function RequestTable2({handleOpenDrawer, rows, role, requestStatus, isLoading}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
 
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "creator",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  
  const hasSearchFilter = Boolean(filterValue);


const visibleColumns = useMemo(() => {
  return new Set(requestStatus === "pending" ?  [
      "REQUEST_TYPE",
      "REQUEST_DATE",
      "ACTIONS"
    ] : [
      "REQUEST_TYPE",
      "REQUEST_DATE",
      "DATE_TREATED",
      "ACTIONS"
    ]) 
}, [requestStatus])


const columns = useMemo(() => {
return requestStatus === "pending" ? [
    {name: "REQUEST TYPE", uid: "REQUEST_TYPE", sortable: true},
    {name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true},
    {name: "ACTIONS", uid: "ACTIONS",},
  ] :  [
    {name: "REQUEST TYPE", uid: "REQUEST_TYPE", sortable: true},
    {name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true},
    {name: "DATE TREATED", uid: "DATE_TREATED", sortable: true},
    {name: "ACTIONS", uid: "ACTIONS",},
  ] 
}, [requestStatus])





useEffect(() => {
  setPage(1)
}, [requestStatus])
  


  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredrows = [...rows];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredrows = filteredrows.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredrows;
  }, [rows, statusFilter]);

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / rowsPerPage);

  }, [filteredItems, rowsPerPage])
  

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


  const renderCell = React.useCallback((request, columnKey) => {
    const cellValue = request[columnKey];
    switch (columnKey) {
      case "STAFF":
        return  <User
        avatarProps={{ radius: "lg", src: request?.FILE_NAME ?  filePrefix + request?.FILE_NAME : "" }}
        name={(`${request?.LAST_NAME || ''} ${request?.FIRST_NAME || ''}`)}
    >
        {request?.LAST_NAME}  {request?.FIRST_NAME}
    </User>;
      case "REQUEST_TYPE":
        return <p className="font-helvetica text-[0.82rem] opacity-45 capitalize">{request?.PACKAGE_NAME}</p>;
     
        case "REQUEST_DATE":
          return <p className="font-helvetica text-[0.82rem] opacity-45">{ toStringDate(cellValue)}</p>;
        case "DATE_TREATED":
          return <p className="font-helvetica text-[0.82rem] opacity-45 "> {cellValue ? toStringDate(cellValue) : 'NIL'}</p>;
        case "ACTIONS":
        return (
          <div className="relative flex gap-2 py-2 pl-4">
            <ActionIcons variant={"VIEW"} action={()=>handleOpenDrawer(request?.REQUEST_ID, request?.PACKAGE_NAME)}/>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);





const bottomContent = React.useMemo(() => {
    return (
      <div className='py-4 px-2 flex mx-4 justify-between items-center'>
        <Pagination
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color='default'
          total={pages}
          page={page}
          initialPage={1}
          variant='light'
          onChange={setPage}
        />
      </div>
    )
  }, [page, pages])

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isStriped
      isHeaderSticky
      showSelectionCheckboxes={true}
      radius="none"
      shadow="none"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={useClassNames()}
      className="w-full mt-5"
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            className="uppercase"
          >
             <span className="font-helvetica text-black text-[0.80rem] opacity-80">
             {column.name}
           </span>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
       emptyContent={
          isLoading? (
            <StarLoader />
          ): (
            <p className="font-helvetica">No Data Available</p>
          )
        } items={sortedItems}>
        {(item, index) => (
          <TableRow key={item?.REQUEST_ID}>
            {(columnKey) => (
              <TableCell className="font-helvetica">{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
