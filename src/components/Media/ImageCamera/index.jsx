/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import Webcam from "../components/Webcam";





const ImageCameraMedia = ({showWebcam, onSubmit, save, onClose}) => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const refresh = () => {
        // window.location.reload();
        setRefreshKey((prevKey) => prevKey + 1);
      };



    useEffect(() => {
      setIsMounted(true);
    }, []);
    
      if (!isMounted) {
        return null;
      } 
  
    

  return (

        <Fragment >
            {
              showWebcam &&  
                 <Webcam key={refreshKey} refresh={refresh} save={save} onSubmit={onSubmit} onClose={onClose} />
            }
        </Fragment>
  )
}

export default ImageCameraMedia;
