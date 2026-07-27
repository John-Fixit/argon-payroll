/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// SalaryTable.js
import { useState } from "react";
import {Button, useDisclosure } from '@nextui-org/react'
import { filePrefix } from '../../utils/filePrefix';
import { errorToast } from '../../utils/toastMsgPop';
import ActionIcons from "../core/shared/ActionIcons";
import ExpandedDrawerWithButton from "../modals/ExpandedDrawerWithButton";
import PayslipDrawer from "../profile/profileDrawer/PayslipDrawer";
import PropTypes from "prop-types"
import CircularLoader from "../core/loaders/circularLoader";

const SalaryTable = ({ data, isLoading }) => {

  const [downloadProgress, setDownloadProgress] = useState({index: null, progress: 0, status: false});
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [curEmp, setcurEmp] = useState(null)


  const prependBaseURL = (filePath) => {


    // Check if the file path already has a base URL
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath; // Return the original file path if it has a base URL
    } else {
      return `${filePrefix}${filePath}`; // Prepend the base URL
    }
  };



  const handleDownload = async (path, index) => {
    try {
      const url = prependBaseURL(path);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentLength = response.headers.get('Content-Length');
      if (!contentLength) {
        throw new Error('Content-Length header is missing');
      }

      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const stream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            loaded += value.length;
            setDownloadProgress({index: index, progress: (loaded / total) * 100, status: true})
            controller.enqueue(value);
          }
          controller.close();
          reader.releaseLock();
        },
      });

      const blob = await new Response(stream).blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = path.split('/').pop(); // Use the file name from the path
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob); // Clean up the URL object
      setDownloadProgress({index: index, progress: 0, status: false}); // Reset progress after download completes
    } catch (error) {
      errorToast("Download failed")
      setDownloadProgress({index: index, progress: 0, status: false}); // Reset progress on error
    }
  };



  const hanleOpen = (emp)=>{
    setcurEmp(emp)
    onOpen()
  }


  return (
    <div className={`fontOswald ${!isLoading && 'overflow-x-auto'}`}>
      <table className='table-auto min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica'>
              Month
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica'>
              Year
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica'>
              Paid
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica'>
              Deduction
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica'>
              Net
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {
            isLoading? (
              <tr >
                <td colSpan={6} className='text-gray-500 font-helvetica'>
                  <div className="flex justify-center mt-3">
                    <CircularLoader size={30}/>
                  </div>
                </td>
              </tr>
            ): (
              data?.map((employee, index) => (
                <tr key={employee.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-default-400 font-helvetica text-left'>{employee?.month_}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-default-400 font-helvetica text-left'>{employee?.year}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-default-400 font-helvetica'>{employee?.paid}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-default-400 font-helvetica'>
                    {employee?.deduct}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-default-400 font-helvetica'>
                    {employee?.salary}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-default-400 font-helvetica'>
                    {
                      employee?.link?(
                        <>
                        
                            <Button isIconOnly size="sm"  className="flex items-center justify-center bg-transparent ">
                              <ActionIcons variant={"VIEW"} action={()=>hanleOpen(employee)}/>
                            </Button>
                        </>
                      ): (
                        <p>NIL</p>
                      )
                    }
                  </td>
                </tr>
              ))
              
            )
          }
        </tbody>
      </table>


      <ExpandedDrawerWithButton withBg={false} maxWidth={1000} isOpen={isOpen} onClose={onClose}>
        {
          isOpen && <PayslipDrawer  user={curEmp}/>
        }
            
      </ExpandedDrawerWithButton>
    </div>
  )
}

export default SalaryTable


SalaryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
}
