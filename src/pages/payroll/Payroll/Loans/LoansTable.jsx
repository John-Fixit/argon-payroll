/* eslint-disable no-unused-vars */
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import ActionIcons from "../../../../components/core/shared/ActionIcons";
import Label from "../../../../components/forms/FormElements/Label";
import { formatNumberWithComma } from "../../../../utils/utitlities";

const tableColumns = [
  { name: "Loan Name", uid: "name", sortable: true },
  { name: "Staff", uid: "fullname", sortable: true },
  { name: "emp. No", uid: "empno", sortable: true },
  { name: "Principal(₦)", uid: "principal", sortable: true },
  { name: "Duration", uid: "duration", sortable: true },
  { name: "Monthly payment(₦)", uid: "amount_to_pay", sortable: true },
];

const LoansTable = ({ tableData, handleOpenDrawer, isPending }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [filterValue, setFilterValue] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const hasSearchFilter = Boolean(filterValue?.trim());

  const pages = useMemo(() => {
    setCurrentPage(1);
    return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
  }, [tableData]);

  const filteredItems = useMemo(() => {
    let filteredData = tableData?.length ? [...tableData] : [];

    if (hasSearchFilter) {
      const value = filterValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = tableData?.filter((item) => {
        const fullName = `${item?.first_name} ${item?.last_name}`.toLowerCase();

        const matches = [
          item?.fullname?.toLowerCase(),
          item?.name?.toLowerCase(),
          item?.empno?.toLowerCase(),
          fullName,
        ].some((field) => field?.includes(value));

        const fullNameMatches = searchTerms.every((term) =>
          fullName.includes(term)
        );

        return matches || fullNameMatches;
      });

      filteredData = updatedData.length ? updatedData : [];
    }

    return filteredData;
  }, [tableData, hasSearchFilter, filterValue]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [currentPage, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  return (
    <>
      <div className="mb-2 mt-10 flex justify-between items-center">
        <div className="mb-3 flex flex-col max-w-lg">
          <Label htmlFor="to">Search</Label>
          <Input
            allowClear
            value={filterValue}
            placeholder="Search here..."
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full !max-w-lg"
            size="large"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="20">20</option>
              <option value="500">50</option>
              <option value="100">100</option>
              <option value={filteredItems?.length}>All</option>
            </select>
          </label>
        </div>
      </div>
      <div>
        <Table
          aria-label="Attribute Table"
          isHeaderSticky
          isStriped
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <TableHeader>
            {tableColumns?.map((column, index) => {
              return (
                <TableColumn
                  key={index + "____Table_head"}
                  className="uppercase font-helvetica text-sm"
                >
                  {column?.name}
                </TableColumn>
              );
            })}
          </TableHeader>
          <TableBody
            emptyContent={
              <div className="flex items-center justify-center text-2xl">
                {" "}
                Empty data
              </div>
            }
          >
            {paginatedData?.map((row, rowIndex) => (
              <TableRow key={rowIndex + "__table_row"}>
                {tableColumns?.map((column, index) => (
                  <TableCell
                    key={rowIndex + "__table_column" + index + "___"}
                    className=""
                  >
                    <div
                      className={`font-helvetica ${
                        column?.uid !== "actions" && "opacity-60"
                      } text-[0.80rem] ${
                        column?.uid === "name" && "uppercase"
                      } ${column?.uid !== "code" && "capitalize"}`}
                    >
                      {column?.uid === "actions" ? (
                        <div className="flex ">
                          <div className="pl-4 flex items-center">
                            <ActionIcons
                              variant={"EDIT"}
                              action={() => handleOpenDrawer(row)}
                            />
                          </div>
                        </div>
                      ) : column?.uid === "regular" ? (
                        <>{row?.is_regular ? "Yes" : "No"}</>
                      ) : column?.uid === "type" ? (
                        <>{row?.pay_deduct ? "Deduction" : "Income"}</>
                      ) : column?.uid === "amount_to_pay" ? (
                        formatNumberWithComma(row?.amount_to_pay)
                      ) : column?.uid === "principal" ? (
                        formatNumberWithComma(row?.principal) || "-"
                      ) : (
                        row[column?.uid] || "-"
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
            showControls={true}
          />
        </div>
      </div>
    </>
  );
};

LoansTable.propTypes = {
  tableData: PropTypes.array,
  handleOpenDrawer: PropTypes.func,
  isPending: PropTypes.bool,
};

export default LoansTable;
