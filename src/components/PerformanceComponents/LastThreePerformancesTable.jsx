/* eslint-disable no-unused-vars */


import React from "react";
import PropTypes from 'prop-types'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
} from "@nextui-org/react";
// import { useClassNames } from "../../../utils/tableClassNames";
import { useClassNames } from "../../utils/tableClassNames";

const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);


const lastThreePerformance = [
  {
    _id: 1,
    desc: "Okele Ayore",
    date: "2024-09-02",
    amount: "30",
  },
  {
    _id: 2,
    desc: "Okele Ayore",
    date: "2024-09-02",
    amount: "30",
  },
  {
    _id: 3,
    desc: "Okele Ayore",
    date: "2024-09-14",
    amount: "30",
  },
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  {name: "Name", uid: "desc", sortable: true},
  {name: "date", uid: "date"},
  {name: "Score", uid: "amount"},
];

const INITIAL_VISIBLE_COLUMNS = [
  "desc",
  "date",
  "amount"
];

const LastThreePerformancesTable = ({handleOpenDrawer}) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "creator",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredrows = [...lastThreePerformance];

    if (hasSearchFilter) {
      filteredrows = filteredrows.filter((user) =>
        user?.desc.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredrows = filteredrows.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredrows;
  }, [lastThreePerformance, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "s_n":
        return (
          <p className="text-bold text-small whitespace-wrap">{user?._id}</p>
        );
      case "desc":
        return <p className="text-bold text-small uppercase w-[35vh]">{cellValue}</p>;
      
      case "date":
        return <p className="text-bold text-small">{cellValue}</p>;
      case "amount":
        return <p className="text-bold text-small">{cellValue}</p>;
       
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);


//     return (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <span className="w-[30%] text-small text-default-400">
//           {
//           selectedKeys.size===0?
//           (<span className="text-default-400 text-small">
//           Total {lastThreePerformance.length} Staff
//         </span>) : (
//           selectedKeys === "all"
//             ? "All items selected"
//             : `${selectedKeys.size} of ${filteredItems.length} selected`
//           ) 
//             }
//         </span>
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           classNames={{
//             wrapper:
//               "gap-0 overflow-visible h-full rounded-xl bg-transparent  shadow",
//             item: "w-10 h-10 text-small rounded-none bg-transparent",
//             active: "bg-red-500",
//             cursor:
//               "bg-btnColor shadow from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
//           }}
//           page={page}
//           total={pages}
//           onChange={setPage}
//         />
//         <div className="hidden sm:flex w-[30%] justify-end gap-2">
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onPreviousPage}
//           >
//             Previous
//           </Button>
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onNextPage}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     );
//   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);



  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isStriped
      showSelectionCheckboxes={true}
      // isHeaderSticky
      bottomContentPlacement="outside"
      classNames={useClassNames()}
      // selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            // className=""
             className={`font-medium uppercase ${column.uid === "actions" && "text-center"}`}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No Expense Added"} items={sortedItems}>
        {(item, index) => (
          <TableRow key={item?._id}>
            {(columnKey) => (
              <TableCell className="">{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default LastThreePerformancesTable;

LastThreePerformancesTable.propTypes = {
  handleOpenDrawer: PropTypes.func,
}