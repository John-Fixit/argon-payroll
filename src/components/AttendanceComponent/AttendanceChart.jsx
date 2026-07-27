/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { FiClock } from "react-icons/fi";
import { Button, Spinner } from "@nextui-org/react";
import Camera from "./Camera/Camera";
import { GiAlarmClock } from "react-icons/gi";
import LocationInfoCard from "./LocationInfoCard";
import {useDisclosure} from "@nextui-org/react";
import ConfirmModal from "./ConfirmModal";
import { uploadFileData } from "../../utils/uploadfile";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetAttendanceRecord, useGetFirstPunchRecord, useGetLast3daysAttendanceRecord, usePunchIn, usePunchOut } from "../../API/attendance";
import DateFormatter from "./dateformatter";
import { dataURLToFile, formatDateToDateandTimeAMPM, formatTimeMeridian } from "../../utils/utitlities";
// import ProgressCircle from "./ProgessCircle";
// import WorkdayTimer from "./WorkTimer";
import { MdHourglassEmpty } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
// import Map from "./address";



const AttendanceChart = () => {
const [takePicture, setTakePicture] = useState(false);
const [location, setLocation] = useState({latitude:'',longitude:''})
// const [file, setFile] = useState("");

const {isOpen, onOpen, onClose} = useDisclosure();
const [locationData, setLocationData] = useState(null)
const [isLoading, setIsLoading] = useState(false)

const {isOpen: openModal, onOpen:isOpenModal, onClose: onCancel} = useDisclosure();
const {mutateAsync: punchIn,} = usePunchIn()
const {mutateAsync:punchOut } = usePunchOut()
const {userData} = useCurrentUser()
const {refetch: refetchLast3, data:attendance3Record,} = useGetLast3daysAttendanceRecord(userData?.data?.STAFF_ID)
const {refetch, data: attendanceRecord} = useGetAttendanceRecord(userData?.data?.STAFF_ID, { page: 1}) 

const {refetch: refetchFirst, data: attendanceFirstPunch} = useGetFirstPunchRecord(userData?.data?.STAFF_ID) 
 


const punchOutTest = ()=>{
      onCancel()
      punchUserOut()
}





const punchUserIn = async (fileData, location, lat, lng)=>{
  const token = userData?.token
  const userdata = userData?.data
  const date = new Date();

  // 84399 || await uploadFileData(fileData, token)
  // 84399 || fileUrl?.file_url_id,
  try {
        if(fileData, location, lat, lng){
          setIsLoading(true)
          const fileUrl =   await uploadFileData(fileData, token)
          if(fileUrl){
             const res = await punchIn({
              //  IMAGE_LINK:  fileUrl?.file_url_id,
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
              refetchFirst()
              refetch()
              refetchLast3()
                  toast.success("Your Attendance submitted successful!", {
                    position: "bottom-right",
                    duration: "2000",
                  });
             }else{
                toast.error("Your attendance submission failed. Please Retry", {
                  position: "bottom-right",
                  duration: "2000",
                });
             }
          }
        }
  } catch (error) { 
    console.log(error)
    setIsLoading(false)
    toast.error("Your attendance submission failed. Please Retry", {
      position: "bottom-right",
      duration: "2000",
    });
  }

} 


const punchUserOut = async ()=>{
  const userdata = userData?.data
  const date = new Date();
  const userLocation = locationData?.city || await fetchIpInfo()
  const lat = location?.latitude  || locationData?.loc?.split(',')[0]
  const lng = location?.longitude  || locationData?.loc?.split(',')[1]
  // 1772 || userdata?.STAFF_ID
  try {
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
        refetchLast3()
        toast.success("You punched out successful!", {
          position: "bottom-right",
          duration: "2000",
        });
      }else{
        toast.error("Your punch out failed. Please Retry", {
          position: "bottom-right",
          duration: "2000",
        });
      }
    }
  } catch (error) {
    console.log(error)
    toast.error("Your punch out failed. Please Retry", {
      position: "bottom-right",
      duration: "2000",
    });
  }

}


const getCapture =  (captured)=>{
    const userLocation =  `${captured?.loc?.city} ${captured?.loc?.region} `
    const lat = location?.latitude  || captured?.loc?.loc?.split(',')[0]
    const lng = location?.longitude  || captured?.loc?.loc?.split(',')[1]
    const fileUrl = captured?.capturedImage
    const d = new Date()
    const fileData =   dataURLToFile(fileUrl, d.getTime() + 'attendance.png' )

    // console.log(fileData)


    setTakePicture(false)
    setLocationData(captured?.loc)
    punchUserIn(fileData, userLocation, lat, lng)
}

