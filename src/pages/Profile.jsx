// import { useContext } from 'react'
import PageHeader from '../components/payroll_components/PageHeader'
import ProfileHeader from '../components/profile/ProfileHeader'

export default function Profile() {
  // const { sidebarOpen, isTablet } = useContext(dashboardContext)
  return (
    <div className='maxw-[65rem] mx-auto'>
      <div className='py-4'>
        <PageHeader
          header_text={'Profile'}
          breadCrumb_data={[
            {
              name: 'Dashboard',
            },
            {
              name: 'Profile',
            },
          ]}
          btnAvailable={false}
        />
      </div>

      <ProfileHeader />
    </div>
  )
}
