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
  
  const OverallVariation = ({ tableData}) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const rowsPerPage = 30;
    const pages = useMemo(() => {
      return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
    }, [tableData]);
  
    return (
      <div className="m-0 P-0">
         <div className="flex justify-between items-center">
          <h2 className=" text-[1.2rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">
            ANNUAL VARIATION DETAILS
          </h2>
        </div>
        <ul className=" mt-2 text-[15px] flex flex-col space-y-3 mb-5">
              <li
                className=" grid grid-cols-3  my-1 border-b pb-1"
              >
                <span className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize ">
                  {" "}
                  FULLNAME:
                </span>
                <span className="text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize ">
                  ABAH ISAAC
                </span>
              </li>
              <li
                className=" grid grid-cols-3  my-1 border-b pb-1"
              >
                <span className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize ">
                  {" "}
                  STAFF NUMBER:
                </span>
                <span className="text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize ">
                  NCAA/P.3423
                </span>
              </li>
              <li
                className=" grid grid-cols-3  my-1 border-b pb-1"
              >
                <span className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize ">
                  {" "}
                  DEPARTMENT:
                </span>
                <span className="text-[#888888] col-span-2  text-en w-full  max-w-sm fontbold font-profileFontSize ">
                AIRWORTHINESS STANDARDS & APPROVALS (ASA)
                </span>
              </li>
              <li
                className=" grid grid-cols-3  my-1 border-b pb-1"
              >
                <span className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize ">
                  {" "}
                  DIRECTORATE:
                </span>
                <span className="text-[#888888] col-span-2  text-en w-full  fontbold font-profileFontSize ">
                DIRECTORATE OF AIRWORTHINESS STANDARD
                </span>
              </li>
          </ul>



        <Table
          aria-label="Variation detail Table"
          isHeaderSticky
          isStriped
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <TableHeader>
            <TableColumn>ATTRIBUTE</TableColumn>
            <TableColumn>CURRENT AMOUNT</TableColumn>
            <TableColumn>VARIATION AMOUNT</TableColumn>
            <TableColumn>CURRENT GRADE</TableColumn>
            <TableColumn>CURRENT STEP</TableColumn>
            <TableColumn>VARIATION GRADE</TableColumn>
            <TableColumn>VARIATION STEP</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              <div className="flex items-center justify-center text-2xl">
                {" "}
                Empty data
              </div>
            }
          >
            {tableData?.map((record, i) => (
              <TableRow key={i}>
                <TableCell className="text-default-500">
                  BASIC SALARY
                </TableCell>
                <TableCell className="text-default-500">
                  0.00
                </TableCell>
                <TableCell className="text-default-500">
                  33,2323
                </TableCell>
                <TableCell className="text-default-500">
                 23
                </TableCell>
                <TableCell className="text-default-500">
                 7
                </TableCell>
                <TableCell className="text-default-500">
                 11
                </TableCell>
                <TableCell className="text-default-500">
                 6
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
  
  
  OverallVariation.propTypes = {
    tableData: PropTypes.array,
    viewDetail: PropTypes.func,
    isPending: PropTypes.bool,
  };
  
  export default OverallVariation;