const close = () => {
setTakePicture(false)
};

    useEffect(() => {
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
       
        (position) => {
          // Success callback
          const { latitude, longitude } = position.coords;
          setLocation({latitude,longitude})

          
          // const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${
          //   latitude}&lon=${longitude}`;
          
          // fetch(url).then(res=>res.json()).then(v => console.log())
          fetchIpInfo()
          // const response = fetch(
          //   `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBEPv18QCw_nu2eFsNg`,
          //   {
          //     method: 'POST',
          //   }
          // ).then(dt => dt.json()).then(v => console.log(v));


        },
        (error) => {
          // Error callback
          console.error("Error getting location:", error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported in this browser");
    }
  }, []);

  

const firstPunchInToday = useMemo(() => {
  const first = attendanceFirstPunch?.firstPunchInTime
   if(!first) return null;
   const formatted = formatDateToDateandTimeAMPM(first)

   const timeMeridian = formatted?.split(',')[1]?.slice(0, 6)
   const timeMeridian2 = first?.split(' ')[1]?.slice(0, 5)

   const formattedTimeMeridian = formatTimeMeridian(timeMeridian)
   const formattedTimeMeridian2 = formatTimeMeridian(timeMeridian2)

  //  console.log(first, timeMeridian2, formattedTimeMeridian2)
  
   return formattedTimeMeridian2;
},  [attendanceFirstPunch])

const latestPunchInToday = useMemo(() => {
  const  data = attendanceRecord?.data ? [...attendanceRecord.data]: []
   const firstToday = data?.find(dt => dt.PUNCH_IN_TIME)
   const formatted = formatDateToDateandTimeAMPM(firstToday?.PUNCH_IN_TIME)
   return formatted;
},  [attendanceRecord])


const hasPunchedIn = useMemo(() => {
  const  data = attendanceRecord?.data ? [...attendanceRecord.data]: []
  if(data.length === 0)return false
   const isPunchIn = data[0]?.PUNCH_IN_TIME

   return  isPunchIn ? true : false

},  [attendanceRecord])


const fetchIpInfo = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    const res = await axios.get("http://ip-api.com/json");

    setLocationData(response.data);
    const userLocation =  `${response?.data?.city} ${response?.data?.region}`
    // console.log(userLocation, res)
    return userLocation
  } catch (error) {
    console.error('Error fetching IP information:', error);
    toast.error("Error fetching IP information. Please Retry", {
      position: "bottom-right",
      duration: "2000",
    });
  }
};



  return (
    <Fragment>
    <Camera  onSubmit={getCapture} showWebcam={takePicture} onClose={close} />
      <div className="my-8 grid  lg:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded py-2 px-4 shadow-md">
          <div className="flex items-center gap-4 mb-4 text-sm">
            <h1>Timesheet</h1>
          </div>
          {
            latestPunchInToday ? 
            <div className=" my-2 font-medium py-3 px-2 rounded border bg-gray-50">
            <p className="m-0 p-0">Punched in at</p>
            <p className="text-gray-500 m-0 p-0">{latestPunchInToday}</p>
          </div> :
           <div className=" my-2 font-medium py-3 px-2 rounded border bg-gray-50">
           <p className="m-0 p-0">Yet to Punch In</p>
           <p className="text-gray-500 m-0 p-0">{latestPunchInToday}</p>
         </div>
          }
         


          {/* <ProgressCircle startHour={8} endHour={17} /> */}
          {/* <div className="flex justify-center h-[10rem] ">
              <WorkdayTimer />
          </div> */}

          <div className="relative">
              <div className="w-[10rem] h-[10rem] my-4 rounded-full border-5 border-gray-200 mx-auto flex justify-center items-center bg-gray-50 ">
                <p className="text-gray-40 opacity-0">3.45hrs</p>
              </div>
          </div>
          <div className="flex justify-center">
            <Button className="px-6 py-2 bg-btnColor hover:bg-[#44bec2] rounded-full text-white font-medium disabled:cursor-not-allowed disabled:bg-[#52c3c7]"
            disabled={isLoading}
             onClick={hasPunchedIn ? ()=>isOpenModal(true) : () => setTakePicture(true)}
            >
              {
               isLoading ?  <Spinner color="white"></Spinner> :
                  <span>Punch  {hasPunchedIn ? "Out"  : "In"}</span> 
              }
            </Button>
          </div>

          <div className="flex justify-between my-4">
            <div className=" my-2 font-medium py-1 px-6 rounded border bg-gray-50 text-center">
              <p className="m-0 p-0 opacity-0">Break</p>
              <p className=" m-0 p-0 opacity-0">1.21hrs</p>
            </div>
            <div className=" my-2 font-medium py-1 px-6 rounded border bg-gray-50 text-center">
              <p className="m-0 p-0 opacity-0">Overtime</p>
              <p className=" m-0 p-0 opacity-0">3hrs</p>
            </div>
          </div>
        </div>


        <div className="bg-white rounded py-2 px-4 shadow-md min-h-[28rem]">
          <h1>Clocked in Today</h1>

          {
            !firstPunchInToday ? <>

            <div className="flex flex-col justify-center items-center gap-3 border  h-[84%] rounded px-2 ">
                <MdHourglassEmpty size={100} className="animate animate-rotate-x animate-infinite text-gray-400"  />
                <p className=" text-lg md:text-xl text-default-500 text-center">You have not punch in today</p>
            </div>


            </> :
              <div className=" my-4 font-medium py-3 px-2 rounded border h-[84%] relative">
                <div className="flex flex-col gap-2 px-2 mb-4">
                  <p className="font-normal text-xl">Time In</p>
                    <div className="relative ">
                      <span className=" text-5xl  sm:text-6xl   md:text-7xl  text-red-600 font-Helvetica">
                        {firstPunchInToday?.time}
                      </span>
                      <sup className=" text-black/60  font-light text-2xl  absolute top-0 ml-1">
                        {firstPunchInToday?.meridian}
                      </sup>
                    </div>
                </div>


                    <>
                      <div className="w-full  rounded-full h-1 px-7">
                        <div className="bg-gray-300 h-[0.2rem] rounded-full w-[100%]"></div>
                      </div>
                      {/* <div className="mt-5">
                        <span  className="text-xl pl-7">Stranded by traffic</span>
                      </div> */}
                    </>
                
                  <GiAlarmClock size={120} strokeWidth={2} className="absolute bottom-0 right-0 text-black"  />
              </div>
          }

        </div>

        <div className="bg-white rounded py-2 px-4 shadow-md">
          <h1>Last 3 days</h1>
          <div className=" overflow-y-auto h-[27rem] py-2 ">
            <ol className="relative ms-4 my-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400  ">
              {
                  attendance3Record?.reverse()?.map((p)=>(
                    <li key={p?.ATTENDANCE_ID} className="mb-10 ms-8">
                      <span className="absolute w-[10px] h-[10px] border-2 border-btnColor bg-white rounded-full -start-[5.8px]"></span>
                      <h3 className="font-medium leading-tight">{p?.PUNCH_IN_TIME ? 'Punch in at' : "Punch out at"}</h3>
                      <div className="flex gap-1 items-center text-gray-400 text-xs font-normal">
                        <FiClock />
                        <p className=""><DateFormatter dateString={p?.PUNCH_IN_TIME ? p?.PUNCH_IN_TIME : p?.PUNCH_OUT_TIME}/></p>
                      </div>
                    </li>
                  ))
              }
            </ol>
          </div>
        </div>

      </div>

      <LocationInfoCard isOpen={isOpen} onClose={onClose} locationData={locationData}/>
      <ConfirmModal isOpen={openModal}  handleOk={punchOutTest}  handleCancel={onCancel}  />
      {/* <Map/> */}
    </Fragment>
  );
};

