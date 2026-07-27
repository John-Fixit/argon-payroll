import { useState } from 'react'
import ExpandedDrawerWithButton from '../../../../components/modals/ExpandedDrawerWithButton'
import AdminResetPassword from '../../../../components/profile/resetPassword_forms/AdminResetPassword'
import { RiLockPasswordLine } from "react-icons/ri";
import PageHeader from '../../../../components/payroll_components/PageHeader';
import Separator from '../../../../components/payroll_components/Separator';
import RequestCard from '../../../Approval/RequestCard';

const statusData = [
    {
      id: "reset_password",
      label: "Reset Staff Password",
      icon: RiLockPasswordLine,
      b_color: "bg-red-100",
      t_color: "text-red-500",
    },
  ];

const Administrator = () => {

    const [passwordDrawer, setPasswordDrawer] = useState(false)

  const handleOpenPasswordDrawer=()=>{
    setPasswordDrawer(true)
  }
  const handleClosePasswordDrawer=()=>{
    setPasswordDrawer(false)
  }


  return (
    <>
         <div>
      <div className="py-6">
        <PageHeader header_text={"Administrator"} btnAvailable={false} />
        <Separator separator_text={"Administrator"} />

        <RequestCard
         requestHistory={statusData}
         externalAction={true}
         action={handleOpenPasswordDrawer}
        />

      
      </div>
      <ExpandedDrawerWithButton isOpen={passwordDrawer} onClose={handleClosePasswordDrawer} maxWidth={450}>
          <AdminResetPassword closeDrawer={handleClosePasswordDrawer}/>
      </ExpandedDrawerWithButton>
    </div>
    </>
  )
}

export default Administrator