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
import { columns, users, statusOptions } from './data'
import PreviewTicketRequest from './PreviewTicketRequest'
import ActionButton from '../../../../../components/forms/FormElements/ActionButton'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

const INITIAL_VISIBLE_COLUMNS = [
  'ticket id',
  'ticket subject',
  'assigned staff',
  'created date',
  'last reply',
  'priority',
  'status',
  'actions',
]

export default function TicketTable2() {
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handlePreview = () => {
    setIsDrawerOpen(true)
  }
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  })
  const [page, setPage] = React.useState(1)

  const pages = Math.ceil(users.length / rowsPerPage)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

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
  }, [users, filterValue, statusFilter])

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
      case 'ticket id':
        return (
          <User
            avatarProps={{
              radius: 'sm',
              size: 'md',
              name: user.ticketID?.toUpperCase(),
            }}
            classNames={{
              description: 'text-default-500',
            }}
            description={user.ticketID}
            name={cellValue}
          ></User>
        )
      case 'ticket subject':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-tiny capitalize text-default-400'>
              {user.ticketSub}
            </p>
          </div>
        )
      case 'assigned staff':
        return (
          <User
            avatarProps={{ radius: 'full', size: 'sm', src: user.avatar }}
            classNames={{
              description: 'text-default-500',
            }}
            description={user.name}
          >
            {user.name}
          </User>
        )
      case 'status':
        return (
          <div className=''>
            <Dropdown className='bg-background border-1 border-default-200'>
              <DropdownTrigger>
                <Chip
                  className='capitalize border-none gap-1 text-default-600'
                  color={statusColorMap[user.status]}
                  size='sm'
                  variant='solid'
                >
                  {cellValue}
                </Chip>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.paused}
                    size='sm'
                    variant='dot'
                  >
                    Cancelled
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.paused}
                    size='sm'
                    variant='dot'
                  >
                    on Hold
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.vacation}
                    size='sm'
                    variant='dot'
                  >
                    Open
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.vacation}
                    size='sm'
                    variant='dot'
                  >
                    Reopened
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.active}
                    size='sm'
                    variant='dot'
                  >
                    Closed
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.active}
                    size='sm'
                    variant='dot'
                  >
                    In progress
                  </Chip>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      case 'last reply':
        return (
          <div className=''>
            <p className='text-bold text-small capitalize'>{user?.lastReply}</p>
            <p
              className={`${
                user?.timeline === 'overdue' ? 'text-red-500' : ''
              } capitalize`}
            >
              {user?.timeline}
            </p>
          </div>
        )
      case 'priority':
        return (
          <div className='relative flex justify-end items-center gap-2'>
            <Dropdown className='bg-background border-1 border-default-200'>
              <DropdownTrigger>
                <Chip
                  className='capitalize border-none gap-1 text-default-600'
                  color={statusColorMap[user.status]}
                  size='sm'
                  variant='solid'
                >
                  {cellValue}
                </Chip>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.paused}
                    size='sm'
                    variant='dot'
                  >
                    High
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    color={statusColorMap.vacation}
                    size='sm'
                    variant='dot'
                  >
                    Medium
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className='capitalize border-none gap-1 text-default-600'
                    // color={statusColorMap[user.status.active]}
                    color={statusColorMap.active}
                    size='sm'
                    variant='dot'
                  >
                    Low
                  </Chip>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      case 'created date':
        return (
          <p className='text-bold text-small capitalize'>{user?.lastReply}</p>
        )
      case 'actions':
        return (
          <div className='relative flex justify-end items-center gap-2'>
            <Dropdown className='bg-background border-1 border-default-200'>
              <DropdownTrigger>
                <Button isIconOnly radius='full' size='sm' variant='light'>
                  <svg
                    aria-hidden='true'
                    fill='none'
                    focusable='false'
                    height={24}
                    role='presentation'
                    viewBox='0 0 24 24'
                    width={24}
                  >
                    <path
                      d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
                      fill='currentColor'
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={handlePreview}>
                  <ActionButton className='w-full'>View</ActionButton>
                </DropdownItem>
                <DropdownItem>
                  <ActionButton className='w-full'>Edit</ActionButton>
                </DropdownItem>
                <DropdownItem>
                  <ActionButton className='w-full'>Delete</ActionButton>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )

      default:
        return cellValue
    }
  }, [])

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color='default'
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant='light'
          onChange={setPage}
        />
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h[382px]', 'max-w3xl', 'bg-white'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        'border-b py-2',
        'border-divider',
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  )

  return (
    <>
      {/* <Table
        isCompact
        removeWrapper
        aria-label='Example table with custom cells, pagination and sorting'
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        checkboxesProps={{
          classNames: {
            wrapper:
              'after:bg-foreground  after:text-background text-background',
          },
        }}
        className='bg-white p-2 border overflow-auto rounded'
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode='multiple'
        sortDescriptor={sortDescriptor}
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
      </Table> */}
      <Table
        isStriped
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px] ',
        }}
        className={classNames}
        selectedKeys={selectedKeys}
        //   selectionMode='multiple'
        sortDescriptor={sortDescriptor}
        // topContent={topContent}
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
        <PreviewTicketRequest
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
