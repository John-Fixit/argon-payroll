/* eslint-disable react/no-unescaped-entities */
import { Avatar } from '@nextui-org/avatar'
import Separator from '../../../../../components/payroll_components/Separator'
import { useGetUpcomingBirthday } from '../../../../../API/eventsApis'
import useCurrentUser from '../../../../../hooks/useCurrentUser'
import { Tooltip } from '@nextui-org/react'
import PreviewEventMember from './PreviewEventMember'
import ChatDrawer from '../../../rightMenu/components/ChatDrawer'
import { useContext, useState } from 'react'
import { SocketContext } from '../../../../../context/SocketContext'
import moment from 'moment'
import { filePrefix } from '../../../../../utils/filePrefix'

const AvatarPage = () => {
  const { userData } = useCurrentUser()

  const {
    data: upComingBirthdays,
    isLoading,
    isError,
  } = useGetUpcomingBirthday({
    user: userData?.data,
  })
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [previewFamily, setPreviewFamily] = useState(false)
  const { setCurrentPickedChat } = useContext(SocketContext)
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)

  const selectAChat = (user) => {
    setShowLargeChatContainer(true)
    setSelectedChat(user)
  }

  const setCurrent = (data) => {
    if (data?.STAFF_ID !== userData?.data?.STAFF_ID) {
      selectAChat(data)
      setCurrentPickedChat(data)
    }
  }

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1 // January is 0, so we add 1 to get the actual month

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  // Filter upcoming birthdays for the current month
  const filteredBirthdays = upComingBirthdays.filter(
    ({ DATE_OF_BIRTH }) => parseInt(DATE_OF_BIRTH.slice(5, -3)) === currentMonth
  )

  const groupByMonth = (birthdays) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    return birthdays.reduce((acc, birthday) => {
      const monthIndex = new Date(birthday.DATE_OF_BIRTH).getMonth()
      const monthName = months[monthIndex]
      if (!acc[monthName]) {
        acc[monthName] = []
      }
      acc[monthName].push(birthday)
      return acc
    }, {})
  }

  const groupedBirthdays = groupByMonth(filteredBirthdays)
  const handleCardClick = (memberId) => {
    setSelectedMemberId(memberId)
    setPreviewFamily(true) // Update to open the PreviewFamilyMember drawer
  }
  return (
    <>
      <div className=''>
        {Object.entries(groupedBirthdays).map(([monthName, birthdays]) => (
          <div className='flex gap-4' key={monthName}>
            <div className='w-80'>
              <Separator separator_text={monthName} />
              {birthdays.slice(0, 1).map((birthday, index) => (
                <p key={index} className='pt-4 header_h3'>
                  {birthday?.FIRST_NAME}
                  {''} {''}
                  {birthday?.LAST_NAME} {''} and {birthdays?.slice(0)?.length}{' '}
                  people celebrating
                </p>
              ))}
            </div>

            <div className='grid md:grid-cols-3 pt-12 gap-8'>
              {birthdays?.slice(0, 3)?.map((birthday, index) => (
                <Tooltip
                  key={index}
                  content={
                    <div className='flex flex-col items-center justify-center p-1'>
                        <p>
                          {birthday?.LAST_NAME + ' ' + birthday?.FIRST_NAME}
                        </p>
                        <span className='text-sm text-gray-400'>{moment(birthday?.DATE_OF_BIRTH)?.format("MMMM DD")}</span>
                    </div>
                  }
                >
                  <Avatar
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    className='cursor-pointer'
                    onClick={() => handleCardClick(birthday)}
                    src={
                      birthday?.FILE_NAME
                        ? filePrefix + birthday?.FILE_NAME
                        : '/assets/images/placeholder.jpg' ||
                          '/assets/images/placeholder.jpg'
                    }
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
        {Object.entries(groupedBirthdays).map(([monthName, birthdays]) => (
          <div className='flex gap-4' key={monthName}>
            <div className='w-80'>
              <Separator separator_text={monthName} />
              {birthdays.slice(3, 4).map((birthday, index) => (
                <p key={index} className='pt-4 header_h3'>
                  {birthday?.FIRST_NAME}
                  {''} {''}
                  {birthday?.LAST_NAME} {''} and {birthdays?.slice(3)?.length}{' '}
                  people celebrating
                </p>
              ))}
            </div>

            <div className='grid md:grid-cols-3 pt-12 gap-8'>
              {birthdays.slice(3, 6).map((birthday, index) => (
                <Tooltip
                  key={index}
                  content={
                    <div className='flex flex-col items-center justify-center p-1'>
                        <p>
                          {birthday?.LAST_NAME + ' ' + birthday?.FIRST_NAME}
                        </p>
                        <span className='text-sm text-gray-400'>{moment(birthday?.DATE_OF_BIRTH)?.format("MMMM DD")}</span>
                    </div>
                  }
                >
                  <Avatar
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    className='cursor-pointer'
                    src={
                      birthday?.FILE_NAME
                        ? filePrefix + birthday?.FILE_NAME
                        : '/assets/images/placeholder.jpg' ||
                          '/assets/images/placeholder.jpg'
                    }
                    onClick={() => handleCardClick(birthday)}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
        {Object.entries(groupedBirthdays).map(([monthName, birthdays]) => (
          <div className='flex gap-4' key={monthName}>
            <div className='w-80'>
              <Separator separator_text={monthName} />
              {birthdays.slice(6, 7).map((birthday, index) => (
                <p key={index} className='pt-4 header_h3'>
                  {birthday?.FIRST_NAME}
                  {''} {''}
                  {birthday?.LAST_NAME} {''} and {birthdays?.slice(6)?.length}{' '}
                  people celebrating
                </p>
              ))}
            </div>

            <div className='grid md:grid-cols-3 pt-12 gap-8'>
              {birthdays.slice(6, 9).map((birthday, index) => (
                <Tooltip
                  key={index}
                  content={
                    <div className='flex flex-col items-center justify-center p-1'>
                        <p>
                          {birthday?.LAST_NAME + ' ' + birthday?.FIRST_NAME}
                        </p>
                        <span className='text-sm text-gray-400'>{moment(birthday?.DATE_OF_BIRTH)?.format("MMMM DD")}</span>
                    </div>
                  }
                >
                  <Avatar
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    className='cursor-pointer'
                    src={
                      birthday?.FILE_NAME
                        ? filePrefix + birthday?.FILE_NAME
                        : '/assets/images/placeholder.jpg' ||
                          '/assets/images/placeholder.jpg'
                    }
                    onClick={() => handleCardClick(birthday)}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
        {Object.entries(groupedBirthdays).map(([monthName, birthdays]) => (
          <div className='flex gap-4' key={monthName}>
            <div className='w-80'>
              <Separator separator_text={monthName} />
              {birthdays.slice(9, 10).map((birthday, index) => (
                <p key={index} className='pt-4 header_h3'>
                  {birthday?.FIRST_NAME}
                  {''} {''}
                  {birthday?.LAST_NAME} {''} and {birthdays?.slice(9)?.length}{' '}
                  people celebrating
                </p>
              ))}
            </div>

            <div className='grid md:grid-cols-3 pt-12 gap-8'>
              {birthdays.slice(9, 12).map((birthday, index) => (
                <Tooltip
                  key={index}
                  content={
                    <div className='flex flex-col items-center justify-center p-1'>
                        <p>
                          {birthday?.LAST_NAME + ' ' + birthday?.FIRST_NAME}
                        </p>
                        <span className='text-sm text-gray-400'>{moment(birthday?.DATE_OF_BIRTH)?.format("MMMM DD")}</span>
                    </div>
                  }
                >
                  <Avatar
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    className='cursor-pointer'
                    src={
                      birthday?.FILE_NAME
                        ? filePrefix + birthday?.FILE_NAME
                        : '/assets/images/placeholder.jpg' ||
                          '/assets/images/placeholder.jpg'
                    }
                    onClick={() => handleCardClick(birthday)}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
        {Object.entries(groupedBirthdays).map(([monthName, birthdays]) => (
          <div className='flex gap-4' key={monthName}>
            <div className='w-80'>
              <Separator separator_text={monthName} />
              {birthdays.slice(12, 13).map((birthday, index) => (
                <p key={index} className='pt-4 header_h3'>
                  {birthday?.FIRST_NAME}
                  {''} {''}
                  {birthday?.LAST_NAME} {''} and {birthdays?.slice(12)?.length}{' '}
                  people celebrating
                </p>
              ))}
            </div>

            <div className='grid md:grid-cols-3 pt-12 gap-8'>
              {birthdays.slice(12, 15).map((birthday, index) => (
                <Tooltip
                  key={index}
                  content={
                    <div className='flex flex-col items-center justify-center p-1'>
                        <p>
                          {birthday?.LAST_NAME + ' ' + birthday?.FIRST_NAME}
                        </p>
                        <span className='text-sm text-gray-400'>{moment(birthday?.DATE_OF_BIRTH)?.format("MMMM DD")}</span>
                    </div>
                  }
                >
                  <Avatar
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    className='cursor-pointer'
                    src={
                      birthday?.FILE_NAME
                        ? filePrefix + birthday?.FILE_NAME
                        : '/assets/images/placeholder.jpg' ||
                          '/assets/images/placeholder.jpg'
                    }
                    onClick={() => handleCardClick(birthday)}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>

      {previewFamily && (
        <PreviewEventMember
          isOpen={previewFamily}
          setIsOpen={setPreviewFamily}
          memberDetails={selectedMemberId}
          setCurUser={setCurrent}
        />
      )}

      {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
        />
      }
    </>
  )
}

export default AvatarPage