export default AttendanceChart;
































    // const showConfirm = () => {
    //     confirm({
    //       title: '',
    //       icon: <BsExclamationCircleFill size={15}  className="text-gray-800 mb-2" />,
    //       content: <p className="mt-4 text-lg">Are you sure you want to punch out?</p> ,
    //       footer: <div className="flex justify-end gap-2">
    //           <Btn >Cancel</Btn>
    //           <Btn color="green">Ok</Btn>
    //       </div>,
    //       onOk() {
    //         console.log('OK');
    //       },
    //       onCancel() {
    //         console.log('Cancel');
    //       },
    //     });
    //   };








            {/* <div className="bg-white rounded py-2 px-4 shadow-md">
        <h1>Statistics</h1>
          <div className=" my-4 font-medium py-3 px-2 rounded border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-normal">Today</p>
              <p className="">3.45/8 hrs</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-orange-500 h-1 rounded-full w-[45%]"></div>
            </div>
          </div>
          <div className=" my-4 font-medium py-3 px-2 rounded border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-normal">This Week</p>
              <p className="">28/40 hrs</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-orange-400 h-1 rounded-full w-[75%]"></div>
            </div>
          </div>
          <div className=" my-4 font-medium py-3 px-2 rounded border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-normal">This Month</p>
              <p className="">90/160 hrs</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-green-500 h-1 rounded-full w-[50%]"></div>
            </div>
          </div>
          <div className=" my-4 font-medium py-3 px-2 rounded border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-normal">Remaining</p>
              <p className="">90/160 hrs</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-red-500 h-1 rounded-full w-[90%]"></div>
            </div>
          </div>
        
          <div className=" my-4 font-medium py-3 px-2 rounded border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-normal">Overtime</p>
              <p className="">4</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-400 h-1 rounded-full w-[30%]"></div>
            </div>
          </div>
        </div> */}




         {/* {
                  punchActivityData?.map((p, i)=>(
                    <li key={i} className="mb-10 ms-8">
                      <span className="absolute w-[10px] h-[10px] border-2 border-btnColor bg-white rounded-full -start-[5.8px]"></span>
                      <h3 className="font-medium leading-tight">{p?.action}</h3>
                      <div className="flex gap-1 items-center text-gray-400 text-xs font-normal">
                        <FiClock />
                        <p className="">{p?.time}</p>
                      </div>
                    </li>
                  ))
              } */}