/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { useGetAllStaff } from "../../../../../API/memo"
import useCurrentUser from "../../../../../hooks/useCurrentUser"
import { useEffect } from "react"
import Label from "../../../../../components/forms/FormElements/Label"
import { Select, Space } from "antd"
import { Avatar, Button, Chip, Tooltip, useDisclosure } from "@nextui-org/react"
import { PiSignatureLight } from "react-icons/pi"
import { ImCancelCircle } from "react-icons/im"
import AttachmentApproval from "../../../../../components/core/approvals/AttachmentApproval"
import ExpandedDrawerWithButton from "../../../../../components/modals/ExpandedDrawerWithButton"
import useMemoData from "../../../../../hooks/useMemoData"


const StaffInputSigner = ({setChange, label, multiple = false, value=null}) => {
    const {userData} = useCurrentUser()
    const {data:allStaff} = useGetAllStaff(userData?.data?.COMPANY_ID)
    const [selectData, setSelectData] = useState([])

    const [signersUI, setSignersUI] = useState([])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [edittingValue, setEdittingValue ] = useState(null)
    const {updateData, data} = useMemoData()
    



    // console.log(signersUI, data)

    useEffect(() => {
        const processData = ()=>{
          const  value =  allStaff?.map((val) => {
              val.value = val?.STAFF_ID;
              val.label = val?.FIRST_NAME + " " +  val?.LAST_NAME + " " + ( val?.DESIGNATION ? ("(" + val?.DESIGNATION + ")" ) : '');
            return val;
          });
          setSelectData(value)
        }
        processData()
    }, [allStaff])


    useEffect(() => {
        const processData = ()=>{
          setSignersUI(data?.signers)
        }
        processData()
    }, [])


    const handleChange = (val)=>{

      const userIDs = val?.map((each) => each?.value);
      setChange(userIDs)
      processAvailableSigner(val)
    } 


    const processAvailableSigner = (val)=>{
      // console.log(val)
      let defaultData = [...signersUI]
      const current = [...signersUI]

      if(signersUI?.length > 0){

        if(signersUI?.length > val?.length  ){
            for (let index = 0; index < current.length; index++) {
              const element = current[index];
    
                const findSigner = val?.find(sg => sg.value === element.value)
                if(!findSigner){
                  defaultData = defaultData?.filter(el => el.value !== element.value)
                }
            }
        }else{
            for (let index = 0; index < val.length; index++) {
              const element = val[index];
              
              const findSigner = defaultData?.find(sg => sg.value === element.value)
    
              if(!findSigner){
                defaultData.push({...element, file: null})
              }
            }
        }
        setSignersUI([...defaultData])
        updateData({signers: defaultData})
      }else{
        const next = val[0]
        setSignersUI([...defaultData, {...next, file: null}])
        updateData({signers: [...defaultData, {...next, file: null}]})
      }
    }







    const openAttach = (currentSigner)=>{
      onOpen()
      setEdittingValue(currentSigner)
      
    }
    const closeAttach = ()=>{
      onClose()
      setEdittingValue(null)
    }

  const setUploadData = (value)=>{
    if(!value) return
      const {attachment, file, url} = value

      // console.log(attachment, file)

      const urls = URL.createObjectURL(file);

      const snapshot = signersUI.map(el => {
        if(el.value === edittingValue){
          el.file = url

          return el
        }
        return el
      })

      setSignersUI([...snapshot])
      updateData({signers: [...snapshot]})

      closeAttach()
  }

  const cancelSignature = (id)=>{
    const findSigner = signersUI?.find(sg => sg?.value === id)
    if(findSigner){
      const index = signersUI.indexOf(findSigner)
      findSigner.file = null;
      setSignersUI([...signersUI.map((el, i) => i === index ? findSigner : el)])
    }
  }


  return (
    <div className="_compose_to mb-4">
    <Label>{label}</Label>
    <Select
      labelInValue
      mode={multiple ? "multiple" : ''}
      value={value}
      size={"large"}
      placeholder={`Select ${label}`}
      onChange={handleChange}
      className="border-1 border-gray-300 rounded-md"
      style={{
        width: "100%",
      }}
      variant="borderless"
      options={selectData}
      optionFilterProp="label"
      optionRender={(user) => (
        <Space className="cursor-pointer  w-full  px-2 rounded-xl ">
        {
          <div className="flex gap-2 items-center  cursor-pointer px-2 py-1"> 
            {user?.data?.FILE_NAME?.includes("http") ? (
              <Avatar
                alt={user?.data?.name}
                className="flex-shrink-0"
                size="sm"
                src={user?.data?.FILE_NAME}
              />
            ) : (
              <Avatar
                alt={user?.data?.name}
                className="flex-shrink-0"
                size="sm"
                name={user?.data?.label?.trim()[0]}
              />
            )}

            <div className="flex flex-col">
              <span className="text-xs font-medium">{user?.data?.label}</span>
            </div>
          </div>
      }
      </Space>
      )}
    />

    <div className="flex flex-wrap gap-2 py-2">
      {
          signersUI?.map((el, i) => (
            <div key={i} className="flex overflow-hidden">
                <Chip
                    color="secondary"
                    className="m-1 px-2 py-5 transition-all duration-300 "
                    size="md"
                    variant="flat"
                  >
                      <div className="flex gap-2 items-center  cursor-pointer px-2 py-3"> 
                          <Avatar
                            alt={el?.label}
                            color="secondary"
                            className="flex-shrink-0"
                            size="sm"
                            name={el?.label?.trim()[0]}
                          />
                        <div className="flex flex-col line-clamp-1 truncate ">
                          <span className="text-xs font-medium ">{el?.label?.length > 36 ? el?.label?.substring(0,36)+ '...' : el?.label }</span>
                        </div>

                        {
                          el?.file && (
                            <div>
                              <PiSignatureLight color="black" size={20} className=""/>
                            </div>
                          )
                        }

                        {
                           el?.file && (
                              <Tooltip
                                showArrow
                                color="default"
                                content="Remove Signature"
                                delay={300}
                              >
                                <ImCancelCircle onClick={()=>cancelSignature(el?.value)} className='w-4 h-4 text-red-300' />
                              </Tooltip>
                                
                           )
                        } 

                        {
                          !el?.file &&
                        <Button className="bg-black/70 text-white" variant="bordered" size="sm"  onClick={()=>openAttach(el?.value)}   >Add Signature</Button>
                        }

                      </div>
                  </Chip>  
            </div>
          ))
      }
    </div>

    <ExpandedDrawerWithButton maxWidth={700} isOpen={isOpen} onClose={closeAttach}>
      <AttachmentApproval setInformation={setUploadData}  />
    </ExpandedDrawerWithButton>
  </div>
  )
}

export default StaffInputSigner
