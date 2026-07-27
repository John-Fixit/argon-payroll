/* eslint-disable react/prop-types */
import { Spinner } from '@nextui-org/react'
import { useGetProfile } from '../../../API/profile'
import ExpandedDrawerWithButton from '../../modals/ExpandedDrawerWithButton'
import FormDrawer from '../../payroll_components/FormDrawer'
import { useGetRequest_Detail } from '../../../API/api_urls/my_approvals'
import ApprovalHistory from '../../../pages/Approval/ApprovalHistory'

import { Result } from 'antd'
import BioDataDetail from '../../../pages/Approval/BioDataDetail'
import AttachmentDetailsApproval from '../../core/approvals/AttachmentDetailsApproval'
import NoteDetailsApproval from '../../core/approvals/NoteDetailsApproval'

export default function PreviewPersonalInfoRequest({ isOpen, setIsOpen }) {

  const { data: profile } = useGetProfile({ path: "/profile/get_profile", key: "profile" })

  const { data, isPending, isError, error } = useGetRequest_Detail(profile?.BIODATA?.PENDING_REQUEST_ID);

  const request_detail = data?.data?.data



  const details = {
    data: request_detail?.data,
    approvers: request_detail?.approvers,
    notes: request_detail?.notes,
    attachments: request_detail?.attachments,
    isLoading: isPending,
    isError: isError
  }

  const tabs = [
    {
      title: "Bio Data",
      component: <BioDataDetail details={details}  role="request" />,
    },
    {
      title: "Attachment",
      component: <AttachmentDetailsApproval details={details} />,
    },
    { title: "Note", component: <NoteDetailsApproval details={details} /> },
  ]

  return (
    <>


<ExpandedDrawerWithButton isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <FormDrawer title={"Who you be:"} tabs={
          isPending?[]:
          isError?[]:
          [...tabs,
            { title: "Approval history", component: <ApprovalHistory  details={details}  /> },

        ]}>
          {
            isPending ? (
          <div className="flex justify-center items-center">
          <Spinner color="default" />
        </div>
            ): isError?(
              <Result
              status="error"
              title={error?.response?.data?.message ?? error?.message}
              extra={null}
            />
            ): null
          }
        </FormDrawer>

      </ExpandedDrawerWithButton>
    </>
  )
}
