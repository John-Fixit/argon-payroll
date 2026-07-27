/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
} from '@nextui-org/react'
import { DownloadCloudIcon } from 'lucide-react'
import { MdDeleteOutline } from "react-icons/md";
const columns = [
    { name: 'title', uid: 'title' },
    //   { name: 'ROLe', uid: 'role' },
    //   { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ]
export default function DocumentTable({rows, handleDelete, handleDownloadDoc}) {
  const renderCell = React.useCallback((doc, columnKey) => {
    const cellValue = doc[columnKey]

    switch (columnKey) {
      case 'title':
        return (
          <User
            avatarProps={{ radius: 'lg', src: "https://www.openkm.com/resources/images/icon/document-management-big.png"}}
            description={doc?.description}
            name={cellValue}
          >
            {doc?.description}
          </User>
        )

      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip color='success' content='Download'>
              <span className='text-lg text-[#00bcc2] cursor-pointer active:opacity-50' onClick={()=>handleDownloadDoc(doc?.attachment)}>
                <DownloadCloudIcon />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50' onClick={()=>handleDelete(doc?._id)}>
                <MdDeleteOutline />
              </span>
            </Tooltip>

          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label='Example table with custom cells'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column?.uid}
            align={column?.uid === 'actions' ? 'center' : 'start'}
            className="uppercase text-wrap text-md text-black"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item?._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
