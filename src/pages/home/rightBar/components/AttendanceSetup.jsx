/* eslint-disable react/prop-types */
import { useMemo, useState } from "react"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import { useGetAttendanceRecord, usePunchIn, usePunchOut } from "../../../../API/attendance"
import Camera from "../../../../components/AttendanceComponent/Camera/Camera"
import { dataURLToFile } from "../../../../utils/utitlities"
import { uploadFileData } from "../../../../utils/uploadfile"
import toast from "react-hot-toast"
import axios from "axios"
import ConfirmModal from "../../../../components/AttendanceComponent/ConfirmModal"
import { cn, Tooltip, useDisclosure } from "@nextui-org/react"
import CircularLoader from "../../../../components/core/loaders/circularLoader"


const AttendanceSetup = ({children}) => {
    const [takePicture, setTakePicture] = useState(false);
    const [locationData, setLocationData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {isOpen: openModal, onOpen:isOpenModal, onClose: onCancel} = useDisclosure();
    const {userData} = useCurrentUser()
    const {refetch, data: attendanceRecord} = useGetAttendanceRecord(userData?.data?.STAFF_ID, { page: 1}) 
    const {mutateAsync: punchIn,} = usePunchIn()
    const {mutateAsync:punchOut } = usePunchOut()



const hasPunchedIn = useMemo(() => {
    const  data = attendanceRecord?.data ? [...attendanceRecord.data]: []
    if(data.length === 0)return false
        const isPunchIn = data[0]?.PUNCH_IN_TIME
    
        return  isPunchIn ? true : false
    
    },  [attendanceRecord])

    const close = () => {
        setTakePicture(false)
    };


const getCapture =  (captured)=>{
        const userLocation =  `${captured?.loc?.city} ${captured?.loc?.region} `
        const lat = location?.latitude  || captured?.loc?.loc?.split(',')[0]
        const lng = location?.longitude  || captured?.loc?.loc?.split(',')[1]
        const fileUrl = captured?.capturedImage
        const d = new Date()
        const fileData =   dataURLToFile(fileUrl, d.getTime() + 'attendance.png' )

        setTakePicture(false)
        setLocationData(captured?.loc)
        punchUserIn(fileData, userLocation, lat, lng)
    }


    const punchUserIn = async (fileData, location, lat, lng)=>{
        const token = userData?.token
        const userdata = userData?.data
        const date = new Date();
        try {
              if(fileData, location, lat, lng){
                setIsLoading(true)
                const fileUrl =   await uploadFileData(fileData, token)
                if(fileUrl){
                   const res = await punchIn({
                     IMAGE_LINK:  fileUrl?.file_url,
                     PUNCH_IN_TIME: date,
                     PUNCH_OUT_TIME: null, 
                     LOCATION: location,
                     LATTITUDE: lat?.toString(),
                     LONGITUDE: lng?.toString(),
                     COMPANY_ID: userdata?.COMPANY_ID,     
                     STAFF_ID: userdata?.STAFF_ID,
                   })
      
                   if(res){
                    setIsLoading(false)
                    refetch()
                        toast.success("Your Attendance submitted successful!", {
                          position: "top-right",
                          duration: 2000,
                        });
                   }else{
                    setIsLoading(false)
                      toast.error("Your attendance submission failed. Please Retry", {
                        position: "bottom-right",
                        duration: 2000,
                        style: {
                            background: '#f30',
                            color: '#fff',
                            border: '2px solid #fff',
                          },
                      });
                   }
                }
              }
        } catch (error) { 
          setIsLoading(false)
          toast.error("Your attendance submission failed. Please Retry", {
            position: "bottom-right",
            duration: 2000,
            style: {
                background: '#f30',
                color: '#fff',
                border: '2px solid #fff',
              },
          });
        }
      
      } 
      
      
      const punchUserOut = async ()=>{
        const userdata = userData?.data
        const date = new Date();
        const userLocation = locationData?.city || await fetchIpInfo()
        const lat = location?.latitude  || locationData?.loc?.split(',')[0]
        const lng = location?.longitude  || locationData?.loc?.split(',')[1]

        // console.log(userLocation, lat, lng)
        try {
            setIsLoading(true)
          if(userLocation, lat, lng){
            const res = await punchOut({
              IMAGE_LINK: null,
              PUNCH_IN_TIME: null,
              PUNCH_OUT_TIME: date,
              LOCATION: userLocation,
              LATTITUDE: lat?.toString(),
              LONGITUDE: lng?.toString(),
              COMPANY_ID: userdata?.COMPANY_ID,
              STAFF_ID: userdata?.STAFF_ID,
            })
            if(res){
              refetch()
              setIsLoading(false)
              toast.success("You punched out successful!", {
                position: "top-right",
                duration: 2000,
              });
            }else{
                setIsLoading(false)
              toast.error("Your punch out failed. Please Retry", {
                position: "bottom-right",
                duration: 2000,
                
                style: {
                    background: '#f30',
                    color: '#fff',
                    border: '2px solid #fff',
                  },
              });
            }
          }
        } catch (error) {
            setIsLoading(false)
          toast.error("Your punch out failed. Please Retry", {
            position: "bottom-right",
            duration: 2000,
            style: {
                background: '#f30',
                color: '#fff',
                border: '2px solid #fff',
              },
          });
        }
      
      }

      const punchOutTest = ()=>{
        onCancel()
        punchUserOut()
    }


      const fetchIpInfo = async () => {
        try {
          const response = await axios.get('https://ipinfo.io/json');      
          setLocationData(response.data);
          const userLocation =  `${response?.data?.city} ${response?.data?.region}`
          return userLocation
        } catch (error) {
          console.error('Error fetching IP information:', error);
          toast.error("Error fetching IP information. Please Retry", {
            position: "bottom-right",
            duration: "2000",
            style: {
                background: '#f30',
                color: '#fff',
                border: '2px solid #fff',
              },
            
          });
        }
      };




  return (
    <div>
          <Camera  onSubmit={getCapture} showWebcam={takePicture} onClose={close} />
        <Tooltip title="Attendance" content={hasPunchedIn ? 'Punch Out' : "Punch In"} showArrow>
          <button  disabled={isLoading} className=" outline-none bg-transparent ring-0 text-transparent relative"   onClick={hasPunchedIn ? ()=>isOpenModal(true) : () => setTakePicture(true)} >
                {children}

                <div className={cn("absolute top-6 right-8", isLoading ? 'block' : 'hidden')} >
                        <CircularLoader size={23} color="white"/>
                </div>
          </button>
        </Tooltip>
          <ConfirmModal isOpen={openModal}  handleOk={punchOutTest}  handleCancel={onCancel}  />
    </div>
  )
}

export default AttendanceSetup
