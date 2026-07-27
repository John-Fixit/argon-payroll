/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
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
import { EditIcon, EyeIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { columns, users, statusOptions } from './datas/familydata'
import { BsThreeDotsVertical } from 'react-icons/bs'
import FamilyInformationDrawer from '../profile/profileDrawer/FamilyInformationDrawer'
import { getProfile, useGetProfile } from '../../API/profile'
import useCurrentUser from '../../hooks/useCurrentUser'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

const INITIAL_VISIBLE_COLUMNS = ['name', 'dob', 'email', 'phone', 'actions']

export default function FamilyTable() {
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
  const { userData } = useCurrentUser()
  // const { data: profile, isLoading } = useGetProfile({ user: userData?.data, path: "/profile/get_profile" })

  const [familyInfo, setFamilyInfo] = useState([])

  const familyDetails = async () => {
    try {
      const res = await getProfile(userData?.data)
      const { FAMILY } = res

      const familyArray = Object.entries(FAMILY).map(([key, value]) => ({
        id: key,
        ...value,
      }))

      setFamilyInfo([
        ...familyArray.filter(
          (f) =>
            f?.id !== 'PACKAGE_ID' &&
            f?.id !== 'HAS_PENDING_APPROVAL' &&
            f?.id !== 'PENDING_REQUEST_ID'
        ),
      ])
      return familyArray
    } catch (error) {
      console.error('Error fetching bio details:', error)
      throw error
    }
  }

  // console.log(familyInfo, 'fmilyinfo')

  useEffect(() => {
    familyDetails()
  }, [])
  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    // if (visibleColumns === 'all') return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    // let filteredUsers = [...users]
    let filteredUsers = [...familyInfo]

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
  }, [familyInfo, filterValue, statusFilter])

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
          <User
            avatarProps={{ radius: 'lg', src: user?.avatar }}
            description={user?.relationship}
            name={cellValue}
          >
            {user?.email}
          </User>
        )
      case 'email':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small capitalize'>{cellValue}</p>
          </div>
        )
      case 'phone':
        return <p className='text-bold text-small capitalize'>{user?.phone}</p>
      case 'dob':
        return (
          <p className='text-bold text-tiny capitalize text-default-400'>
            {user?.dob}
          </p>
        )

      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
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
                    <EyeIcon className='text-green-500' />
                    <span className='capitalize'>view</span>
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
        <div className='flex  justify-end my-2 gap-3 items-center'>
          {/* <h1>Family </h1> */}

          <Button
            className='bg-[#00bcc2] text-white'
            endContent={<PlusIcon />}
            onClick={handleEditClick}
          >
            Add New
          </Button>
        </div>
      </div>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    familyInfo?.length,
    // users.length,
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
          wrapper: '  max-h-[40rem] 2xl:max-w[80rem]',
        }}
        className='overflow-hidden fontOswald'
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
        <TableBody
          emptyContent={familyInfo?.length === 0 ? 'No Family found' : ''}
          items={sortedItems}
        >
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
        <FamilyInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
