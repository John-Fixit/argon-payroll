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
  import ActionIcons from "../../shared/ActionIcons";
  import PropTypes from "prop-types";
  import StarLoader from "../../loaders/StarLoader";
  
  const DetailModal = ({ tableData, viewDetails, isPending}) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const rowsPerPage = 30;
    const pages = useMemo(() => {
      return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
    }, [tableData]);
  
    return (
      <div>
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
            <TableColumn>STAFF NO</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PAYMENT</TableColumn>
            <TableColumn>DEDUCTION</TableColumn>
            <TableColumn >ACTION</TableColumn>
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
                  P11830062
                </TableCell>
                <TableCell className="text-default-500">
                  ABAH ISAAC
                </TableCell>
                <TableCell className="text-default-500">
                  33,2323
                </TableCell>
                <TableCell className="text-default-500">
                 23,444
                </TableCell>
  
                <TableCell>
                  <div className="flex ">
                      {
                      isPending ? (
                        <StarLoader size={20}/>
                      ): (
                          <div className="pl-4 flex items-center">
                            <ActionIcons variant={"VIEW"} action={viewDetails} />
                            <ActionIcons variant={"DELETE"} action={() =>{}} />
                    </div>
                          )}
                      
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
  
  
  DetailModal.propTypes = {
    tableData: PropTypes.array,
    viewDetails: PropTypes.func,
    isPending: PropTypes.bool,
  };
  
  export default DetailModal;
