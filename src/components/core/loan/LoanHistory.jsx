import {
  Chip,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
  } from "@nextui-org/react";
  import { useMemo, useState } from "react";

  import moment from "moment";
  import PropTypes from "prop-types";
  import StarLoader from "../loaders/StarLoader";
  
  const LoanHistoryTable = ({ tableData, isPending  }) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const rowsPerPage = 20;
    const pages = useMemo(() => {
      return Math.ceil(tableData?.length / rowsPerPage) || null; 
    }, [tableData]);




  
    return (
      <div className="mt-52">
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
            <TableColumn>PRINCIPAL</TableColumn>
            <TableColumn>REPAYMENT</TableColumn>
            <TableColumn>APPLICATION DATE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              <div className="flex items-center justify-center text-2xl">

                    {isPending ? (
                            <StarLoader size={20}/>
                          ): 
                "No Data Available"}
              </div>
            }
          >
            {tableData?.map((record, i) => (
              <TableRow key={i}>
                <TableCell className="text-default-500">
                ₦{Number(record?.PRINCIPAL)?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
                </TableCell>
                <TableCell className="text-default-500">
                ₦{ (Number(record?.REPAYMENT_AMOUNT)) ?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
                </TableCell>
                <TableCell className="text-default-500">
                  {moment(record?.CREATED_ON).format("DD MMM YYYY")}
                </TableCell>
                <TableCell align="center">
                  <div className="flex ">
                    <div className="flex items-center">
                     <Chip color={`${record?.STATUS === "Approved" ? 'success': record?.STATUS === "Declined" ? 'danger' : 'secondary'}`}>{record?.STATUS}</Chip>
                    </div>
                  </div>
                </TableCell>
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
  
  
  LoanHistoryTable.propTypes = {
    tableData: PropTypes.array,
    isPending: PropTypes.any,
  };
  
  export default LoanHistoryTable;
  