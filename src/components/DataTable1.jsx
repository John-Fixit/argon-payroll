/* eslint-disable no-unused-vars */
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import employee_data from "./employee_data";

import MoreDropdown from "./MoreDropdown";
import './table.css'
import ArrowDown from "./ArrowDown";
import MoreRoleDropdown from "./MoreRoleDropdown";

import { Pagination } from 'flowbite-react';

const DataTable1 = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [employeeData, setEmployeeData] = useState(employee_data);
  const [page, setPage] = useState(employee_data.length);


  const EmployeeCustomPagination = () => (
            <div className="flex justify-between my-10 mb-20 mx-10">

              <span>Showing 1 to 7 of 7 entries</span>
              <ReactPaginate
                className="flex"
                previousLabel={"Prev"}
                nextLabel={"Next"}
                forcePage={currentPage}
                onPageChange={(page) => handlePagination(page)}
                pageCount={Math.ceil(employeeData?.length / 2) || 1}
                breakLabel={"..."}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                activeClassName="page-item active text-red-500"
                pageClassName="page-item text-red-500"
                breakClassName="page-item text-red-500"
                nextLinkClassName="page-link text-red-500"
                pageLinkClassName="page-link text-red-500"
                breakLinkClassName="page-link text-red-500"
                previousLinkClassName="page-link text-red-500"

                nextClassName="page-item next-item px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"

                previousClassName="page-item prev-item relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                containerClassName={
                  "pagination mb-0 justify-content-end p-1"
                }
              />

            </div>
  );

  

function PaginateComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex sm:flex-row flex-wrap justify-between my-10 mb-20 mx-15 items-center">
      <div>
        <span>Showing 1 to 7 of 7 entries</span>

      </div>
        <div className="flex overflow-x-auto sm:justify-center min-w-max">
          <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
        </div>
      </div>
  );
}

  const handlePagination = async (page) => {
    setCurrentPage(page.selected);
    
    const thePage = page.selected + 1
    // fetchCall(thePage)
};


  // availableRoles: [ "Software Engineer", "Software Tester", "Frontend Developer", "UI/UX Developer"]
const columns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "150px",
    cell: (row) => {
      return (
        <span className="flex gap-2 items-center" >
            <span className="h-10 w-10 rounded-full flex items-center ">
              <img
                src={row.image}
                alt="User"
                className="rounded-full w-[2rem] h-[2rem]"
              />
            </span>
            <span >
            {row?.name} 
            </span>
        </span>
      );
    },
  },
  {
    name: "Employee ID",
    sortable: true,
    maxWidth: "150px",
    selector: (row) => row?.employeeId
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "100px",
    selector: (row) => row?.email,
  },
  {
    name: "Mobile",
    sortable: true,
    minWidth: "100px",
    selector: (row) => row?.mobile,
  },
  {
    name: "Join Date",
    sortable: true,
    maxWidth: "50px",
    selector: (row) => row?.joinedDate,
  },
  {
    name: "Role",
    sortable: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <MoreRoleDropdown row={row}/>
      );
    },
  },
  {
    name: "Actions",
    allowOverflow: true,
    minWidth: "50px",
    cell: (row, i) => {
      return (
        <div className="d-flex">
            <MoreDropdown bottom={i === employeeData.length -1}/>
        </div>
      );
    },
  },
];







  return (
    <div className="overflow-x-hidden max-w-full">

            <div className="overflow-x-auto">
            <DataTable
              noHeader
              pagination
              paginationServer
              data={employee_data}
              columns={columns}
              expandOnRowClicked
              className="react-dataTable z-1 overflow-visible"
              sortIcon={<TbArrowsSort size={10} />}
              paginationComponent={PaginateComponent}
              paginationDefaultPage={currentPage + 1}
              paginationRowsPerPageOptions={[20, 40, 60, 100]}
              striped={true}
          
            />
          </div>
    </div>
  )
}

export default DataTable1
