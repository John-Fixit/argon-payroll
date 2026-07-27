/* eslint-disable react/prop-types */


import  { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { Settings2 } from 'lucide-react';


const ExpandedDrawer2 = ({children, name}) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

//   const showDefaultDrawer = () => {
//     setSize('default');
//     setOpen(true);
//   };

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        {/* <Button type="primary" onClick={showDefaultDrawer}>
          Open Default Size (378px)
        </Button> */}
        <div  onClick={showLargeDrawer}>
          {children}
        </div>
      </Space>
      <Drawer
        title={`${name} Settings`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <div className='flex flex-col gap-5'>
            <div className='p-3 border-2 border-gray-400 border-dashed rounded-xl flex items-center gap-4 cursor-pointer'>
                <div className='bg-pink-500 rounded-full p-2'>
                  <Settings2  color='white'/>
                </div>
                <div className='text-gray-600 font-medium text-lg'>Approval Heirachy</div>
            </div>
            <div className='p-3 border-2 cursor-pointer border-gray-400 border-dashed rounded-xl flex items-center gap-4'>
                <div className='bg-blue-500 rounded-full p-2'>
                  <Settings2  color='white'/>
                </div>
                <div className='text-gray-600 font-medium text-lg'>Approval Heirachy</div>
            </div>
            <div className='p-3 border-2 cursor-pointer border-gray-400 border-dashed rounded-xl flex items-center gap-4'>
                <div className='bg-green-500 rounded-full p-2'>
                  <Settings2  color='white'/>
                </div>
                <div className='text-gray-600 font-medium text-lg'>Approval Heirachy</div>
            </div>
            <div className='p-3 border-2 cursor-pointer border-gray-400 border-dashed  rounded-xl flex items-center gap-4'>
                <div className='bg-gray-500 rounded-full p-2'>
                  <Settings2  color='white'/>
                </div>
                <div className='text-gray-600 font-medium text-lg'>Approval Heirachy</div>
            </div>
        </div>
      </Drawer>
    </>
  );
};

export default ExpandedDrawer2;