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
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import ActionIcons from "../../shared/ActionIcons";

const tableColumns = [
  { name: "Month", uid: "month", sortable: true },
  { name: "Year", uid: "Year", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Action", uid: "actions" },
];

const PayRunTable = ({ tableData, handleOpenDrawer, isPending }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const pages = useMemo(() => {
    return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
  }, [tableData]);

  return (
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
                          {/* <ActionIcons
                              variant={"EDIT"}
                            /> */}
                          <button
                            // onClick={() => handleRecompute()}
                            className="bg-btnColor px-2 py-0.5 outline-none  text-white rounded text-xs font-helvetica hover:bg-btnColor/70"
                          >
                            Push to staff
                          </button>
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

PayRunTable.propTypes = {
  tableData: PropTypes.array,
  handleOpenDrawer: PropTypes.func,
  isPending: PropTypes.bool,
};

export default PayRunTable;
