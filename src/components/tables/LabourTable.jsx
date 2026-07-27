/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from '@nextui-org/react'
import { EditIcon, Eye, PlusIcon, Trash2Icon } from 'lucide-react'
import {
  columns,
  users,
  statusOptions,
  professionalData,
} from './datas/Professionaldata'
import { BsThreeDotsVertical } from 'react-icons/bs'
import LabourInformationDrawer from '../profile/profileDrawer/LabourInformationDrawer'
import { GrDocumentImage } from 'react-icons/gr'
import { useGetProfile } from '../../API/profile'
import { API_URL } from '../../API/api_urls/api_urls'
import moment from 'moment'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

const INITIAL_VISIBLE_COLUMNS = [
  'name',
  // 'type',
  'start date',
  'actions',
  'attachment',
  // 'status',
]
// const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'start date', 'end date',  'status', 'actions']

export default function LabourTable() {
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  })
  const [page, setPage] = React.useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }


   //data request
   const { data: getProfession, isLoading } = useGetProfile({ path: API_URL.getProfession});

   let professionData = getProfession?.data || [] // this will have { package_id, pending, approved}
 
  //  console.log(professionData);


   const updatedApprovedProfession = professionData?.approved?.map((item, index) => ({
    ...item,
    id: `item-${index}`,
  }));
 
   // const { data: certificate, isLoading } = useGetProfile({ path: API_URL.getCertificate})
   // const { data: certificate, isLoading } = useGetProfile({ path: API_URL.getExperience})
   // const { data: certificate, isLoading } = useGetProfile({ path: API_URL.getProfession})






  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    // let filteredUsers = [...users]
    let filteredUsers = updatedApprovedProfession?.length ? [...updatedApprovedProfession] : []

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      )
    }

    return filteredUsers
    // }, [users, filterValue, statusFilter])
  }, [updatedApprovedProfession, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])


     //formatInitialName
     const formatInitialName=(val)=>{
      const words = val?.split(' ');
      const initials = words? words[0][0] + words[words.length - 1][0]: "";
  
      return initials?.toUpperCase();
    }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ name: formatInitialName(user?.PROFESSIONAL_NAME) }}
            name={user?.PROFESSIONAL_NAME}
            size='lg'
          ></User>
        )
      case 'status':
        return (
          <div className='flex flex-col'>
            <Chip
              className='capitalize'
              color={statusColorMap[user.status]}
              size='sm'
              variant='flat'
            >
              {cellValue}
            </Chip>
          </div>
        )
      case 'type':
        return (
          <Chip className='capitalize' size='sm' variant='flat'>
            {user.type}
          </Chip>
        )
      case 'start date':
        return (
          <p className='text-bold text-tiny capitalize text-default-400'>
            {/* {user.start_date} */}
            {moment(user?.END_DATE).format("L")}
          </p>
        )

      case 'attachment':
        return (
          <Chip
            className='capitalize'
            color={statusColorMap[user.status]}
            size='sm'
            variant='flat'
            classNames={{
              base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
              content: 'drop-shadow shadow-black text-white',
            }}
          >
            {/* {cellValue} */}
            {user?.FILE_NAME ?? "NIL"}
          </Chip>
        )
      case 'actions':
        return (
          <div className='relative flex justifyend items-center gap-2'>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='md' variant='light'>
                  <BsThreeDotsVertical className='text-black' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Button
                    onClick={() => handleEditClick()}
                    className='flex gap-2 items-center w-full'
                  >
                    <EditIcon className='w-4 h-4' />
                    <span className='capitalize'>Edit</span>
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button className='flex gap-2 text-red-500 items-center w-full'>
                    <Trash2Icon className='text-red-500' />
                    <span className='capitalize'>Delete</span>
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button className='flex gap-2 text-green-500 items-center w-full'>
                    <Eye className='text-green-500' />
                    <span className='capitalize'>View</span>
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )

      default:
        return cellValue
    }
  }, [])

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between my-2 gap-3 items-center'>
          <h1>professonal</h1>
          <div className='flex gap-3 justify-between '>
            <div className='flex bg-btnColor px-4 gap-2 items-center cursor-pointer' onClick={handleEditClick}>
              <button
                className='bg-btnColor  uppercase py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70'
                
              >
                Add
              </button>
              <PlusIcon className='bg-white rounded-full text-btnColor ' />
            </div>
          </div>
        </div>
      </div>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    // users.length,
    updatedApprovedProfession?.length,
    onSearchChange,
    hasSearchFilter,
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
    <>
      <Table
        isStriped
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        className='fontOswald'
        selectedKeys={selectedKeys}
        //   selectionMode='multiple'
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No Data found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isDrawerOpen && (
        <LabourInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
