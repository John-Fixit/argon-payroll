

/* eslint-disable react/prop-types */

import { useEffect, useRef } from 'react';
import Postfeed from '../../pages/home/centerFeed/Postfeed';
import ModalTransparent from './ModalTransparent';
import { AnimatePresence, motion } from 'framer-motion';
import { filePrefix } from '../../utils/filePrefix';


const PostModal = ({ 
  isOpen, 
  onClose, 
    data,
}) => {

    const trigger = useRef(null);
    const imgContainer = useRef(null);

  
    // close on click outside
    useEffect(() => {
      const clickHandler = ({ target }) => {
        if (!trigger.current) return;

        if (
            imgContainer.current.contains(target)
        ){
            return;
        }else{
            // console.log('click outside')
            onClose();
        }
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
    });
  

    // close if the esc key is pressed
    useEffect(() => {
      const keyHandler = ({ keyCode }) => {
        if (!isOpen || keyCode !== 27) return;
        onClose();
      };
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
    });










  if (!data) {
    return null;
  }

  const clickOutBox = (e)=>{
    const wrapper = e.target.id == 'modalWrapper'
    // console.log(e.target.id == 'modalWrapper')

    if(wrapper){
        onClose();
    }

    // document.ELEMENT_NODE
  }



  return (
    <ModalTransparent isOpen={isOpen} onClose={onClose} >
    
    
    <div className='grid grid-cols-1 md:grid-cols-2  gap-5 overflow-y-auto scrollbar-none  md:w-fit w-full px-6 h-full' ref={trigger} id='modalWrapper' onClick={clickOutBox} >

      <div ref={imgContainer} className="h-[100%]  rounded flex justify-end"
         
      >
        <AnimatePresence>
          <motion.div
                  layoutId="hero"
                  initial={{scale:0, opacity:0,}}
                  animate={{scale:1, opacity:1, transition: { duration: 0.5}}}
                  exit={{scale:0, opacity:0.5, transition: {duration: 0.5}}}
                >
                <img 
                  className="object-cover max-h-[40rem] max-w-[550px]    md:h-[100%] rounded" 
                  alt="Image" 
                  src={filePrefix + data?.POST_FILE_NAME || "/assets/images/profiles/avatar-07.jpg"}
                  
                
                />
            </motion.div>
          </AnimatePresence>
      </div>


      {/* <motion.div
        initial={{y: 0, scale:0, opacity:0,}}
        animate={{y: 1, scale:1, opacity:1, transition: { duration: 0.5}}}
        exit={{y: 0, scale:0, opacity:0.5, transition: {duration: 0.5}}}
      
      > */}
          <div className=" hidden md:block max-h-fit overflow-y-auto " 
          >
              <Postfeed withoutImg data={data}/>

          </div>
        {/* </motion.div> */}

    </div>
    </ModalTransparent>
  )
}

export default PostModal;