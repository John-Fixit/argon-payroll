/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import CamElements from "./CamElements";





const Camera = ({showWebcam, onSubmit, save, onClose}) => {
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
              <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-black/50 flex items-center justify-center">
                 <CamElements key={refreshKey} refresh={refresh} save={save} onSubmit={onSubmit} onClose={onClose} />
              </div>
            }
        </Fragment>
  )
}

export default Camera;
