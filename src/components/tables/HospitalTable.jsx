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
  Spinner,
  Avatar,
} from '@nextui-org/react'
import { EditIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { columns, users, statusOptions, hospitals } from './datas/hospitalData'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ActionButton from '../forms/FormElements/ActionButton'
import { useGetProfile } from '../../API/profile'
import { API_URL } from '../../API/api_urls/api_urls'
import { filePrefix } from '../../utils/filePrefix'
// import CertInformationDrawer from '../profile/profileDrawer/CertInformationDrawer'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

const INITIAL_VISIBLE_COLUMNS = ['name', 'address', 'hospital_name']
// const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'start date', 'end date',  'status', 'actions']

export default function HospitalTable() {
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

  const { data: profile } = useGetProfile({
    path: API_URL.getProfile,
    key: "profile",
  });


  const { data: getHospital, isLoading } = useGetProfile({ path: API_URL.getHospital, key: "hospital"})


  let hospitalData = getHospital?.data?.hospitals?.length
  ? getHospital?.data?.hospitals?.map((item, index) => {
      return {
        ...item,
        id: index+"hospital",
        is_family: item?.RELATIONSHIP? true : false,
        NAME: item?.RELATIONSHIP? `${item?.STAFF_FAMILY_FIRST_NAME} ${item?.STAFF_FAMILY_LAST_NAME}`:  `${profile?.BIODATA?.FIRST_NAME} ${profile?.BIODATA?.LAST_NAME}`,
        PICTURE: item?.RELATIONSHIP? item?.FILE_NAME : profile?.PROFILE_PICTURE?.FILE_NAME
      };
    })
  : [];

  
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    // let filteredUsers = [...users]
    let filteredUsers = [...hospitalData]

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
  }, [hospitalData, filterValue, statusFilter])

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <>

            <div className="lg:w-60 md:w-44 w-36 flex items-center gap-2">
         <Avatar
                src={user?.PICTURE? filePrefix+user?.PICTURE : null}
              />
              <div className="flex flex-col">
              <span className="text-sm text-default-400">
        {user?.NAME}
              </span>
              <span className="text-xs text-gray-400">{user?.RELATIONSHIP}</span>
              </div>
        </div>;
          </>
        )

      case 'hospital_name':
        return (
          <p className="lg:w-60 md:w-44 w-36 text-sm text-default-400">{user?.HOSPITAL_NAME}</p>
        )
      case 'address':
        return (
          <p className='lg:w-60 md:w-44 w-36 text-sm text-default-400'>
            {user?.ADDRESS} {user?.LGA} {user?.STATE}
          </p>
        )
      case 'EMAIL':
        return (
          <Chip
            className='text-red-500 text-tiny cursor-pointer'
            size='sm'
            variant='flat'
            classNames={{
              base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
              content: 'drop-shadow shadow-black text-white',
            }}
          >
            {cellValue}
          </Chip>
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
          <h1>HMO Hospitals</h1>
          {/* <div className='flex gap-3 justify-between '>
            <div className='flex bg-btnColor px-4 gap-2 items-center '>
              <button
                className='bg-btnColor  uppercase py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70'
                onClick={handleEditClick}
              >
                Add
              </button>
              <PlusIcon className='bg-white rounded-full text-btnColor ' />
            </div>
          </div> */}
          {/* <button className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"  onClick={handleEditClick}>
                        Add Hospital
                    </button> */}
        </div>
      </div>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    // users.length,
    hospitalData?.length,
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
     {
      isLoading? (
        <div className='flex justify-center items-center'>
        <Spinner color="default"/>
        </div>
      ): (
      <Table
        isStriped
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px] ',
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
        
      )
    }
    </>
  )
}
