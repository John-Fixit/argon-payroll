/* eslint-disable react/prop-types */


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
  Pagination,
  Input,
} from '@nextui-org/react'
import { PlusIcon, SearchIcon } from 'lucide-react'
import {  MdDeleteOutline } from 'react-icons/md'

import { columns, data, statusOptions } from './data'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { FaEdit } from 'react-icons/fa'
import Drawer from './Drawer'
// import RequestRoomDrawer from '../profile/profileDrawer/RequestRoomDrawer'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

const INITIAL_VISIBLE_COLUMNS = [
  's/n',
  'name',
  'day',
  'date',
  'actions',
]
// const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'start date', 'end date',  'status', 'actions']

const HolidayTable = ({tabName}) => {

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
  const [isCreate, setIsCreate] = useState(false)


  const handleEditClick = () => {
    setIsDrawerOpen(true)
    setIsCreate(false)
  }
  const handleCreateClick = () => {
    setIsDrawerOpen(true)
    setIsCreate(true)
  }

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data]

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
  }, [filterValue, statusFilter, hasSearchFilter])

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

  const renderCell = React.useCallback((inst, columnKey) => {
    const cellValue = inst[columnKey]

 

    switch (columnKey) {
      case 's/n':
        return (
            <p className='text-bold text-tiny capitalize text-default-400'>
            {inst?.id}
          </p>
        )
      case 'name':
        return (
            <p className='text-bold text-tiny capitalize text-default-400'>
            {inst?.name}
          </p>
        )
      case 'day':
        return (
            <p className='text-bold text-tiny capitalize text-default-400'>
            {inst?.day}
          </p>
        )
      case 'date':
        return (
            <p className='text-bold text-tiny capitalize text-default-400'>
            {inst?.date}
          </p>
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
                <DropdownItem className='flex'>
                    <div className='flex gap-x-2  items-center'  onClick={() => handleEditClick()}>
                    <FaEdit size={20} className='text-green-600' />
                    <div className='text-green-600' >Edit</div>
                    </div>
                </DropdownItem>
                <DropdownItem className='flex '>
                   <div className='flex gap-x-2 items-center'>
                    <MdDeleteOutline size={20} color='red'/>
                    <div  className='text-red-500' >Delete</div>
                   </div>
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

        <div className="flex flex-col gap-4">
                <div className='flex flex-wrap justify-between gap-4'>
                    <Input
                    isClearable
                    className='w-full sm:max-w-[44%]'
                    placeholder='Search...'
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                    />
                    <div className='flex gap-3 my-2 justify-end  '>
                    <Button
                        className='bg-[#00bcc2] text-white'
                        endContent={<PlusIcon />}
                        onClick={handleCreateClick}
                    >
                        Add New
                    </Button>
                    </div>


                </div>
                    <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {data.length} {tabName}</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                        >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        </select>
                    </label>
                    </div>



        </div>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    data.length,
    onSearchChange,
    hasSearchFilter,
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
       

        <Pagination
          isCompact
          showControls
          // showShadow
          classNames={{
            wrapper: "gap-0 overflow-visible h-full rounded-xl bg-transparent  shadow",
            item: "w-10 h-10 text-small rounded-none bg-transparent",
            active:'bg-red-500',
            cursor:
              "bg-btnColor shadow-md from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
      
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
    <>
      <Table
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
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
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

        <Drawer isOpen={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)} isCreate={isCreate} tabName={tabName} />
      
    </>
  )
}

export default HolidayTable