import {
  Avatar,
  AvatarGroup,
  Chip,

  Pagination,

  // Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import {  removeHTMLTagsAndStyles, toStringDate } from "../../../../../utils/utitlities";

import propTypes from "prop-types";
import useMemoData from "../../../../../hooks/useMemoData";
import ActionIcons from "../../../../../components/core/shared/ActionIcons";
import { useMemo, useState } from "react";
import { filePrefix } from "../../../../../utils/filePrefix";


// const filePrefix = 'http://lamp3.ncaa.gov.ng/pub/'


 const statusColorMap = {
  approved: "success",
  declined: "danger",
  pending: "warning",
  draft: "warning",
  received: "secondary",
};

const Memotable = ({ memoData, handleOpenDrawer, onEditDrawer, status }) => {
  const {updateData} = useMemoData()
  const [page, setPage] = useState(1);

const hanleDraftMemo = (draft)=>{
    const approv =  draft?.APPROVALS?.length ?  draft?.APPROVALS?.split(',')?.map(el => Number(el)) : []
  const json = {
    memo_subject: draft?.SUBJECT,
    content: draft?.MEMO_CONTENT,
    staff_id: null,
    from: null,
    recipient_type: draft?.RECIPIENT_TYPE,
    recipient_value: null,
    recipients: [],
    approvals: approv,
    is_draft: 0,
    package_id: 19,
    company_id: null,
    memo_number: null,
    memo_id: draft?.MEMO_ID
  }
  updateData(json)
  onEditDrawer()
}

const rowsPerPage = 10;
const pages = useMemo(() => {
 return Math.ceil(memoData.length / rowsPerPage);
}, [memoData])



const items = useMemo(() => {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  return memoData.slice(start, end);
}, [page, memoData, rowsPerPage]);







const bottomContent = useMemo(() => {
  return (
    <div className='py-2 px-2 mx-5 flex justify-between items-center'>
      <Pagination
        classNames={{
          cursor: 'bg-foreground text-background',
        }}
        color='default'
        page={page}
        total={pages}
        initialPage={1}
        variant='light'
        onChange={setPage}
      />
    </div>
  )
}, [page, pages,])





  return (
    <div className=" flex flex-col py-10">
      <Table
      isHeaderSticky
      isStriped
      bottomContentPlacement="outside"
      bottomContent={bottomContent}
        aria-label="Attendance Table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          <TableColumn>SUBJECT</TableColumn>
          <TableColumn>CONTENT</TableColumn>
          <TableColumn>CREATED DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>APPROVAL</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex items-center justify-center text-xl">
              {" "}
              No record found
            </div>
          }
        >
          {items?.map((memo) => (
            <TableRow key={memo?.REQUEST_ID}>
              <TableCell>
                <h4 className="font-[500] text-[13px] text-[#333] font-[circularstd, sans-serif] leading-[21.6px] text-start w-40">
                  {memo?.SUBJECT.length < 20
                    ? memo?.SUBJECT
                    : memo?.SUBJECT?.substring(0, 20) + "..."}
                </h4>
              </TableCell>
              <TableCell>
                <div className="!text-[#8e8e8e] font-[circularstd, sans-serif] font-[500] leading-[22px] text-[13px] line-clamp-2">
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        removeHTMLTagsAndStyles(memo.MEMO_CONTENT)
                       
                    }}
                  />
                </div>
              </TableCell>
              {/* <TableCell>
                <div className="text-[#8e8e8e] text-[13px]  font-[500] leading-[22px] my-auto flex gap-2 items-center">
                  <Avatar
                    src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-16.jpg"
                    className="h-[26px] w-[26px]"
                  />
                  <span>{memo?.created_by}</span>
                </div>
              </TableCell> */}
              <TableCell>
                <p className="text-[#8e8e8e] text-[13px] font-[500] leading-[22px] my-auto">
                { (memo?.REQUEST_DATE?.length > 11 || memo?.DATE_CREATED > 11) ? toStringDate(memo?.REQUEST_DATE) : memo?.DATE_CREATED}
                </p>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={statusColorMap[status]}
                  size="sm"
                  variant="flat"
                >
                  {status}
                </Chip>
              </TableCell>

              <TableCell>
                <AvatarGroup>
                  {
                    memo?.APPROVALS_DETAILS?.map((apv, i) =>(
                      <Tooltip   showArrow content={ <div className="flex flex-col gap-2">
                            <div className=" text-default-400 text-xs">
                            {apv?.LAST_NAME}  {apv?.FIRST_NAME}
                            </div>
                            <div className=" text-default-300 text-xs">
                                <Chip size="sm" className="text-default-400">DEPT</Chip> {apv?.DEPARTMENT_NAME}
                            </div>
                      </div>}    key={i}>
                        <Avatar className="cursor-pointer" size="sm" isBordered  src={ apv?.FILE_NAME ? (filePrefix + apv?.FILE_NAME ) : ""} name={(apv?.LAST_NAME + apv?.FIRST_NAME)[0]} />
                      </Tooltip>
                    ))
                  }
                </AvatarGroup>
                
              </TableCell>

              <TableCell>
                <div className=" flex items-center justify-center">
                { status=== 'Draft' ?   <ActionIcons variant={"EDIT"} action={  ()=>hanleDraftMemo(memo)}/> :
                <ActionIcons variant={"VIEW"} action={() =>  handleOpenDrawer('viewMemo', memo)}/>
                  }
                 
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <div className="flex justify-center mt-4">
        {
          <Pagination
            total={2}
            initialPage={1}
            page={2}
            onChange={(page) => console.log(page)}
          />
        }
      </div> */}
    </div>
  );
};

Memotable.propTypes = {
  memoData: propTypes.any,
  data: propTypes.any,
  status: propTypes.any,
  handleOpenDrawer: propTypes.func,
  onEditDrawer: propTypes.func
};
export default Memotable;
