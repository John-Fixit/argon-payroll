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
  { name: "Name", uid: "name", sortable: true },
  { name: "Employment Type", uid: "type", sortable: true },
  { name: "Employee No", uid: "employee_no", sortable: true },
  { name: "Grade", uid: "grade", sortable: true },
  { name: "Directorate", uid: "directorate", sortable: true },
  { name: "Exit Year", uid: "exit_year", sortable: true },
  { name: "Remark", uid: "remark", sortable: true },
  { name: "By", uid: "by", sortable: true },
  { name: "Attachment", uid: "actions" },
];

const Suspension_ExitStaffTable = ({
  tableData,
  handleOpenDrawer,
  isPending,
}) => {
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
                className="uppercase font-helvetica text-[0.8rem]"
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
                          <ActionIcons variant={"View"} />
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

Suspension_ExitStaffTable.propTypes = {
  tableData: PropTypes.array,
  handleOpenDrawer: PropTypes.func,
  isPending: PropTypes.bool,
};

export default Suspension_ExitStaffTable;
