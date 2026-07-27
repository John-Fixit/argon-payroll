/* eslint-disable no-unused-vars */
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
import { Avatar } from "antd";

const tableColumns = [
  { name: "Staff", uid: "staff", sortable: true },
  { name: "Date Added", uid: "dateAdded", sortable: true },
  { name: "Expiry Date", uid: "expiryDate", sortable: true },
  { name: "Action", uid: "actions" },
];

const SuspensionTable = ({ tableData, handleOpenDrawer, isPending }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const pages = useMemo(() => {
    return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
  }, [tableData]);

  const colors = [
    { color: "#f56a00" },
    { color: "#F2383A" },
    { color: "#5A6ACF" },
    { color: "#F99C30" },
  ];

  return (
    <div className="mt-5">
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
          {tableData?.map((row, rowIndex) => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return (
              <TableRow key={rowIndex + "__table_row"}>
                {tableColumns?.map((column, index) => (
                  <TableCell
                    key={rowIndex + "__table_column" + index + "___"}
                    className=""
                  >
                    <div
                      className={`font-helvetica ${
                        column?.uid !== "actions" &&
                        column?.uid !== "staff" &&
                        "opacity-60"
                      } text-[0.80rem] ${
                        column?.uid !== "code" && "capitalize"
                      }`}
                    >
                      {column?.uid === "staff" ? (
                        <div className="flex items-center gap-2">
                          <div>
                            <Avatar
                              src={null} //"https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                              size={"large"}
                              style={{
                                backgroundColor: `${colors?.[randomIndex]?.color}`,
                                opacity: 0.7,
                              }}
                            >
                              {row?.FIRST_NAME?.trim()[0]}
                              {row?.LAST_NAME?.trim()[0]}
                            </Avatar>
                          </div>

                          <div className="flex flex-col gap-y-1 justify-center">
                            <p className="font-helvetica my-auto text-black text-sm opacity-50 capitalize">
                              {`${row?.LAST_NAME || ""} ${
                                row?.FIRST_NAME ||
                                row[column?.uid]?.toLowerCase() ||
                                ""
                              }`}
                            </p>
                            <p className="font-helvetica my-auto text-black opacity-40 capitalize">
                              {row?.DEPARTMENT?.toLowerCase()}
                            </p>
                            <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                              {row?.UNIT}
                            </p>
                          </div>
                        </div>
                      ) : column?.uid === "actions" ? (
                        <div className="flex">
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
            );
          })}
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

SuspensionTable.propTypes = {
  tableData: PropTypes.array,
  handleOpenDrawer: PropTypes.func,
  isPending: PropTypes.bool,
};

export default SuspensionTable;
